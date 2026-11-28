/* Факультет математики ХГУ — общие данные через Supabase:
   вход, объявления кафедр, материалы, предметы и баллы, чат, админ-панель.
   Впишите сюда Project URL и anon (publishable) key из Supabase → Project Settings → API. */
(function () {
"use strict";
var CFG = {
  url: "https://daanwwkyefyzfipudjff.supabase.co",
  key: "sb_publishable_QXghfJ_DV4bAtWp-zhy3fA_yawuHVkv"
};
var DOMAIN = "mf.example.com"; // логин превращается в «логин@mf.example.com», почта не используется

var X = window.MFX;
if (!X) return;

/* ---------- тексты ---------- */
var S = {
ru: {
  ann: "Объявления", mat: "Материалы", chat: "Чат", login: "Войти", cab: "Кабинет", subj: "Мои предметы", admin: "Админ",
  noCfg: "Сервер ещё не подключён. Администратору сайта нужно вписать адрес Supabase в файл cloud.js.",
  needLogin: "Этот раздел доступен после входа.", pending: "Аккаунт ждёт подтверждения администратора. После подтверждения откроются материалы, чат и баллы.",
  noAccess: "Нет доступа к этому разделу.", loading: "Загрузка…", err: "Ошибка", saved: "Сохранено", empty: "Пока пусто",
  inT: "Вход", upT: "Регистрация", lg: "Логин", pw: "Пароль", pw2: "Пароль ещё раз", fio: "Фамилия Имя Отчество",
  inBtn: "Войти", upBtn: "Зарегистрироваться", out: "Выйти",
  lgHint: "Латинские буквы, цифры, точка, дефис; 3–30 символов.", pwShort: "Пароль — минимум 8 символов.", pwDiff: "Пароли не совпадают.",
  badLogin: "Неверный логин или пароль.", upOk: "Аккаунт создан. Дождитесь, пока администратор подтвердит его и назначит роль.",
  role: { pending: "ждёт подтверждения", student: "студент", teacher: "преподаватель", admin: "администратор" },
  dept: "Кафедра", grp: "Группа", faculty: "Весь факультет", all: "Все",
  annT: "Объявления кафедр", annSub: "Объявления на день от преподавателей. Каждая кафедра пишет свои.",
  annNew: "Новое объявление", annPh: "Текст объявления", annDay: "На дату", post: "Опубликовать", today: "Сегодня", del: "Удалить", delQ: "Удалить?",
  deptAnn: "Объявления кафедры",
  matT: "Материалы и программы", matSub: "Учебные материалы, программы, силлабусы и тесты кафедр.",
  kind: { material: "Материал", program: "Программа", syllabus: "Силлабус", test: "Тест" }, kindL: "Тип",
  title: "Название", file: "Файл", subject: "Предмет", noSubject: "— без предмета —", upload: "Загрузить", uploading: "Загрузка файла…",
  open: "Открыть", dl: "Скачать", allowDl: "Разрешить скачивание", denyDl: "Запретить скачивание",
  dlOn: "Скачивание разрешено", dlOff: "Только просмотр",
  noPreview: "Этот формат нельзя посмотреть в браузере. Загружайте материалы в PDF.",
  testsHint: "Тесты видят только администратор, автор и преподаватель предмета.", maxSize: "Файл больше 50 МБ.",
  subjT: "Мои предметы", subjSub: "Силлабус, студенты и баллы по вашим предметам.", pick: "— выберите —", noSubj: "Вам ещё не назначены предметы. Их назначает администратор.",
  syl: "Силлабус", save: "Сохранить", studs: "Студенты", addSt: "Добавить", grF: "Фильтр по группе",
  grades: "Баллы", wk: "+ Неделя", r1: "Рубеж 1", r2: "Рубеж 2", ex: "Экзамен", tot: "Итог", st: "Студент",
  grHint: "Дневные баллы 0–10 ставятся за каждый день занятий. Рубеж 1 — после 8 недель, рубеж 2 — после 16 недель, потом экзамен (0–100). Итог = среднее рубежей × 60% + экзамен × 40%. Баллы сохраняются сразу.",
  myGr: "Мои предметы и баллы", wkS: "Недельные",
  chatT: "Чат", gen: "Общий", newGrp: "Новая группа", grpName: "Название группы", members: "Участники", create: "Создать",
  rename: "Переименовать", delGrp: "Удалить группу", msgPh: "Сообщение…", send: "Отправить", edit: "Изменить", edited: "изм.",
  leave: "Выйти из группы", search: "Поиск",
  admT: "Администрирование", users: "Пользователи", subjects: "Предметы", teacher: "Преподаватель", addSubj: "Добавить предмет",
  newU: "Новые", roleL: "Роль",
  banned: "Доступ закрыт. Обратитесь к администратору.", offline: "Не удалось подключиться к серверу. Проверьте интернет и обновите страницу.",
  loginOnly: "Вход только для студентов и сотрудников факультета. Логин и пароль выдаёт администратор.",
  addStaff: "Добавить сотрудника", addStud: "Добавить студента", staff: "Сотрудники", students: "Студенты",
  pendingL: "Ожидают подтверждения", removed: "Удалённые", restore: "Вернуть", delUser: "Удалить",
  delUserQ: "Удалить «%»? Он больше не сможет войти. Баллы и сообщения сохранятся, вернуть доступ можно в разделе «Удалённые».",
  pwBtn: "Пароль", pwSetQ: "Новый пароль для «%» (минимум 8 символов):", pwOk: "Пароль изменён",
  newStaffT: "Новый сотрудник", newStudT: "Новый студент", genPw: "Придумать", created: "Аккаунт создан. Передайте данные для входа:",
  taken: "Такой логин уже занят.", copy: "Копировать", copied: "Скопировано", close: "Закрыть", findU: "Поиск по ФИО, логину или группе",
  perms: "Разрешения", permsSub: "Отметьте разделы, которые увидят студенты и преподаватели после входа. Администратор видит всё.",
  permStud: "Студент", permTch: "Преподаватель", section: "Раздел",
  sem: "Семестр", semStart: "Начало семестра", semHint: "Рубеж 1 — после 8 недель (с %1), рубеж 2 — после 16 недель (с %2), потом экзамен.",
  semNone: "Укажите дату начала семестра — тогда рубежи и экзамен откроются по срокам.",
  needSql: "Сначала запустите файл supabase-setup.sql в Supabase (SQL Editor → Run). Без него не работают разрешения, удаление пользователей и фото в чате.",
  day: "+ День", p1: "1–8 неделя", p2: "9–16 неделя", opensOn: "Откроется %", dayS: "Дневные",
  attach: "Фото или видео", voice: "Голосовое сообщение", rec: "Запись", cancel: "Отмена", sending: "Отправка…",
  noRec: "Этот браузер не умеет записывать голос.", noMic: "Нет доступа к микрофону. Разрешите его в настройках браузера.",
  lbl: { image: "📷 Фото", video: "🎥 Видео", audio: "🎤 Голосовое", file: "📎 Файл" },
  sec: { home: "Главная", today: "Сегодня", search: "Поиск", history: "История", depts: "Кафедры", schedule: "Расписание", rooms: "Аудитории", calc: "Калькулятор баллов", journal: "Журнал преподавателя", dean: "Деканат", news: "Новости", apply: "Абитуриенту", scores: "Баллы студентов", ann: "Объявления", mat: "Материалы", chat: "Чат", subj: "Мои предметы (баллы)" }
},
tj: {
  ann: "Эълонҳо", mat: "Маводҳо", chat: "Чат", login: "Ворид шудан", cab: "Кабинет", subj: "Фанҳои ман", admin: "Админ",
  noCfg: "Сервер ҳоло пайваст нашудааст. Маъмури сомона бояд суроғаи Supabase-ро дар файли cloud.js нависад.",
  needLogin: "Ин бахш баъд аз ворид шудан дастрас аст.", pending: "Ҳисоб тасдиқи маъмурро интизор аст. Баъд аз тасдиқ маводҳо, чат ва баҳоҳо кушода мешаванд.",
  noAccess: "Ба ин бахш дастрасӣ нест.", loading: "Боргирӣ…", err: "Хато", saved: "Захира шуд", empty: "Ҳоло холӣ",
  inT: "Воридшавӣ", upT: "Бақайдгирӣ", lg: "Логин", pw: "Парол", pw2: "Паролро такрор кунед", fio: "Насаб Ном Номи падар",
  inBtn: "Ворид шудан", upBtn: "Ба қайд гирифтан", out: "Баромадан",
  lgHint: "Ҳарфҳои лотинӣ, рақамҳо, нуқта, тире; 3–30 аломат.", pwShort: "Парол — ҳадди ақал 8 аломат.", pwDiff: "Паролҳо мувофиқ нестанд.",
  badLogin: "Логин ё парол нодуруст аст.", upOk: "Ҳисоб сохта шуд. Интизор шавед, то маъмур онро тасдиқ кунад ва нақш диҳад.",
  role: { pending: "тасдиқро интизор", student: "донишҷӯ", teacher: "омӯзгор", admin: "маъмур" },
  dept: "Кафедра", grp: "Гурӯҳ", faculty: "Тамоми факулта", all: "Ҳама",
  annT: "Эълонҳои кафедраҳо", annSub: "Эълонҳои рӯз аз омӯзгорон. Ҳар кафедра эълонҳои худро менависад.",
  annNew: "Эълони нав", annPh: "Матни эълон", annDay: "Барои сана", post: "Нашр кардан", today: "Имрӯз", del: "Нест кардан", delQ: "Нест карда шавад?",
  deptAnn: "Эълонҳои кафедра",
  matT: "Маводҳо ва барномаҳо", matSub: "Маводҳои таълимӣ, барномаҳо, силлабусҳо ва тестҳои кафедраҳо.",
  kind: { material: "Мавод", program: "Барнома", syllabus: "Силлабус", test: "Тест" }, kindL: "Намуд",
  title: "Ном", file: "Файл", subject: "Фан", noSubject: "— бе фан —", upload: "Боргузорӣ", uploading: "Файл бор мешавад…",
  open: "Кушодан", dl: "Зеркашӣ", allowDl: "Иҷозати зеркашӣ", denyDl: "Манъи зеркашӣ",
  dlOn: "Зеркашӣ иҷозат аст", dlOff: "Танҳо дидан",
  noPreview: "Ин формат дар браузер намоиш дода намешавад. Маводҳоро дар PDF бор кунед.",
  testsHint: "Тестҳоро танҳо маъмур, муаллиф ва омӯзгори фан мебинанд.", maxSize: "Файл аз 50 МБ калон аст.",
  subjT: "Фанҳои ман", subjSub: "Силлабус, донишҷӯён ва баҳоҳо аз рӯи фанҳои шумо.", pick: "— интихоб кунед —", noSubj: "Ба шумо ҳоло фан таъин нашудааст. Онро маъмур таъин мекунад.",
  syl: "Силлабус", save: "Захира", studs: "Донишҷӯён", addSt: "Илова", grF: "Филтр аз рӯи гурӯҳ",
  grades: "Баҳоҳо", wk: "+ Ҳафта", r1: "Рубежи 1", r2: "Рубежи 2", ex: "Имтиҳон", tot: "Ҷамъ", st: "Донишҷӯ",
  grHint: "Баҳои рӯзона 0–10 барои ҳар рӯзи дарс гузошта мешавад. Рубежи 1 — баъд аз 8 ҳафта, рубежи 2 — баъд аз 16 ҳафта, баъд имтиҳон (0–100). Ҷамъ = миёнаи рубежҳо × 60% + имтиҳон × 40%. Баҳоҳо фавран захира мешаванд.",
  myGr: "Фанҳо ва баҳоҳои ман", wkS: "Ҳафтаина",
  chatT: "Чат", gen: "Умумӣ", newGrp: "Гурӯҳи нав", grpName: "Номи гурӯҳ", members: "Аъзоён", create: "Сохтан",
  rename: "Иваз кардани ном", delGrp: "Нест кардани гурӯҳ", msgPh: "Паём…", send: "Фиристодан", edit: "Таҳрир", edited: "таҳр.",
  leave: "Баромадан аз гурӯҳ", search: "Ҷустуҷӯ",
  admT: "Идоракунӣ", users: "Корбарон", subjects: "Фанҳо", teacher: "Омӯзгор", addSubj: "Илова кардани фан",
  newU: "Навҳо", roleL: "Нақш",
  banned: "Дастрасӣ баста аст. Ба маъмур муроҷиат кунед.", offline: "Ба сервер пайваст шуда натавонистем. Интернетро санҷед ва саҳифаро нав кунед.",
  loginOnly: "Воридшавӣ танҳо барои донишҷӯён ва кормандони факулта. Логин ва паролро маъмур медиҳад.",
  addStaff: "Илова кардани корманд", addStud: "Илова кардани донишҷӯ", staff: "Кормандон", students: "Донишҷӯён",
  pendingL: "Тасдиқро интизоранд", removed: "Несткардашудаҳо", restore: "Баргардондан", delUser: "Нест кардан",
  delUserQ: "«%» нест карда шавад? Ӯ дигар ворид шуда наметавонад. Баҳоҳо ва паёмҳо боқӣ мемонанд, дастрасиро дар бахши «Несткардашудаҳо» баргардондан мумкин аст.",
  pwBtn: "Парол", pwSetQ: "Пароли нав барои «%» (ҳадди ақал 8 аломат):", pwOk: "Парол иваз шуд",
  newStaffT: "Корманди нав", newStudT: "Донишҷӯи нав", genPw: "Сохтан", created: "Ҳисоб сохта шуд. Маълумоти воридшавиро супоред:",
  taken: "Ин логин аллакай банд аст.", copy: "Нусхабардорӣ", copied: "Нусха гирифта шуд", close: "Пӯшидан", findU: "Ҷустуҷӯ аз рӯи ном, логин ё гурӯҳ",
  perms: "Иҷозатҳо", permsSub: "Бахшҳоеро қайд кунед, ки донишҷӯён ва омӯзгорон баъд аз воридшавӣ мебинанд. Маъмур ҳамаро мебинад.",
  permStud: "Донишҷӯ", permTch: "Омӯзгор", section: "Бахш",
  sem: "Семестр", semStart: "Оғози семестр", semHint: "Рубежи 1 — баъд аз 8 ҳафта (аз %1), рубежи 2 — баъд аз 16 ҳафта (аз %2), баъд имтиҳон.",
  semNone: "Санаи оғози семестрро нишон диҳед — он гоҳ рубежҳо ва имтиҳон дар мӯҳлаташон кушода мешаванд.",
  needSql: "Аввал файли supabase-setup.sql-ро дар Supabase иҷро кунед (SQL Editor → Run). Бе он иҷозатҳо, нест кардани корбарон ва акс дар чат кор намекунанд.",
  day: "+ Рӯз", p1: "Ҳафтаи 1–8", p2: "Ҳафтаи 9–16", opensOn: "Аз % кушода мешавад", dayS: "Рӯзона",
  attach: "Акс ё видео", voice: "Паёми овозӣ", rec: "Сабт", cancel: "Бекор", sending: "Фиристода мешавад…",
  noRec: "Ин браузер овозро сабт карда наметавонад.", noMic: "Ба микрофон дастрасӣ нест. Онро дар танзимоти браузер иҷозат диҳед.",
  lbl: { image: "📷 Акс", video: "🎥 Видео", audio: "🎤 Паёми овозӣ", file: "📎 Файл" },
  sec: { home: "Асосӣ", today: "Имрӯз", search: "Ҷустуҷӯ", history: "Таърих", depts: "Кафедраҳо", schedule: "Ҷадвал", rooms: "Аудиторияҳо", calc: "Ҳисобкунаки баҳо", journal: "Журнали омӯзгор", dean: "Деканат", news: "Хабарҳо", apply: "Ба довталаб", scores: "Баҳоҳои донишҷӯён", ann: "Эълонҳо", mat: "Маводҳо", chat: "Чат", subj: "Фанҳои ман (баҳоҳо)" }
}};
function t(k) { var d = S[X.lang()] || S.ru; return d[k] !== undefined ? d[k] : S.ru[k]; }
function e(s) { return s == null ? "" : X.ea(s); }
function $(id) { return document.getElementById(id); }
function deptName(n) { return n ? X.dept(n - 1) : t("faculty"); }
function fdate(d) { return String(d || "").slice(0, 10).split("-").reverse().join("."); }
function ftime(ts) { var d = new Date(ts); return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }) + " " + d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }); }
function today() { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
function ymd(x) { return x.getFullYear() + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" + ("0" + x.getDate()).slice(-2); }
function addDays(d, n) { var x = new Date(d + "T12:00:00"); x.setDate(x.getDate() + n); return ymd(x); }
// семестр: рубеж 1 — после 8 недель, рубеж 2 — после 16 недель, потом экзамен
function semInfo() { var d = SET.sem; if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return null; return { start: d, r1: addDays(d, 56), r2: addDays(d, 112) }; }
function opensOf(kind) { var si = semInfo(); if (!si || kind === "w") return null; var d = kind === "r1" ? si.r1 : si.r2; return today() < d ? d : null; }
function fsize(n) { return n > 1048576 ? (n / 1048576).toFixed(1) + " МБ" : Math.max(1, Math.round(n / 1024)) + " КБ"; }
function deptOpts(sel, withFaculty) {
  var h = withFaculty ? '<option value="">' + e(t("faculty")) + '</option>' : '';
  for (var i = 1; i <= 5; i++) h += '<option value="' + i + '"' + (String(sel) === String(i) ? " selected" : "") + '>' + e(X.dept(i - 1)) + '</option>';
  return h;
}
function msg(el, text, bad) { if (el) { el.textContent = text || ""; el.className = "cl-msg" + (bad ? " bad" : " ok"); } }
function fail(el, err) { msg(el, t("err") + ": " + ((err && err.message) || err), true); }

/* ---------- стили ---------- */
var css = document.createElement("style");
css.textContent =
".cl-f{display:flex;flex-direction:column;gap:10px}.cl-f input,.cl-f select,.cl-f textarea,.cl-in{padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--text);font:inherit;font-size:16px;width:100%;min-width:0}" +
".cl-f textarea{min-height:90px;resize:vertical}.cl-msg{margin:4px 0 0;font-size:14px}.cl-msg.bad{color:#be123c}.cl-msg.ok{color:#047857}" +
".cl-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}.cl-it{position:relative;padding:14px 16px;margin-bottom:10px}" +
".cl-it .meta{font-size:13px;color:var(--muted);margin-top:6px}.cl-it p{white-space:pre-wrap;color:var(--text);font-size:15px}" +
".cl-act{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}.cl-b{border:1px solid var(--line);background:var(--card);color:var(--text);border-radius:999px;padding:6px 14px;font:inherit;font-size:14px;cursor:pointer}" +
".cl-b:hover{border-color:var(--accent)}.cl-b.pri{background:var(--accent);border-color:var(--accent);color:#fff}.cl-b.dng{color:#be123c}" +
".cl-day{font-weight:700;color:var(--accent);margin:18px 0 8px}.cl-tag{display:inline-block;border-radius:999px;padding:0 9px;font-size:12px;font-weight:600;background:var(--line);color:var(--text);margin-right:6px}" +
".cl-chat{display:grid;grid-template-columns:240px 1fr;gap:14px;min-height:60vh}@media(max-width:720px){.cl-chat{grid-template-columns:1fr}}" +
".cl-rooms{display:flex;flex-direction:column;gap:6px}.cl-room{text-align:left;border:1px solid var(--line);background:var(--card);color:var(--text);border-radius:12px;padding:10px 12px;font:inherit;cursor:pointer}" +
".cl-room.on{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--card))}" +
".cl-msgs{display:flex;flex-direction:column;height:60vh;padding:0;overflow:hidden}.cl-ml{flex:1;overflow-y:auto;padding:14px}" +
".cl-m{margin-bottom:10px;max-width:85%}.cl-m.me{margin-left:auto;text-align:right}.cl-m .bb{display:inline-block;text-align:left;background:color-mix(in srgb,var(--accent) 9%,var(--card));border:1px solid var(--line);border-radius:14px;padding:8px 12px;white-space:pre-wrap;word-break:break-word}" +
".cl-m .who{font-size:12px;color:var(--muted)}.cl-m .who button{background:none;border:0;color:var(--muted);cursor:pointer;font-size:12px;padding:0 4px}" +
".cl-send{display:flex;gap:8px;border-top:1px solid var(--line);padding:10px}.cl-send textarea{flex:1;min-height:44px;max-height:140px;resize:vertical}" +
".cl-pick{max-height:220px;overflow:auto;border:1px solid var(--line);border-radius:12px;padding:6px 10px}.cl-pick label{display:flex;gap:8px;align-items:center;padding:3px 0;font-size:15px;color:var(--text)}" +
".cl-viewer iframe,.cl-viewer img{width:100%;height:75vh;border:0;border-radius:10px;background:#fff;object-fit:contain}" +
".cl-tbl td input{width:62px;padding:6px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--text);font:inherit;text-align:center}" +
".cl-tbl td input.sv{border-color:#047857}.cl-tbl td input.er{border-color:#be123c}" +
".cl-ann-strip{margin-top:18px}" +
".cl-login{max-width:420px;margin:0 auto}.cl-note{font-size:14px;color:var(--muted);margin:0}" +
".cl-bar{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 14px}.cl-warn{border-left:4px solid #b45309}" +
".cl-tbl td input.lk{opacity:.45;cursor:not-allowed}.cl-tbl th.grp{font-size:12px;color:var(--muted);font-weight:600}" +
".cl-perm td{text-align:center}.cl-perm td.nm{text-align:left}.cl-perm input{width:20px;height:20px;cursor:pointer}" +
".cl-ib{border:1px solid var(--line);background:var(--card);color:var(--text);border-radius:12px;min-width:44px;font-size:20px;cursor:pointer;padding:0 8px}" +
".cl-ib.on{background:#be123c;border-color:#be123c;color:#fff}.cl-st{font-size:13px;color:var(--muted);padding:0 10px 8px}" +
".cl-m .bb img,.cl-m .bb video{display:block;max-width:min(320px,100%);max-height:320px;border-radius:10px;margin:2px 0 4px;background:#000;cursor:pointer}" +
".cl-m .bb audio{display:block;width:260px;max-width:100%;margin:2px 0 4px}.cl-m .bb a{color:var(--accent)}" +
".cl-ut select,#stbl select{max-width:190px}.cl-ut td,#stbl td{white-space:nowrap}" +
".cl-big{position:fixed;inset:0;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;z-index:99;cursor:zoom-out}.cl-big img{max-width:96vw;max-height:94vh}";
document.head.appendChild(css);

/* ---------- состояние ---------- */
var sb = null, USER = null, ME = null, CH = null, ROOM = null, SUBJ = null;
var READY = !!(CFG.url && CFG.key && window.supabase);
var ROUTES = { ann: 1, mat: 1, chat: 1, subj: 1, admin: 1, login: 1 };

var AUTH = false; // сессия уже проверена
var SET = { perms: null, sem: null, ok: true }; // настройки сайта из таблицы mf_settings

function role() { return ME ? ME.role : null; }
function isMember() { return !!ME && !ME.blocked && ME.role !== "pending"; }
function isAdmin() { return isMember() && ME.role === "admin"; }
function isTeacher() { return isMember() && ME.role === "teacher"; }
function live(p) { return p && !p.blocked; }
function needSql(err) { var m = String((err && (err.message || err.code)) || err || ""); return /does not exist|schema cache|PGRST20[25]|42P01|42883|Bucket not found/i.test(m); }
function errText(err) { return needSql(err) ? t("needSql") : t("err") + ": " + ((err && err.message) || err); }

function loadSettings() {
  return sb.from("mf_settings").select("*").then(function (r) {
    SET.ok = !r.error; SET.perms = null; SET.sem = null;
    (r.data || []).forEach(function (x) { if (x.key === "perms") SET.perms = x.value; if (x.key === "semester") SET.sem = x.value && x.value.start || null; });
  }, function () { SET.ok = false; });
}
function loadMe() {
  if (!sb) return Promise.resolve();
  return sb.auth.getSession().then(function (r) {
    var s = r.data && r.data.session; USER = s ? s.user : null;
    if (!USER) { ME = null; return; }
    return Promise.all([sb.from("profiles").select("*").eq("id", USER.id).maybeSingle(), loadSettings()]).then(function (rs) {
      ME = rs[0].data || null;
      if (ME && ME.blocked) { ME = null; USER = null; return sb.auth.signOut(); }
    });
  }).catch(function () { ME = null; });
}

/* ---------- разрешения ---------- */
// разделы сайта, которые администратор открывает студентам и преподавателям
var SECS = ["home", "today", "search", "history", "depts", "schedule", "rooms", "calc", "journal", "dean", "news", "apply", "scores", "ann", "mat", "chat", "subj"];
var DEF = {
  student: SECS.filter(function (s) { return s !== "journal" && s !== "subj"; }),
  teacher: SECS.slice()
};
function permsFor(r) { var p = SET.perms && SET.perms[r]; return Array.isArray(p) ? p : (DEF[r] || []); }
function secOf(r) {
  if (!r) return "home";
  if (/^d[1-5]$/.test(r)) return "depts";
  if (/^u-[a-z0-9]+$/i.test(r)) return "scores";
  if (r === "teacher") return "journal";
  return r;
}
function allowed(r) {
  var s = secOf(r);
  if (s === "login") return true;
  if (!isMember()) return false;
  if (isAdmin()) return true;
  if (s === "admin") return false;
  if (s === "subj" && !isTeacher()) return false;
  return permsFor(ME.role).indexOf(s) > -1;
}
function landing() {
  if (!isMember()) return "login";
  var l = ["home"].concat(SECS).filter(allowed);
  return l.length ? l[0] : "login";
}

/* ---------- меню ---------- */
function nav(r) {
  var n = $("nav"), th = $("thb");
  if (!n) return;
  function a(h, l) { return allowed(h) ? '<a href="#' + h + '" class="' + (r === h ? "on" : "") + '">' + e(l) + '</a>' : ''; }
  var h = a("ann", t("ann")) + a("mat", t("mat")) + a("chat", t("chat")) + a("subj", t("subj")) + a("admin", t("admin"));
  h += '<a href="#login" class="' + (r === "login" ? "on" : "") + '">' + e(ME ? "👤 " + t("cab") : t("login")) + '</a>';
  if (th) th.insertAdjacentHTML("beforebegin", h); else n.insertAdjacentHTML("beforeend", h);
  if (!READY) return;
  // убираем из меню разделы, к которым нет разрешения
  [].forEach.call(n.querySelectorAll(":scope > a[href^='#']"), function (el) { if (!allowed(el.getAttribute("href").slice(1))) el.remove(); });
  // журнал преподавателя показываем, если он разрешён
  if (allowed("journal") && !n.querySelector('a[href="#journal"]')) {
    var lab = (window.T && window.T[X.lang()] && window.T[X.lang()].jr) || t("sec").journal, ref = n.querySelector('a[href="#dean"]') || n.querySelector('a[href="#login"]');
    if (ref) ref.insertAdjacentHTML("beforebegin", '<a href="#journal" class="' + (r === "journal" ? "on" : "") + '">' + e(lab) + '</a>');
  }
}

/* ---------- маршруты ---------- */
function shell(title, sub) {
  return '<main class="v"><h2>' + e(title) + '</h2>' + (sub ? '<p class="sub">' + e(sub) + '</p>' : '') + '<div id="clv"><p class="sub">' + e(t("loading")) + '</p></div></main>';
}
function view(r) {
  if (!ROUTES[r]) return null;
  if (r === "ann") return shell(t("annT"), t("annSub"));
  if (r === "mat") return shell(t("matT"), t("matSub"));
  if (r === "chat") return shell(t("chatT"));
  if (r === "subj") return shell(t("subjT"), t("subjSub"));
  if (r === "admin") return shell(t("admT"));
  return shell(ME ? t("cab") : t("login"));
}
function gate(needMember) {
  var v = $("clv");
  if (!READY) { v.innerHTML = '<div class="card"><p>' + e(t("noCfg")) + '</p></div>'; return false; }
  if (!needMember) return true;
  if (!ME) { v.innerHTML = '<div class="card"><p>' + e(t("needLogin")) + '</p><div class="cl-act"><a class="cl-b pri" href="#login">' + e(t("login")) + '</a></div></div>'; return false; }
  if (!isMember()) { v.innerHTML = '<div class="card"><p>' + e(t("pending")) + '</p></div>'; return false; }
  return true;
}
function bind(r) {
  if (CH && r !== "chat") { sb.removeChannel(CH); CH = null; }
  if (REC && r !== "chat") stopRec(false);
  var m = /^d([1-5])$/.exec(r);
  if (m) return deptAnn(+m[1]);
  if (!ROUTES[r]) return;
  if (r === "ann") return annV();
  if (r === "login") return loginV();
  if (!gate(true)) return;
  if (r === "mat") return matV();
  if (r === "chat") return chatV();
  if (r === "subj") return (isTeacher() || isAdmin()) ? subjV() : noAccess();
  if (r === "admin") return isAdmin() ? adminV() : noAccess();
}
function noAccess() { $("clv").innerHTML = '<div class="card"><p>' + e(t("noAccess")) + '</p></div>'; }

/* ---------- вход и кабинет ---------- */
function loginV() {
  if (!gate(false)) return;
  var v = $("clv");
  if (!ME) {
    v.innerHTML = '<form class="card cl-f cl-login" id="fin"><h3>' + e(t("inT")) + '</h3><p class="cl-note">' + e(t("loginOnly")) + '</p>' +
      '<input name="l" placeholder="' + e(t("lg")) + '" autocomplete="username" autocapitalize="none" spellcheck="false" required>' +
      '<input name="p" type="password" placeholder="' + e(t("pw")) + '" autocomplete="current-password" required>' +
      '<button class="btn2">' + e(t("inBtn")) + '</button><p class="cl-msg" id="min"></p></form>';
    $("fin").onsubmit = function (ev) {
      ev.preventDefault(); var f = ev.target, l = f.l.value.trim().toLowerCase(), btn = f.querySelector("button");
      if (!l || !f.p.value) return;
      msg($("min"), t("loading")); btn.disabled = true;
      sb.auth.signInWithPassword({ email: l + "@" + DOMAIN, password: f.p.value }).then(function (r) {
        if (r.error) { btn.disabled = false; return msg($("min"), /banned/i.test(r.error.message) ? t("banned") : t("badLogin"), true); }
        return loadMe().then(function () {
          btn.disabled = false;
          if (!ME) return msg($("min"), t("banned"), true);
          LAST = who();
          var to = landing();
          if (to !== "login" && location.hash !== "#" + to) location.hash = to; else X.render();
        });
      }).catch(function (err) { btn.disabled = false; fail($("min"), err); });
    };
    return;
  }
  var h = '<div class="card"><h3 style="font-size:20px">' + e(ME.full_name || ME.login) + '</h3><p>' + e(t("lg")) + ': ' + e(ME.login) + ' · ' + e(t("role")[ME.role]) +
    (ME.dept ? ' · ' + e(deptName(ME.dept)) : '') + (ME.grp ? ' · ' + e(t("grp")) + ' ' + e(ME.grp) : '') + '</p>' +
    (ME.role === "pending" ? '<p style="margin-top:10px;color:var(--text)">' + e(t("pending")) + '</p>' : '') +
    '<div class="cl-act">' + ((isTeacher() || isAdmin()) ? '<a class="cl-b" href="#subj">' + e(t("subj")) + '</a>' : '') + (isAdmin() ? '<a class="cl-b" href="#admin">' + e(t("admin")) + '</a>' : '') +
    '<button class="cl-b dng" id="bout">' + e(t("out")) + '</button></div></div><div id="myg"></div>';
  v.innerHTML = h;
  $("bout").onclick = function () { sb.auth.signOut().then(function () { USER = ME = null; X.render(); }); };
  if (isMember()) myGrades();
}
function myGrades() {
  Promise.all([
    sb.from("enrollments").select("subject_id, subjects(name, dept)").eq("student_id", ME.id),
    sb.from("grades").select("*").eq("student_id", ME.id)
  ]).then(function (rs) {
    var en = rs[0].data || [], gr = rs[1].data || [], si = semInfo();
    if (!en.length || !$("myg")) return;
    function wl(arr) { return arr.length ? arr.map(function (q) { return fdate(q.day).slice(0, 5) + " — <b>" + (+q.value) + "</b>"; }).join(", ") : "—"; }
    var h = '<h2>' + e(t("myGr")) + '</h2><div class="grid">';
    en.forEach(function (x) {
      var g = gr.filter(function (q) { return q.subject_id === x.subject_id; }), o = {}, w = [];
      g.forEach(function (q) { if (q.kind === "w") w.push(q); else o[q.kind] = +q.value; });
      w.sort(function (a, b) { return a.day < b.day ? -1 : 1; });
      function rv(k) { if (o[k] != null) return '<b>' + o[k] + '</b>'; var d = opensOf(k); return d ? '<span class="sub">' + e(t("opensOn").replace("%", fdate(d))) + '</span>' : '<b>—</b>'; }
      h += '<div class="card"><h3>' + e(x.subjects ? x.subjects.name : "") + '</h3>';
      if (si) {
        var w1 = w.filter(function (q) { return q.day < si.r1; }), w2 = w.filter(function (q) { return q.day >= si.r1; });
        h += '<p><b>' + e(t("p1")) + '</b> · ' + e(t("dayS")) + ': ' + wl(w1) + '</p><p>' + e(t("r1")) + ': ' + rv("r1") + '</p>' +
          '<p style="margin-top:6px"><b>' + e(t("p2")) + '</b> · ' + e(t("dayS")) + ': ' + wl(w2) + '</p><p>' + e(t("r2")) + ': ' + rv("r2") + '</p>' +
          '<p style="margin-top:6px">' + e(t("ex")) + ': ' + rv("ex") + '</p>';
      } else {
        h += (w.length ? '<p>' + e(t("dayS")) + ': ' + wl(w) + '</p>' : '') +
          '<p>' + e(t("r1")) + ': ' + rv("r1") + ' · ' + e(t("r2")) + ': ' + rv("r2") + ' · ' + e(t("ex")) + ': ' + rv("ex") + '</p>';
      }
      h += '<p style="margin-top:6px;color:var(--text)">' + e(t("tot")) + ': <b>' + total(o) + '</b></p></div>';
    });
    $("myg").innerHTML = h + '</div>';
  });
}
function total(o) {
  if (o.r1 == null && o.r2 == null && o.ex == null) return "—";
  var r = [o.r1, o.r2].filter(function (x) { return x != null; }), avg = r.length ? r.reduce(function (a, b) { return a + b; }, 0) / 2 : 0;
  return (Math.round((avg * 0.6 + (o.ex || 0) * 0.4) * 10) / 10).toString();
}

/* ---------- объявления ---------- */
function annCard(a) {
  var can = isAdmin() || (ME && a.author_id === ME.id);
  return '<div class="card cl-it"><p>' + e(a.body) + '</p><div class="meta"><span class="cl-tag">' + e(deptName(a.dept)) + '</span>' + e(a.author_name) + ' · ' + ftime(a.created_at) + '</div>' +
    (can ? '<div class="cl-act"><button class="cl-b dng" data-ad="' + a.id + '">' + e(t("del")) + '</button></div>' : '') + '</div>';
}
function annList(rows) {
  var by = {}, days = [];
  rows.forEach(function (a) { if (!by[a.day]) { by[a.day] = []; days.push(a.day); } by[a.day].push(a); });
  if (!days.length) return '<p class="sub">' + e(t("empty")) + '</p>';
  return days.map(function (d) { return '<div class="cl-day">' + (d === today() ? e(t("today")) + ' · ' : '') + fdate(d) + '</div>' + by[d].map(annCard).join(""); }).join("");
}
function bindAnnDel(root, after) {
  root.onclick = function (ev) {
    var id = ev.target.dataset && ev.target.dataset.ad; if (!id || !confirm(t("delQ"))) return;
    sb.from("announcements").delete().eq("id", id).then(after);
  };
}
var AF = "";
function annV() {
  if (!gate(false)) return;
  var v = $("clv"), canPost = isAdmin() || (isTeacher() && ME.dept);
  var h = '<div class="ctl"><label>' + e(t("dept")) + '<select id="afl"><option value="">' + e(t("all")) + '</option><option value="0"' + (AF === "0" ? " selected" : "") + '>' + e(t("faculty")) + '</option>' + deptOpts(AF) + '</select></label></div>';
  if (canPost) h += '<form class="card cl-f" id="fan" style="margin-bottom:18px"><h3>' + e(t("annNew")) + '</h3>' +
    (isAdmin() ? '<select name="d">' + deptOpts(ME.dept || "", true) + '</select>' : '<p class="sub" style="margin:0">' + e(deptName(ME.dept)) + '</p>') +
    '<textarea name="b" maxlength="1000" placeholder="' + e(t("annPh")) + '" required></textarea><label class="sub" style="margin:0">' + e(t("annDay")) + ' <input name="day" type="date" value="' + today() + '" style="width:auto"></label><button class="btn2">' + e(t("post")) + '</button><p class="cl-msg" id="man"></p></form>';
  h += '<div id="alist"><p class="sub">' + e(t("loading")) + '</p></div>';
  v.innerHTML = h;
  function load() {
    var q = sb.from("announcements").select("*").gte("day", new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10)).order("day", { ascending: false }).order("created_at", { ascending: false }).limit(200);
    if (AF === "0") q = q.is("dept", null); else if (AF) q = q.eq("dept", +AF);
    q.then(function (r) { $("alist").innerHTML = r.error ? '<p class="bad">' + e(r.error.message) + '</p>' : annList(r.data || []); });
  }
  $("afl").onchange = function () { AF = this.value; load(); };
  if (canPost) $("fan").onsubmit = function (ev) {
    ev.preventDefault(); var f = ev.target, d = isAdmin() ? (f.d.value ? +f.d.value : null) : ME.dept;
    sb.from("announcements").insert({ dept: d, body: f.b.value.trim(), day: f.day.value || today() }).then(function (r) {
      if (r.error) return fail($("man"), r.error);
      f.b.value = ""; msg($("man"), t("saved")); load();
    });
  };
  bindAnnDel($("alist"), load);
  load();
}
function deptAnn(n) {
  if (!READY) return;
  var main = document.querySelector("#app main"); if (!main) return;
  var box = document.createElement("div"); box.className = "cl-ann-strip";
  var h2 = main.querySelector("h2"); h2 ? main.insertBefore(box, h2) : main.appendChild(box);
  function load() {
    sb.from("announcements").select("*").eq("dept", n).gte("day", today()).order("day").order("created_at", { ascending: false }).limit(10).then(function (r) {
      var rows = r.data || [];
      box.innerHTML = rows.length ? '<h2>📌 ' + e(t("deptAnn")) + '</h2>' + annList(rows) : '';
    });
  }
  bindAnnDel(box, load); load();
}

/* ---------- материалы ---------- */
var MF = { d: "", k: "", s: "" };
function matV() {
  var v = $("clv"), canUp = isAdmin() || isTeacher();
  var subjQ = canUp ? (isAdmin() ? sb.from("subjects").select("id,name,dept").order("name") : sb.from("subjects").select("id,name,dept").eq("teacher_id", ME.id).order("name")) : Promise.resolve({ data: [] });
  Promise.all([subjQ, sb.from("subjects").select("id,name").order("name")]).then(function (rs) {
    var mine = rs[0].data || [], all = rs[1].data || [], sn = {};
    all.forEach(function (s) { sn[s.id] = s.name; });
    var kinds = Object.keys(t("kind"));
    var h = '<div class="ctl"><label>' + e(t("dept")) + '<select id="mfd"><option value="">' + e(t("all")) + '</option>' + deptOpts(MF.d) + '</select></label>' +
      '<label>' + e(t("kindL")) + '<select id="mfk"><option value="">' + e(t("all")) + '</option>' + kinds.map(function (k) { return '<option value="' + k + '"' + (MF.k === k ? " selected" : "") + '>' + e(t("kind")[k]) + '</option>'; }).join("") + '</select></label>' +
      '<label>' + e(t("subject")) + '<select id="mfs"><option value="">' + e(t("all")) + '</option>' + all.map(function (s) { return '<option value="' + s.id + '"' + (String(MF.s) === String(s.id) ? " selected" : "") + '>' + e(s.name) + '</option>'; }).join("") + '</select></label></div>';
    if (canUp) h += '<form class="card cl-f" id="fmu" style="margin-bottom:18px"><h3>' + e(t("upload")) + '</h3>' +
      '<input name="ti" placeholder="' + e(t("title")) + '" maxlength="200" required>' +
      '<select name="k">' + kinds.map(function (k) { return '<option value="' + k + '">' + e(t("kind")[k]) + '</option>'; }).join("") + '</select>' +
      '<select name="s"><option value="">' + e(t("noSubject")) + '</option>' + mine.map(function (s) { return '<option value="' + s.id + '">' + e(s.name) + '</option>'; }).join("") + '</select>' +
      (isAdmin() ? '<select name="d">' + deptOpts(ME.dept || 1) + '</select>' : '') +
      '<input name="f" type="file" required><p class="sub" style="margin:0;font-size:13px">' + e(t("testsHint")) + '</p><button class="btn2">' + e(t("upload")) + '</button><p class="cl-msg" id="mmu"></p></form>';
    h += '<div id="mlist"></div>';
    v.innerHTML = h;
    ["mfd", "mfk", "mfs"].forEach(function (id) { $(id).onchange = function () { MF[id.slice(2)] = this.value; list(); }; });
    if (canUp) $("fmu").onsubmit = function (ev) {
      ev.preventDefault(); var f = ev.target, file = f.f.files[0], mm = $("mmu");
      if (!file) return;
      if (file.size > 52428800) return msg(mm, t("maxSize"), true);
      var sid = f.s.value ? +f.s.value : null, subj = mine.filter(function (s) { return s.id === sid; })[0];
      var dept = subj && subj.dept ? subj.dept : (isAdmin() ? +f.d.value : ME.dept);
      var ext = (file.name.match(/\.[A-Za-z0-9]{1,8}$/) || [""])[0].toLowerCase();
      var path = ME.id + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + ext;
      msg(mm, t("uploading"));
      sb.storage.from("materials").upload(path, file, { contentType: file.type || "application/octet-stream" }).then(function (r) {
        if (r.error) throw r.error;
        return sb.from("materials").insert({ title: f.ti.value.trim(), kind: f.k.value, dept: dept, subject_id: sid, path: path, mime: file.type || "", size: file.size });
      }).then(function (r) {
        if (r.error) { sb.storage.from("materials").remove([path]); throw r.error; }
        f.reset(); msg(mm, t("saved")); list();
      }).catch(function (err) { fail(mm, err); });
    };
    function list() {
      var q = sb.from("materials").select("*").order("created_at", { ascending: false }).limit(300);
      if (MF.d) q = q.eq("dept", +MF.d);
      if (MF.k) q = q.eq("kind", MF.k);
      if (MF.s) q = q.eq("subject_id", +MF.s);
      q.then(function (r) {
        var rows = r.data || [];
        $("mlist").innerHTML = r.error ? '<p class="bad">' + e(r.error.message) + '</p>' : rows.length ? '<div class="grid">' + rows.map(function (m) {
          var own = m.uploaded_by === ME.id, canDl = m.allow_download || isAdmin() || own;
          return '<div class="card cl-it"><span class="cl-tag">' + e(t("kind")[m.kind]) + '</span><h3 style="margin-top:6px">' + e(m.title) + '</h3><div class="meta">' + e(deptName(m.dept)) + (m.subject_id && sn[m.subject_id] ? ' · ' + e(sn[m.subject_id]) : '') + ' · ' + fsize(m.size) + ' · ' + fdate(m.created_at) + '<br>' + (m.allow_download ? '⬇ ' + e(t("dlOn")) : '👁 ' + e(t("dlOff"))) + '</div>' +
            '<div class="cl-act"><button class="cl-b pri" data-mo="' + m.id + '">' + e(t("open")) + '</button>' + (canDl ? '<button class="cl-b" data-mdl="' + m.id + '">' + e(t("dl")) + '</button>' : '') +
            (isAdmin() ? '<button class="cl-b" data-mt="' + m.id + '">' + e(m.allow_download ? t("denyDl") : t("allowDl")) + '</button>' : '') +
            ((isAdmin() || own) ? '<button class="cl-b dng" data-mx="' + m.id + '">' + e(t("del")) + '</button>' : '') + '</div></div>';
        }).join("") + '</div>' : '<p class="sub">' + e(t("empty")) + '</p>';
        $("mlist").onclick = function (ev) {
          var d = ev.target.dataset || {}, id = +(d.mo || d.mdl || d.mt || d.mx); if (!id) return;
          var m = rows.filter(function (x) { return x.id === id; })[0]; if (!m) return;
          if (d.mo) openMat(m);
          else if (d.mdl) sb.storage.from("materials").createSignedUrl(m.path, 60, { download: m.title + ((m.path.match(/\.[a-z0-9]+$/) || [""])[0]) }).then(function (r) { if (r.data) location.href = r.data.signedUrl; });
          else if (d.mt) sb.from("materials").update({ allow_download: !m.allow_download }).eq("id", id).then(list);
          else if (d.mx && confirm(t("delQ"))) sb.from("materials").delete().eq("id", id).then(function (r) { if (!r.error) sb.storage.from("materials").remove([m.path]); list(); });
        };
      });
    }
    list();
  });
}
function openMat(m) {
  var mime = m.mime || "", isPdf = /pdf/.test(mime) || /\.pdf$/i.test(m.path), isImg = /^image\//.test(mime), isTxt = /^text\//.test(mime);
  var box = document.createElement("div"); box.className = "mdl";
  box.innerHTML = '<div class="card cl-viewer" style="max-width:1000px" oncontextmenu="return false"><div class="row" style="justify-content:space-between;gap:10px;margin-bottom:10px"><h3 style="margin:0">' + e(m.title) + '</h3><button class="cl-b" data-x="1">✕</button></div><div id="mvb"><p class="sub">' + e(t("loading")) + '</p></div></div>';
  document.body.appendChild(box);
  box.onclick = function (ev) { if (ev.target === box || (ev.target.dataset && ev.target.dataset.x)) box.remove(); };
  if (!isPdf && !isImg && !isTxt) { $("mvb").innerHTML = '<p>' + e(t("noPreview")) + '</p>'; return; }
  sb.storage.from("materials").download(m.path).then(function (r) {
    if (r.error) return fail($("mvb"), r.error);
    var url = URL.createObjectURL(r.data), b = $("mvb");
    if (!b) return;
    if (isImg) b.innerHTML = '<img alt="" draggable="false" src="' + url + '">';
    else if (isTxt) r.data.text().then(function (s) { b.innerHTML = '<pre style="white-space:pre-wrap;max-height:75vh;overflow:auto">' + e(s) + '</pre>'; });
    else b.innerHTML = '<iframe title="' + e(m.title) + '" src="' + url + (m.allow_download || isAdmin() || m.uploaded_by === ME.id ? "" : "#toolbar=0&navpanes=0") + '"></iframe>';
  });
}

/* ---------- мои предметы ---------- */
function subjV() {
  var v = $("clv"), q = sb.from("subjects").select("*").order("name");
  if (!isAdmin()) q = q.eq("teacher_id", ME.id);
  q.then(function (r) {
    var ss = r.data || [];
    if (!ss.length) { v.innerHTML = '<div class="card"><p>' + e(t("noSubj")) + '</p></div>'; return; }
    if (!SUBJ || !ss.some(function (s) { return s.id === SUBJ; })) SUBJ = ss[0].id;
    v.innerHTML = '<div class="ctl"><label>' + e(t("subject")) + '<select id="ssel">' + ss.map(function (s) { return '<option value="' + s.id + '"' + (s.id === SUBJ ? " selected" : "") + '>' + e(s.name) + ' · ' + e(deptName(s.dept)) + '</option>'; }).join("") + '</select></label></div><div id="sbody"></div>';
    $("ssel").onchange = function () { SUBJ = +this.value; subjBody(ss.filter(function (s) { return s.id === SUBJ; })[0]); };
    subjBody(ss.filter(function (s) { return s.id === SUBJ; })[0]);
  });
}
function subjBody(s) {
  var b = $("sbody");
  b.innerHTML = '<form class="card cl-f" id="fsy"><h3>' + e(t("syl")) + '</h3><textarea name="y" maxlength="20000" style="min-height:160px">' + e(s.syllabus) + '</textarea><button class="btn2">' + e(t("save")) + '</button><p class="cl-msg" id="msy"></p></form>' +
    '<h2>' + e(t("studs")) + '</h2><div class="card"><div class="cl-f"><div class="row" style="gap:8px"><input class="cl-in" id="sgf" placeholder="' + e(t("grF")) + '" style="flex:1 1 140px"><select class="cl-in" id="sadd" style="flex:3 1 220px"></select><button class="cl-b pri" id="badd">' + e(t("addSt")) + '</button></div></div><div id="slst" style="margin-top:10px"></div></div>' +
    '<h2>' + e(t("grades")) + '</h2><p class="sub">' + e(t("grHint")) + '</p><div class="row" style="gap:8px;margin-bottom:10px"><input type="date" class="cl-in" id="wkd" value="' + today() + '" style="width:auto"><button class="cl-b pri" id="bwk">' + e(t("day")) + '</button></div><p class="sub" id="semi"></p><div class="jt cl-tbl" id="gtbl"></div>';
  $("fsy").onsubmit = function (ev) {
    ev.preventDefault();
    sb.from("subjects").update({ syllabus: ev.target.y.value }).eq("id", s.id).then(function (r) { r.error ? fail($("msy"), r.error) : (s.syllabus = ev.target.y.value, msg($("msy"), t("saved"))); });
  };
  var EXTRA = [];
  function load() {
    Promise.all([
      sb.from("enrollments").select("student_id, profiles(id, full_name, login, grp)").eq("subject_id", s.id),
      sb.from("grades").select("*").eq("subject_id", s.id),
      sb.from("profiles").select("*").eq("role", "student").order("full_name")
    ]).then(function (rs) {
      var en = (rs[0].data || []).map(function (x) { return x.profiles; }).filter(Boolean).sort(function (a, b) { return (a.full_name || "").localeCompare(b.full_name || ""); });
      var gr = rs[1].data || [], studs = (rs[2].data || []).filter(live), inIds = {};
      en.forEach(function (p) { inIds[p.id] = 1; });
      function fillAdd() {
        var f = ($("sgf").value || "").trim().toLowerCase();
        $("sadd").innerHTML = studs.filter(function (p) { return !inIds[p.id] && (!f || (p.grp || "").toLowerCase().indexOf(f) > -1 || (p.full_name || "").toLowerCase().indexOf(f) > -1); })
          .map(function (p) { return '<option value="' + p.id + '">' + e(p.full_name || p.login) + (p.grp ? ' · ' + e(p.grp) : '') + '</option>'; }).join("");
      }
      fillAdd(); $("sgf").oninput = fillAdd;
      $("badd").onclick = function () { var id = $("sadd").value; if (id) sb.from("enrollments").insert({ subject_id: s.id, student_id: id }).then(load); };
      $("slst").innerHTML = en.length ? en.map(function (p) { return '<div class="row" style="justify-content:space-between;gap:8px;padding:6px 0;border-top:1px solid var(--line)"><span>' + e(p.full_name || p.login) + (p.grp ? ' <small class="sub">· ' + e(p.grp) + '</small>' : '') + '</span><button class="cl-b dng" data-un="' + p.id + '">✕</button></div>'; }).join("") : '<p class="sub">' + e(t("empty")) + '</p>';
      $("slst").onclick = function (ev) { var id = ev.target.dataset && ev.target.dataset.un; if (id && confirm(t("delQ"))) sb.from("enrollments").delete().eq("subject_id", s.id).eq("student_id", id).then(load); };
      var G = {}, days = {};
      gr.forEach(function (g) { G[g.student_id + "|" + g.kind + "|" + g.day] = +g.value; if (g.kind === "w") days[g.day] = 1; });
      EXTRA.forEach(function (d) { days[d] = 1; });
      var dl = Object.keys(days).sort(), si = semInfo();
      var d1 = si ? dl.filter(function (d) { return d < si.r1; }) : dl, d2 = si ? dl.filter(function (d) { return d >= si.r1; }) : [];
      $("semi").textContent = si ? t("semHint").replace("%1", fdate(si.r1)).replace("%2", fdate(si.r2)) : (isAdmin() ? t("semNone") : "");
      function cell(sid, kind, day, max) {
        var k = sid + "|" + kind + "|" + day, v = G[k], lk = isAdmin() ? null : opensOf(kind);
        return '<td><input type="number" min="0" max="' + max + '" step="0.5" inputmode="decimal" data-g="' + k + '" value="' + (v != null ? v : "") + '"' +
          (lk ? ' disabled class="lk" title="' + e(t("opensOn").replace("%", fdate(lk))) + '"' : '') + '></td>';
      }
      function dh(arr) { return arr.map(function (d) { return '<th>' + fdate(d).slice(0, 5) + '</th>'; }).join(""); }
      var head = si
        ? '<tr><th class="nm" rowspan="2">' + e(t("st")) + '</th><th class="grp" colspan="' + (d1.length + 1) + '">' + e(t("p1")) + '</th><th class="grp" colspan="' + (d2.length + 1) + '">' + e(t("p2")) + '</th><th rowspan="2">' + e(t("ex")) + '</th><th rowspan="2">' + e(t("tot")) + '</th></tr>' +
          '<tr>' + dh(d1) + '<th>' + e(t("r1")) + '</th>' + dh(d2) + '<th>' + e(t("r2")) + '</th></tr>'
        : '<tr><th class="nm">' + e(t("st")) + '</th>' + dh(d1) + '<th>' + e(t("r1")) + '</th><th>' + e(t("r2")) + '</th><th>' + e(t("ex")) + '</th><th>' + e(t("tot")) + '</th></tr>';
      function dc(sid, arr) { return arr.map(function (d) { return cell(sid, "w", d, 10); }).join(""); }
      $("gtbl").innerHTML = en.length ? '<table>' + head +
        en.map(function (p) {
          var o = { r1: G[p.id + "|r1|2000-01-01"], r2: G[p.id + "|r2|2000-01-01"], ex: G[p.id + "|ex|2000-01-01"] };
          return '<tr><td class="nm">' + e(p.full_name || p.login) + '</td>' + dc(p.id, d1) + cell(p.id, "r1", "2000-01-01", 100) + dc(p.id, d2) + cell(p.id, "r2", "2000-01-01", 100) + cell(p.id, "ex", "2000-01-01", 100) + '<td class="res" data-tot="' + p.id + '">' + total(o) + '</td></tr>';
        }).join("") + '</table>' : '<p class="sub" style="padding:12px">' + e(t("empty")) + '</p>';
      $("gtbl").onchange = function (ev) {
        var el = ev.target, k = el.dataset && el.dataset.g; if (!k) return;
        var a = k.split("|"), raw = el.value.trim(), val = raw === "" ? null : +raw, max = a[1] === "w" ? 10 : 100;
        el.className = "";
        if (val != null && (isNaN(val) || val < 0 || val > max)) { el.className = "er"; return; }
        var row = { subject_id: s.id, student_id: a[0], kind: a[1], day: a[2] };
        var p = val == null ? sb.from("grades").delete().match(row) : sb.from("grades").upsert(Object.assign({ value: val }, row));
        p.then(function (r) {
          if (r.error) { el.className = "er"; el.title = r.error.message; return; }
          el.className = "sv"; if (val == null) delete G[k]; else G[k] = val;
          var td = document.querySelector('[data-tot="' + a[0] + '"]');
          if (td) td.textContent = total({ r1: G[a[0] + "|r1|2000-01-01"], r2: G[a[0] + "|r2|2000-01-01"], ex: G[a[0] + "|ex|2000-01-01"] });
        });
      };
    });
  }
  $("bwk").onclick = function () { var d = $("wkd").value; if (d && EXTRA.indexOf(d) < 0) { EXTRA.push(d); load(); } };
  load();
}

/* ---------- чат ---------- */
var PEOPLE = {}, URLS = {}, REC = null;
var MAXF = 50 * 1024 * 1024;
function kindOf(type) { type = type || ""; return /^image\//.test(type) ? "image" : /^video\//.test(type) ? "video" : /^audio\//.test(type) ? "audio" : "file"; }
function isLabel(b) { var l = [S.ru.lbl, S.tj.lbl]; return l.some(function (x) { return Object.keys(x).some(function (k) { return x[k] === b; }); }); }
function extOf(name, type) {
  var m = /\.([a-z0-9]{1,5})$/i.exec(name || ""); if (m) return m[1].toLowerCase();
  var t2 = (type || "").split(";")[0]; return { "audio/webm": "webm", "audio/mp4": "m4a", "audio/ogg": "ogg", "image/jpeg": "jpg", "image/png": "png", "video/mp4": "mp4", "video/quicktime": "mov", "video/webm": "webm" }[t2] || "bin";
}
// большие фото с телефона уменьшаем до 1600 px, чтобы быстрее отправлялись
function shrink(file) {
  if (!/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) || file.size < 700 * 1024) return Promise.resolve(file);
  return new Promise(function (res) {
    var img = new Image(), u = URL.createObjectURL(file);
    img.onload = function () {
      var k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(u);
      c.toBlob(function (b) { res(b && b.size < file.size ? new File([b], (file.name || "photo").replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" }) : file); }, "image/jpeg", 0.85);
    };
    img.onerror = function () { URL.revokeObjectURL(u); res(file); };
    img.src = u;
  });
}
function signUrls(paths) {
  var now = Date.now(), need = paths.filter(function (p) { return !URLS[p] || URLS[p].exp < now; });
  if (!need.length) return Promise.resolve();
  return sb.storage.from("chat").createSignedUrls(need, 6 * 3600).then(function (r) {
    (r.data || []).forEach(function (x) { if (x.signedUrl && x.path) URLS[x.path] = { url: x.signedUrl, exp: now + 5.5 * 3600 * 1000 }; });
  }, function () {});
}
function stopRec(send) {
  var R = REC; if (!R) return; REC = null; R.send = send;
  clearInterval(R.timer);
  try { if (R.mr.state !== "inactive") R.mr.stop(); else R.done(); } catch (x) { R.done(); }
}
function chatV() {
  var v = $("clv");
  if (REC) stopRec(false);
  Promise.all([sb.from("rooms").select("*").order("is_general", { ascending: false }).order("created_at"), sb.from("profiles").select("*").neq("role", "pending").order("full_name")]).then(function (rs) {
    var rooms = rs[0].data || [], ppl = (rs[1].data || []).filter(live);
    PEOPLE = {}; (rs[1].data || []).forEach(function (p) { PEOPLE[p.id] = p; });
    if (!ROOM || !rooms.some(function (r) { return r.id === ROOM; })) ROOM = rooms.length ? rooms[0].id : null;
    v.innerHTML = '<div class="cl-chat"><div class="cl-rooms">' + rooms.map(function (r) { return '<button class="cl-room' + (r.id === ROOM ? " on" : "") + '" data-r="' + r.id + '">' + (r.is_general ? "🌐 " : "👥 ") + e(r.name) + '</button>'; }).join("") +
      '<button class="cl-b pri" id="bng">+ ' + e(t("newGrp")) + '</button></div><div><div id="rtools" class="cl-act" style="margin:0 0 8px"></div><div class="card cl-msgs"><div class="cl-ml" id="ml"></div>' +
      '<div class="cl-st" id="cst" hidden></div><form class="cl-send" id="fms">' +
      '<button type="button" class="cl-ib" id="batt" title="' + e(t("attach")) + '" aria-label="' + e(t("attach")) + '">📎</button>' +
      '<input type="file" id="ffile" accept="image/*,video/*" hidden>' +
      '<textarea class="cl-in" name="b" maxlength="2000" placeholder="' + e(t("msgPh")) + '"></textarea>' +
      '<button type="button" class="cl-ib" id="bmic" title="' + e(t("voice")) + '" aria-label="' + e(t("voice")) + '">🎤</button>' +
      '<button class="btn2" style="margin:0" id="bsend">' + e(t("send")) + '</button></form></div></div></div>';
    v.querySelector(".cl-rooms").onclick = function (ev) {
      var id = ev.target.dataset && ev.target.dataset.r;
      if (id) { ROOM = +id; chatV(); } else if (ev.target.id === "bng") groupDlg(null, ppl);
    };
    var room = rooms.filter(function (r) { return r.id === ROOM; })[0];
    if (!room) { $("fms").style.display = "none"; return; }
    var own = isAdmin() || room.created_by === ME.id;
    $("rtools").innerHTML = (!room.is_general && own ? '<button class="cl-b" data-t="m">' + e(t("members")) + '</button>' : '') + (own ? '<button class="cl-b" data-t="n">' + e(t("rename")) + '</button>' : '') +
      (!room.is_general && own ? '<button class="cl-b dng" data-t="d">' + e(t("delGrp")) + '</button>' : '') + (!room.is_general && !own ? '<button class="cl-b dng" data-t="l">' + e(t("leave")) + '</button>' : '');
    $("rtools").onclick = function (ev) {
      var a = ev.target.dataset && ev.target.dataset.t; if (!a) return;
      if (a === "m") groupDlg(room, ppl);
      if (a === "n") { var n = prompt(t("grpName"), room.name); if (n && n.trim()) sb.from("rooms").update({ name: n.trim().slice(0, 80) }).eq("id", room.id).then(chatV); }
      if (a === "d" && confirm(t("delQ"))) sb.from("rooms").delete().eq("id", room.id).then(function () { ROOM = null; chatV(); });
      if (a === "l" && confirm(t("leave") + "?")) sb.from("room_members").delete().eq("room_id", room.id).eq("user_id", ME.id).then(function () { ROOM = null; chatV(); });
    };
    var MS = [], RID = ROOM;
    function media(m) {
      if (!m.file_path) return "";
      var u = URLS[m.file_path] && URLS[m.file_path].url, k = kindOf(m.file_type);
      if (!u) return '<span class="sub">' + e(t("lbl")[k]) + '…</span>';
      if (k === "image") return '<img src="' + e(u) + '" alt="" loading="lazy" data-big="1">';
      if (k === "video") return '<video src="' + e(u) + '" controls playsinline preload="metadata"></video>';
      if (k === "audio") return '<audio src="' + e(u) + '" controls preload="metadata"></audio>';
      return '<a href="' + e(u) + '" target="_blank" rel="noopener">' + e(m.file_name || t("lbl").file) + '</a>';
    }
    function one(m) {
      var me = m.user_id === ME.id, p = PEOPLE[m.user_id], can = me || isAdmin();
      var body = m.file_path && isLabel(m.body) ? "" : e(m.body);
      return '<div class="cl-m' + (me ? " me" : "") + '" data-id="' + m.id + '"><div class="who">' + e(p ? (p.full_name || p.login) : "—") + ' · ' + ftime(m.created_at) + (m.edited_at ? ' · ' + e(t("edited")) : '') +
        (can ? (m.file_path ? '' : '<button data-me="' + m.id + '" title="' + e(t("edit")) + '">✎</button>') + '<button data-md="' + m.id + '" title="' + e(t("del")) + '">🗑</button>' : '') + '</div><div class="bb">' + media(m) + body + '</div></div>';
    }
    // перерисовываем только изменившиеся сообщения, чтобы не прерывать играющее видео или голосовое
    function draw() {
      var ml = $("ml"); if (!ml || RID !== ROOM) return;
      var atBottom = ml.scrollHeight - ml.scrollTop - ml.clientHeight < 80;
      if (!MS.length) { ml.innerHTML = '<p class="sub">' + e(t("empty")) + '</p>'; return; }
      var old = {};
      [].forEach.call(ml.children, function (n) { if (n.dataset && n.dataset.id) old[n.dataset.id] = n; else n.remove(); });
      var ref = ml.firstChild;
      MS.forEach(function (m) {
        var sig = [m.body, m.edited_at, m.file_path && URLS[m.file_path] ? 1 : 0].join("|"), n = old[m.id];
        if (!n || n.dataset.sig !== sig) { var d = document.createElement("div"); d.innerHTML = one(m); n = d.firstChild; n.dataset.sig = sig; }
        if (n !== ref) ml.insertBefore(n, ref); else ref = ref.nextSibling;
      });
      while (ref) { var nx = ref.nextSibling; ml.removeChild(ref); ref = nx; }
      if (atBottom) ml.scrollTop = ml.scrollHeight;
    }
    var first = true;
    function load() {
      sb.from("messages").select("*").eq("room_id", RID).order("id", { ascending: false }).limit(150).then(function (r) {
        if (RID !== ROOM) return;
        MS = (r.data || []).reverse();
        var paths = MS.filter(function (m) { return m.file_path; }).map(function (m) { return m.file_path; });
        draw();
        if (first) { first = false; var ml = $("ml"); if (ml) ml.scrollTop = ml.scrollHeight; }
        if (paths.length) signUrls(paths).then(draw);
      });
    }
    var ml0 = $("ml");
    // когда картинка догрузилась — остаёмся внизу ленты
    ml0.addEventListener("load", function (ev) { if (ev.target.tagName === "IMG" && ml0.scrollHeight - ml0.scrollTop - ml0.clientHeight < ev.target.clientHeight + 120) ml0.scrollTop = ml0.scrollHeight; }, true);
    ml0.onclick = function (ev) {
      var d = ev.target.dataset || {};
      if (d.big) { var bx = document.createElement("div"); bx.className = "cl-big"; bx.innerHTML = '<img src="' + e(ev.target.src) + '" alt="">'; bx.onclick = function () { bx.remove(); }; document.body.appendChild(bx); return; }
      if (d.md && confirm(t("delQ"))) {
        var mm = MS.filter(function (x) { return x.id === +d.md; })[0];
        sb.from("messages").delete().eq("id", +d.md).then(function (r) {
          if (!r.error && mm && mm.file_path) sb.storage.from("chat").remove([mm.file_path]);
          load();
        });
      }
      if (d.me) { var m = MS.filter(function (x) { return x.id === +d.me; })[0], n = m && prompt(t("edit"), m.body); if (n && n.trim()) sb.from("messages").update({ body: n.trim().slice(0, 2000) }).eq("id", m.id).then(load); }
    };
    var f = $("fms"), st = $("cst");
    function status(txt, bad) { st.hidden = !txt; st.textContent = txt || ""; st.style.color = bad ? "#be123c" : ""; }
    f.onsubmit = function (ev) {
      ev.preventDefault(); var b = f.b.value.trim(); if (!b) return;
      f.b.value = "";
      sb.from("messages").insert({ room_id: RID, body: b }).then(function (r) { if (r.error) { f.b.value = b; status(errText(r.error), true); } else { status(""); load(); } });
    };
    f.b.onkeydown = function (ev) { if (ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); f.requestSubmit ? f.requestSubmit() : f.onsubmit(ev); } };
    // отправка файла: фото, видео или голосовое
    function sendFile(file, kind) {
      if (!file) return;
      if (file.size > MAXF) return status(t("maxSize"), true);
      var cap = f.b.value.trim();
      status(t("sending"));
      [$("batt"), $("bmic"), $("bsend")].forEach(function (x) { x.disabled = true; });
      var done = function () { [$("batt"), $("bmic"), $("bsend")].forEach(function (x) { if (x) x.disabled = false; }); };
      (kind === "image" ? shrink(file) : Promise.resolve(file)).then(function (fl) {
        var type = (fl.type || "application/octet-stream").split(";")[0], k = kind || kindOf(type);
        var path = RID + "/" + ME.id + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + extOf(fl.name, type);
        return sb.storage.from("chat").upload(path, fl, { contentType: type, upsert: false }).then(function (r) {
          if (r.error) throw r.error;
          return sb.from("messages").insert({ room_id: RID, body: cap || t("lbl")[k], file_path: path, file_type: type, file_name: (fl.name || "").slice(0, 200) || null });
        }).then(function (r) {
          if (r.error) { sb.storage.from("chat").remove([path]); throw r.error; }
          if (cap && f.b.value.trim() === cap) f.b.value = "";
          status(""); done(); load();
        });
      }).catch(function (err) { done(); status(errText(err), true); });
    }
    $("batt").onclick = function () { $("ffile").click(); };
    $("ffile").onchange = function () { var fl = this.files && this.files[0]; this.value = ""; if (fl) sendFile(fl, kindOf(fl.type)); };
    $("bmic").onclick = function () {
      if (REC) return stopRec(true);
      if (!window.MediaRecorder || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return status(t("noRec"), true);
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        var types = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"], mt = "";
        for (var i = 0; i < types.length; i++) if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(types[i])) { mt = types[i]; break; }
        var mr = mt ? new MediaRecorder(stream, { mimeType: mt }) : new MediaRecorder(stream), chunks = [], t0 = Date.now(), btn = $("bmic");
        var R = { mr: mr, send: false };
        R.done = function () {
          stream.getTracks().forEach(function (tr) { tr.stop(); });
          var b2 = $("bmic"); if (b2) { b2.classList.remove("on"); b2.textContent = "🎤"; }
          var c2 = $("bcan"); if (c2) c2.remove();
          if (!R.send || !chunks.length || RID !== ROOM || !$("fms")) { status(""); return; }
          var type = (mr.mimeType || mt || "audio/webm").split(";")[0];
          sendFile(new File([new Blob(chunks, { type: type })], "voice." + extOf("", type), { type: type }), "audio");
        };
        mr.ondataavailable = function (ev2) { if (ev2.data && ev2.data.size) chunks.push(ev2.data); };
        mr.onstop = function () { R.done(); };
        mr.start(1000); REC = R;
        btn.classList.add("on"); btn.textContent = "⏹";
        btn.insertAdjacentHTML("beforebegin", '<button type="button" class="cl-ib" id="bcan" title="' + e(t("cancel")) + '">✕</button>');
        $("bcan").onclick = function () { stopRec(false); };
        var tick = function () { var sec = Math.floor((Date.now() - t0) / 1000); status("🔴 " + t("rec") + " " + Math.floor(sec / 60) + ":" + ("0" + sec % 60).slice(-2) + " — ⏹ " + t("send")); if (sec >= 300) stopRec(true); };
        tick(); R.timer = setInterval(tick, 500);
      }, function () { status(t("noMic"), true); });
    };
    if (CH) sb.removeChannel(CH);
    CH = sb.channel("room-" + RID).on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: "room_id=eq." + RID }, load).subscribe();
    load();
  });
}
function groupDlg(room, ppl) {
  var box = document.createElement("div"); box.className = "mdl";
  var memQ = room ? sb.from("room_members").select("user_id").eq("room_id", room.id) : Promise.resolve({ data: [] });
  memQ.then(function (r) {
    var cur = {}; (r.data || []).forEach(function (m) { cur[m.user_id] = 1; });
    box.innerHTML = '<form class="card cl-f"><h3>' + e(room ? t("members") + " · " + room.name : t("newGrp")) + '</h3>' + (room ? '' : '<input name="n" maxlength="80" placeholder="' + e(t("grpName")) + '" required>') +
      '<input class="cl-in" id="gps" placeholder="' + e(t("search")) + '"><div class="cl-pick" id="gpl">' + ppl.filter(function (p) { return p.id !== ME.id; }).map(function (p) {
        return '<label data-s="' + e(((p.full_name || "") + " " + p.login + " " + (p.grp || "")).toLowerCase()) + '"><input type="checkbox" value="' + p.id + '"' + (cur[p.id] ? " checked" : "") + '>' + e(p.full_name || p.login) + ' <small class="sub">' + e(t("role")[p.role]) + (p.grp ? ' · ' + e(p.grp) : '') + '</small></label>';
      }).join("") + '</div><div class="cl-act"><button class="btn2" style="margin:0">' + e(room ? t("save") : t("create")) + '</button><button type="button" class="cl-b" data-x="1">✕</button></div><p class="cl-msg" id="mgp"></p></form>';
    document.body.appendChild(box);
    $("gps").oninput = function () { var q = this.value.trim().toLowerCase(); [].forEach.call($("gpl").children, function (l) { l.style.display = !q || l.dataset.s.indexOf(q) > -1 ? "" : "none"; }); };
    box.onclick = function (ev) { if (ev.target === box || (ev.target.dataset && ev.target.dataset.x)) box.remove(); };
    box.querySelector("form").onsubmit = function (ev) {
      ev.preventDefault();
      var sel = [].map.call(box.querySelectorAll("#gpl input:checked"), function (i) { return i.value; });
      var p = room ? Promise.resolve({ data: room }) : sb.from("rooms").insert({ name: ev.target.n.value.trim() }).select().single();
      p.then(function (r) {
        if (r.error) throw r.error;
        var rid = r.data.id, add = sel.filter(function (id) { return !cur[id]; }), rem = Object.keys(cur).filter(function (id) { return sel.indexOf(id) < 0; });
        var jobs = [];
        if (add.length) jobs.push(sb.from("room_members").insert(add.map(function (id) { return { room_id: rid, user_id: id }; })));
        if (rem.length) jobs.push(sb.from("room_members").delete().eq("room_id", rid).in("user_id", rem));
        return Promise.all(jobs).then(function () { ROOM = rid; box.remove(); chatV(); });
      }).catch(function (err) { fail($("mgp"), err); });
    };
  });
}

/* ---------- админ ---------- */
var AQ = "", TMP = null;
function rpc(name, args) { return sb.rpc(name, args).then(function (r) { if (r.error) throw r.error; return r; }); }
// отдельный клиент, чтобы создание аккаунта не выкинуло администратора из его входа
function tmpClient() { if (!TMP) TMP = window.supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: "mf-admin-new" } }); return TMP; }
function genPw() { var c = "abcdefghjkmnpqrstuvwxyz23456789", a = new Uint32Array(10), r = ""; crypto.getRandomValues(a); for (var i = 0; i < 10; i++) r += c[a[i] % c.length]; return r; }
function userDlg(kind) {
  var staff = kind === "staff", box = document.createElement("div"); box.className = "mdl";
  box.innerHTML = '<form class="card cl-f" style="max-width:440px;width:100%"><h3>' + e(staff ? t("newStaffT") : t("newStudT")) + '</h3>' +
    '<input name="f" placeholder="' + e(t("fio")) + '" maxlength="120" required>' +
    '<input name="l" placeholder="' + e(t("lg")) + '" autocapitalize="none" spellcheck="false" required><p class="cl-note">' + e(t("lgHint")) + '</p>' +
    '<div class="row" style="gap:8px;flex-wrap:nowrap"><input class="cl-in" name="p" placeholder="' + e(t("pw")) + '" autocomplete="off" required style="flex:1"><button type="button" class="cl-b" data-g="1">' + e(t("genPw")) + '</button></div>' +
    (staff ? '<label>' + e(t("roleL")) + '<select name="r"><option value="teacher">' + e(t("role").teacher) + '</option><option value="admin">' + e(t("role").admin) + '</option></select></label>' +
      '<label>' + e(t("dept")) + '<select name="d"><option value="">—</option>' + deptOpts("") + '</select></label>'
      : '<label>' + e(t("grp")) + '<input name="g" maxlength="40"></label><label>' + e(t("dept")) + '<select name="d"><option value="">—</option>' + deptOpts("") + '</select></label>') +
    '<div class="cl-act"><button class="btn2" style="margin:0">' + e(t("create")) + '</button><button type="button" class="cl-b" data-x="1">' + e(t("close")) + '</button></div><p class="cl-msg" id="mnu"></p></form>';
  document.body.appendChild(box);
  var f = box.querySelector("form"); f.p.value = genPw(); f.f.focus();
  box.onclick = function (ev) {
    var d = ev.target.dataset || {};
    if (ev.target === box || d.x) { box.remove(); if (box.dataset.ok) adminV(); }
    if (d.g) f.p.value = genPw();
    if (d.cp) { var tx = box.querySelector("pre").textContent; (navigator.clipboard ? navigator.clipboard.writeText(tx) : Promise.reject()).then(function () { ev.target.textContent = t("copied"); }, function () {}); }
  };
  f.onsubmit = function (ev) {
    ev.preventDefault();
    var fio = f.f.value.trim(), l = f.l.value.trim().toLowerCase(), pw = f.p.value.trim(), mm = $("mnu"), btn = f.querySelector(".btn2");
    var rl = staff ? f.r.value : "student", dp = f.d.value ? +f.d.value : null, gp = staff ? "" : f.g.value.trim();
    if (!fio) return;
    if (!/^[a-z0-9._-]{3,30}$/.test(l)) return msg(mm, t("lgHint"), true);
    if (pw.length < 8) return msg(mm, t("pwShort"), true);
    msg(mm, t("loading")); btn.disabled = true;
    tmpClient().auth.signUp({ email: l + "@" + DOMAIN, password: pw, options: { data: { full_name: fio } } }).then(function (r) {
      if (r.error) throw (/registered|exists|already/i.test(r.error.message) ? new Error(t("taken")) : r.error);
      var u = r.data && r.data.user;
      if (!u || (u.identities && !u.identities.length)) throw new Error(t("taken"));
      try { TMP.auth.signOut({ scope: "local" }).catch(function () {}); } catch (x) {}
      return rpc("mf_admin_setup_user", { p_id: u.id, p_login: l, p_full_name: fio, p_role: rl, p_dept: dp, p_grp: gp });
    }).then(function () {
      box.dataset.ok = "1";
      f.innerHTML = '<h3>✓ ' + e(fio) + '</h3><p>' + e(t("created")) + '</p><pre style="background:var(--line);padding:10px 12px;border-radius:10px;font-size:16px;white-space:pre-wrap">' +
        e(t("lg") + ": " + l + "\n" + t("pw") + ": " + pw + "\n" + location.origin + location.pathname) + '</pre>' +
        '<div class="cl-act"><button type="button" class="cl-b pri" data-cp="1">' + e(t("copy")) + '</button><button type="button" class="cl-b" data-x="1">' + e(t("close")) + '</button></div>';
    }).catch(function (err) { btn.disabled = false; msg(mm, errText(err), true); });
  };
}
function adminV() {
  var v = $("clv");
  Promise.all([sb.from("profiles").select("*").order("full_name"), sb.from("subjects").select("*").order("name"), loadSettings()]).then(function (rs) {
    if (rs[0].error) { v.innerHTML = '<div class="card"><p class="bad">' + e(rs[0].error.message) + '</p></div>'; return; }
    var all = rs[0].data || [], ss = rs[1].data || [];
    var staff = all.filter(function (u) { return !u.blocked && (u.role === "teacher" || u.role === "admin"); });
    var studs = all.filter(function (u) { return !u.blocked && u.role === "student"; });
    var pend = all.filter(function (u) { return !u.blocked && u.role === "pending"; });
    var gone = all.filter(function (u) { return u.blocked; });
    function tOpts(sel) { return '<option value="">—</option>' + staff.map(function (u) { return '<option value="' + u.id + '"' + (u.id === sel ? " selected" : "") + '>' + e(u.full_name || u.login) + '</option>'; }).join(""); }
    function roleSel(u, list) { return '<select data-f="role"' + (u.id === ME.id ? " disabled" : "") + '>' + list.map(function (r) { return '<option value="' + r + '"' + (u.role === r ? " selected" : "") + '>' + e(t("role")[r]) + '</option>'; }).join("") + '</select>'; }
    function acts(u) {
      return '<td style="white-space:nowrap"><button class="cl-b pri" data-sv="1">' + e(t("save")) + '</button> <button class="cl-b" data-pw="1" title="' + e(t("pwBtn")) + '">🔑</button>' +
        (u.id === ME.id ? '' : ' <button class="cl-b dng" data-del="1" title="' + e(t("delUser")) + '">🗑 ' + e(t("delUser")) + '</button>') + '</td>';
    }
    function srch(u) { return e(((u.full_name || "") + " " + (u.login || "") + " " + (u.grp || "")).toLowerCase()); }
    function nm(u) { return '<td class="nm l"><input data-f="full_name" value="' + e(u.full_name || "") + '" maxlength="120" style="width:220px"></td><td>' + e(u.login) + '</td>'; }
    function dept(u) { return '<td><select data-f="dept"><option value="">—</option>' + deptOpts(u.dept || "") + '</select></td>'; }
    function grp(u) { return '<td><input data-f="grp" value="' + e(u.grp || "") + '" maxlength="40" style="width:110px"></td>'; }
    function tbl(id, head, rows) { return '<div class="jt"><table id="' + id + '" class="cl-ut"><tr>' + head.map(function (h, i) { return '<th' + (i ? '' : ' class="nm"') + '>' + e(h) + '</th>'; }).join("") + '<th></th></tr>' + rows + '</table></div>'; }
    var h = (SET.ok ? '' : '<div class="card cl-warn"><p>' + e(t("needSql")) + '</p></div>') +
      '<div class="cl-bar"><button class="cl-b pri" data-nu="staff">➕ ' + e(t("addStaff")) + '</button><button class="cl-b pri" data-nu="student">➕ ' + e(t("addStud")) + '</button></div>' +
      '<input class="cl-in" id="uq" placeholder="🔍 ' + e(t("findU")) + '" value="' + e(AQ) + '" style="max-width:420px">' +
      '<h2>' + e(t("staff")) + ' · ' + staff.length + '</h2>' +
      (staff.length ? tbl("tst", [t("fio"), t("lg"), t("roleL"), t("dept")], staff.map(function (u) { return '<tr data-u="' + u.id + '" data-q="' + srch(u) + '">' + nm(u) + '<td>' + roleSel(u, ["teacher", "admin"]) + '</td>' + dept(u) + acts(u) + '</tr>'; }).join("")) : '<p class="sub">' + e(t("empty")) + '</p>') +
      '<h2>' + e(t("students")) + ' · ' + studs.length + '</h2>' +
      (studs.length ? tbl("tsd", [t("fio"), t("lg"), t("grp"), t("dept")], studs.map(function (u) { return '<tr data-u="' + u.id + '" data-q="' + srch(u) + '">' + nm(u) + grp(u) + dept(u) + acts(u) + '</tr>'; }).join("")) : '<p class="sub">' + e(t("empty")) + '</p>') +
      (pend.length ? '<h2>' + e(t("pendingL")) + ' · ' + pend.length + '</h2>' + tbl("tpn", [t("fio"), t("lg"), t("roleL"), t("grp"), t("dept")], pend.map(function (u) { return '<tr data-u="' + u.id + '" data-q="' + srch(u) + '" class="warn">' + nm(u) + '<td>' + roleSel(u, ["pending", "student", "teacher", "admin"]) + '</td>' + grp(u) + dept(u) + acts(u) + '</tr>'; }).join("")) : '') +
      (gone.length ? '<details class="card" style="margin-top:18px"><summary style="cursor:pointer;font-weight:700">' + e(t("removed")) + ' · ' + gone.length + '</summary><div class="jt" style="margin-top:8px"><table>' +
        gone.map(function (u) { return '<tr data-u="' + u.id + '" data-q="' + srch(u) + '"><td class="nm l">' + e(u.full_name || "") + '</td><td>' + e(u.login) + '</td><td>' + e(t("role")[u.role] || u.role) + (u.grp ? ' · ' + e(u.grp) : '') + '</td><td><button class="cl-b pri" data-res="1">' + e(t("restore")) + '</button></td></tr>'; }).join("") + '</table></div></details>' : '');
    // разрешения
    var ps = permsFor("student"), pt = permsFor("teacher"), L = t("sec");
    h += '<h2>' + e(t("perms")) + '</h2><p class="sub">' + e(t("permsSub")) + '</p><div class="jt"><table class="cl-perm" id="tperm"><tr><th class="nm">' + e(t("section")) + '</th><th>' + e(t("permStud")) + '</th><th>' + e(t("permTch")) + '</th></tr>' +
      SECS.map(function (k) {
        return '<tr><td class="nm l">' + e(L[k] || k) + '</td><td>' + (k === "subj" ? '—' : '<input type="checkbox" data-pr="student|' + k + '"' + (ps.indexOf(k) > -1 ? " checked" : "") + '>') + '</td><td><input type="checkbox" data-pr="teacher|' + k + '"' + (pt.indexOf(k) > -1 ? " checked" : "") + '></td></tr>';
      }).join("") + '</table></div><div class="cl-act"><button class="cl-b pri" id="bperm">' + e(t("save")) + '</button></div><p class="cl-msg" id="mperm"></p>';
    // семестр
    var si = semInfo();
    h += '<h2>' + e(t("sem")) + '</h2><div class="card cl-f"><label>' + e(t("semStart")) + ' <input type="date" class="cl-in" id="semd" value="' + e(SET.sem || "") + '" style="width:auto"></label>' +
      '<p class="cl-note" id="semh">' + e(si ? t("semHint").replace("%1", fdate(si.r1)).replace("%2", fdate(si.r2)) : t("semNone")) + '</p><div class="cl-act"><button class="cl-b pri" id="bsem">' + e(t("save")) + '</button></div><p class="cl-msg" id="msem"></p></div>';
    // предметы
    h += '<h2>' + e(t("subjects")) + '</h2><form class="card cl-f" id="fsb" style="margin-bottom:14px"><div class="row" style="gap:8px"><input class="cl-in" name="n" placeholder="' + e(t("title")) + '" maxlength="200" required style="flex:2 1 200px"><select class="cl-in" name="d" style="flex:1 1 160px">' + deptOpts(1) + '</select><select class="cl-in" name="tc" style="flex:1 1 160px">' + tOpts() + '</select><button class="cl-b pri">' + e(t("addSubj")) + '</button></div><p class="cl-msg" id="msb"></p></form>' +
      '<div class="jt"><table id="stbl"><tr><th class="nm">' + e(t("subject")) + '</th><th>' + e(t("dept")) + '</th><th>' + e(t("teacher")) + '</th><th></th></tr>' +
      ss.map(function (s) { return '<tr data-s="' + s.id + '"><td class="nm l"><input data-f="name" value="' + e(s.name) + '" style="width:220px"></td><td><select data-f="dept">' + deptOpts(s.dept) + '</select></td><td><select data-f="teacher_id">' + tOpts(s.teacher_id) + '</select></td><td><button class="cl-b pri" data-ss="1">' + e(t("save")) + '</button> <button class="cl-b dng" data-sd="1">✕</button></td></tr>'; }).join("") + '</table></div>';
    v.innerHTML = h;

    function vals(tr) {
      var o = {};
      [].forEach.call(tr.querySelectorAll("[data-f]"), function (el) {
        if (el.disabled) return;
        var x = el.value.trim(), k = el.dataset.f;
        if (k === "full_name" && !x) return;
        o[k] = x === "" ? null : (k === "dept" ? +x : x);
      });
      return o;
    }
    function flash(btn, r) { var l0 = btn.dataset.l0 || btn.textContent; btn.dataset.l0 = l0; btn.textContent = r && r.error ? "⚠ " + errText(r.error) : "✓"; setTimeout(function () { btn.textContent = l0; }, r && r.error ? 4000 : 1500); }
    function filt() { var q = AQ.trim().toLowerCase(); [].forEach.call(v.querySelectorAll("tr[data-u]"), function (tr) { tr.style.display = !q || tr.dataset.q.indexOf(q) > -1 ? "" : "none"; }); }
    $("uq").oninput = function () { AQ = this.value; filt(); }; filt();
    v.onclick = function (ev) {
      var el = ev.target.closest ? ev.target.closest("button") : null; if (!el) return;
      var d = el.dataset, tr = el.closest("tr"), id = tr && tr.dataset.u, u = id && all.filter(function (x) { return x.id === id; })[0];
      if (d.nu) return userDlg(d.nu);
      if (!u) return;
      var name = u.full_name || u.login;
      if (d.sv) {
        var o = vals(tr), wasRole = u.role;
        sb.from("profiles").update(o).eq("id", id).then(function (r) {
          flash(el, r);
          if (!r.error) { Object.assign(u, o); if (id === ME.id) loadMe(); if (o.role && o.role !== wasRole) setTimeout(adminV, 600); }
        });
      }
      if (d.pw) {
        var np = prompt(t("pwSetQ").replace("%", name), genPw());
        if (np == null) return;
        if (np.trim().length < 8) return alert(t("pwShort"));
        rpc("mf_admin_set_password", { p_id: id, p_password: np.trim() }).then(function () { alert(t("pwOk") + "\n" + t("lg") + ": " + u.login + "\n" + t("pw") + ": " + np.trim()); }, function (err) { alert(errText(err)); });
      }
      if (d.del && confirm(t("delUserQ").replace("%", name))) rpc("mf_admin_set_blocked", { p_id: id, p_blocked: true }).then(adminV, function (err) { alert(errText(err)); });
      if (d.res) rpc("mf_admin_set_blocked", { p_id: id, p_blocked: false }).then(adminV, function (err) { alert(errText(err)); });
    };
    $("bperm").onclick = function () {
      var val = { student: [], teacher: [] };
      [].forEach.call(v.querySelectorAll("[data-pr]"), function (c) { if (c.checked) { var a = c.dataset.pr.split("|"); val[a[0]].push(a[1]); } });
      sb.from("mf_settings").upsert({ key: "perms", value: val, updated_at: new Date().toISOString() }).then(function (r) {
        if (r.error) return msg($("mperm"), errText(r.error), true);
        SET.perms = val; LAST = who(); msg($("mperm"), t("saved"));
      });
    };
    $("bsem").onclick = function () {
      var d = $("semd").value, q = d ? sb.from("mf_settings").upsert({ key: "semester", value: { start: d }, updated_at: new Date().toISOString() }) : sb.from("mf_settings").delete().eq("key", "semester");
      q.then(function (r) {
        if (r.error) return msg($("msem"), errText(r.error), true);
        SET.sem = d || null; var s2 = semInfo();
        $("semh").textContent = s2 ? t("semHint").replace("%1", fdate(s2.r1)).replace("%2", fdate(s2.r2)) : t("semNone");
        msg($("msem"), t("saved"));
      });
    };
    $("stbl").onclick = function (ev) {
      var d = ev.target.dataset || {}, tr = ev.target.closest("tr"); if (!tr) return;
      if (d.ss) sb.from("subjects").update(vals(tr)).eq("id", tr.dataset.s).then(function (r) { flash(ev.target, r); });
      if (d.sd && confirm(t("delQ"))) sb.from("subjects").delete().eq("id", tr.dataset.s).then(adminV);
    };
    $("fsb").onsubmit = function (ev) {
      ev.preventDefault(); var f = ev.target;
      sb.from("subjects").insert({ name: f.n.value.trim(), dept: +f.d.value, teacher_id: f.tc.value || null }).then(function (r) { r.error ? fail($("msb"), r.error) : adminV(); });
    };
  });
}

/* ---------- запуск ---------- */
var LAST = null;
function who() { return ME ? ME.id + ME.role + JSON.stringify(SET.perms || "") : ""; }
function unlock() { document.documentElement.classList.remove("mf-lock"); }
window.MFC = { nav: nav, view: view, bind: bind };
// Охрана страниц: без входа — только форма входа, после входа — только разрешённые разделы.
var baseRender = window.render;
if (typeof baseRender === "function") window.render = function () {
  if (!READY) {
    unlock(); baseRender();
    // библиотека Supabase не загрузилась (нет интернета) — сайт не показываем без входа
    if (CFG.url && $("app")) $("app").innerHTML = '<main class="v"><div class="card"><p>' + e(t("offline")) + '</p></div></main>';
    return;
  }
  if (!AUTH) return; // ждём, пока проверится вход
  var r = (location.hash || "#home").slice(1);
  if (!allowed(r)) {
    var to = landing();
    if (to !== r) { location.replace("#" + to); return; }
  }
  unlock();
  baseRender();
};
if (READY) {
  sb = window.supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: true, autoRefreshToken: true } });
  var refresh = function () {
    return loadMe().then(function () {
      var first = !AUTH; AUTH = true;
      if (first || who() !== LAST) { LAST = who(); X.render(); }
    });
  };
  // перерисовываем страницу только если действительно сменился пользователь, его роль или разрешения
  sb.auth.onAuthStateChange(function (ev) { if (ev === "SIGNED_OUT" || ev === "SIGNED_IN") setTimeout(refresh, 0); });
  // когда человек возвращается на вкладку — проверяем, не удалён ли он и не поменялись ли разрешения
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible" && AUTH) refresh(); });
  refresh();
} else X.render();
})();
