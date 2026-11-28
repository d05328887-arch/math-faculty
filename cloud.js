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
  grHint: "Недельные баллы 0–10, рубежи и экзамен 0–100. Итог = среднее рубежей × 60% + экзамен × 40%. Баллы сохраняются сразу.",
  myGr: "Мои предметы и баллы", wkS: "Недельные",
  chatT: "Чат", gen: "Общий", newGrp: "Новая группа", grpName: "Название группы", members: "Участники", create: "Создать",
  rename: "Переименовать", delGrp: "Удалить группу", msgPh: "Сообщение…", send: "Отправить", edit: "Изменить", edited: "изм.",
  leave: "Выйти из группы", search: "Поиск",
  admT: "Администрирование", users: "Пользователи", subjects: "Предметы", teacher: "Преподаватель", addSubj: "Добавить предмет",
  newU: "Новые", roleL: "Роль"
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
  grHint: "Баҳои ҳафтаина 0–10, рубежҳо ва имтиҳон 0–100. Ҷамъ = миёнаи рубежҳо × 60% + имтиҳон × 40%. Баҳоҳо фавран захира мешаванд.",
  myGr: "Фанҳо ва баҳоҳои ман", wkS: "Ҳафтаина",
  chatT: "Чат", gen: "Умумӣ", newGrp: "Гурӯҳи нав", grpName: "Номи гурӯҳ", members: "Аъзоён", create: "Сохтан",
  rename: "Иваз кардани ном", delGrp: "Нест кардани гурӯҳ", msgPh: "Паём…", send: "Фиристодан", edit: "Таҳрир", edited: "таҳр.",
  leave: "Баромадан аз гурӯҳ", search: "Ҷустуҷӯ",
  admT: "Идоракунӣ", users: "Корбарон", subjects: "Фанҳо", teacher: "Омӯзгор", addSubj: "Илова кардани фан",
  newU: "Навҳо", roleL: "Нақш"
}};
function t(k) { var d = S[X.lang()] || S.ru; return d[k] !== undefined ? d[k] : S.ru[k]; }
function e(s) { return s == null ? "" : X.ea(s); }
function $(id) { return document.getElementById(id); }
function deptName(n) { return n ? X.dept(n - 1) : t("faculty"); }
function fdate(d) { return String(d || "").slice(0, 10).split("-").reverse().join("."); }
function ftime(ts) { var d = new Date(ts); return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }) + " " + d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }); }
function today() { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
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
".cl-ann-strip{margin-top:18px}";
document.head.appendChild(css);

/* ---------- состояние ---------- */
var sb = null, USER = null, ME = null, CH = null, ROOM = null, SUBJ = null;
var READY = !!(CFG.url && CFG.key && window.supabase);
var ROUTES = { ann: 1, mat: 1, chat: 1, subj: 1, admin: 1, login: 1 };

function role() { return ME ? ME.role : null; }
function isMember() { return ME && ME.role !== "pending"; }
function isAdmin() { return ME && ME.role === "admin"; }
function isTeacher() { return ME && ME.role === "teacher"; }

function loadMe() {
  if (!sb) return Promise.resolve();
  return sb.auth.getSession().then(function (r) {
    var s = r.data && r.data.session; USER = s ? s.user : null;
    if (!USER) { ME = null; return; }
    return sb.from("profiles").select("*").eq("id", USER.id).maybeSingle().then(function (p) { ME = p.data || null; });
  });
}

/* ---------- меню ---------- */
function nav(r) {
  var n = $("nav"), th = $("thb");
  if (!n) return;
  function a(h, l) { return '<a href="#' + h + '" class="' + (r === h ? "on" : "") + '">' + e(l) + '</a>'; }
  var h = a("ann", t("ann")) + a("mat", t("mat")) + a("chat", t("chat"));
  if (isTeacher() || isAdmin()) h += a("subj", t("subj"));
  if (isAdmin()) h += a("admin", t("admin"));
  h += a("login", ME ? "👤 " + t("cab") : t("login"));
  if (th) th.insertAdjacentHTML("beforebegin", h); else n.insertAdjacentHTML("beforeend", h);
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
    v.innerHTML = '<div class="cl-two">' +
      '<form class="card cl-f" id="fin"><h3>' + e(t("inT")) + '</h3><input name="l" placeholder="' + e(t("lg")) + '" autocomplete="username" required><input name="p" type="password" placeholder="' + e(t("pw")) + '" autocomplete="current-password" required><button class="btn2">' + e(t("inBtn")) + '</button><p class="cl-msg" id="min"></p></form>' +
      '<form class="card cl-f" id="fup"><h3>' + e(t("upT")) + '</h3><input name="f" placeholder="' + e(t("fio")) + '" required maxlength="120"><input name="l" placeholder="' + e(t("lg")) + '" autocomplete="username" required><p class="sub" style="margin:0;font-size:13px">' + e(t("lgHint")) + '</p><input name="p" type="password" placeholder="' + e(t("pw")) + '" autocomplete="new-password" required><input name="p2" type="password" placeholder="' + e(t("pw2")) + '" autocomplete="new-password" required><button class="btn2">' + e(t("upBtn")) + '</button><p class="cl-msg" id="mup"></p></form></div>';
    $("fin").onsubmit = function (ev) {
      ev.preventDefault(); var f = ev.target, l = f.l.value.trim().toLowerCase();
      msg($("min"), t("loading"));
      sb.auth.signInWithPassword({ email: l + "@" + DOMAIN, password: f.p.value }).then(function (r) {
        if (r.error) return msg($("min"), t("badLogin"), true);
        loadMe().then(X.render);
      });
    };
    $("fup").onsubmit = function (ev) {
      ev.preventDefault(); var f = ev.target, l = f.l.value.trim().toLowerCase(), mm = $("mup");
      if (!/^[a-z0-9._-]{3,30}$/.test(l)) return msg(mm, t("lgHint"), true);
      if (f.p.value.length < 8) return msg(mm, t("pwShort"), true);
      if (f.p.value !== f.p2.value) return msg(mm, t("pwDiff"), true);
      msg(mm, t("loading"));
      sb.auth.signUp({ email: l + "@" + DOMAIN, password: f.p.value, options: { data: { full_name: f.f.value.trim() } } }).then(function (r) {
        if (r.error) return fail(mm, r.error);
        msg(mm, t("upOk")); setTimeout(function () { loadMe().then(X.render); }, 1200);
      });
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
    var en = rs[0].data || [], gr = rs[1].data || [];
    if (!en.length) return;
    var h = '<h2>' + e(t("myGr")) + '</h2><div class="grid">';
    en.forEach(function (x) {
      var g = gr.filter(function (q) { return q.subject_id === x.subject_id; }), o = {}, w = [];
      g.forEach(function (q) { if (q.kind === "w") w.push(q); else o[q.kind] = +q.value; });
      w.sort(function (a, b) { return a.day < b.day ? -1 : 1; });
      h += '<div class="card"><h3>' + e(x.subjects ? x.subjects.name : "") + '</h3>' +
        (w.length ? '<p>' + e(t("wkS")) + ': ' + w.map(function (q) { return fdate(q.day).slice(0, 5) + " — <b>" + (+q.value) + "</b>"; }).join(", ") + '</p>' : '') +
        '<p>' + e(t("r1")) + ': <b>' + (o.r1 != null ? o.r1 : "—") + '</b> · ' + e(t("r2")) + ': <b>' + (o.r2 != null ? o.r2 : "—") + '</b> · ' + e(t("ex")) + ': <b>' + (o.ex != null ? o.ex : "—") + '</b></p>' +
        '<p style="margin-top:6px;color:var(--text)">' + e(t("tot")) + ': <b>' + total(o) + '</b></p></div>';
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
    '<h2>' + e(t("grades")) + '</h2><p class="sub">' + e(t("grHint")) + '</p><div class="row" style="gap:8px;margin-bottom:10px"><input type="date" class="cl-in" id="wkd" value="' + today() + '" style="width:auto"><button class="cl-b pri" id="bwk">' + e(t("wk")) + '</button></div><div class="jt cl-tbl" id="gtbl"></div>';
  $("fsy").onsubmit = function (ev) {
    ev.preventDefault();
    sb.from("subjects").update({ syllabus: ev.target.y.value }).eq("id", s.id).then(function (r) { r.error ? fail($("msy"), r.error) : (s.syllabus = ev.target.y.value, msg($("msy"), t("saved"))); });
  };
  var EXTRA = [];
  function load() {
    Promise.all([
      sb.from("enrollments").select("student_id, profiles(id, full_name, login, grp)").eq("subject_id", s.id),
      sb.from("grades").select("*").eq("subject_id", s.id),
      sb.from("profiles").select("id, full_name, login, grp").eq("role", "student").order("full_name")
    ]).then(function (rs) {
      var en = (rs[0].data || []).map(function (x) { return x.profiles; }).filter(Boolean).sort(function (a, b) { return (a.full_name || "").localeCompare(b.full_name || ""); });
      var gr = rs[1].data || [], studs = rs[2].data || [], inIds = {};
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
      var dl = Object.keys(days).sort();
      function cell(sid, kind, day, max) { var k = sid + "|" + kind + "|" + day, v = G[k]; return '<td><input type="number" min="0" max="' + max + '" step="0.5" data-g="' + k + '" value="' + (v != null ? v : "") + '"></td>'; }
      $("gtbl").innerHTML = en.length ? '<table><tr><th class="nm">' + e(t("st")) + '</th>' + dl.map(function (d) { return '<th>' + fdate(d).slice(0, 5) + '</th>'; }).join("") + '<th>' + e(t("r1")) + '</th><th>' + e(t("r2")) + '</th><th>' + e(t("ex")) + '</th><th>' + e(t("tot")) + '</th></tr>' +
        en.map(function (p) {
          var o = { r1: G[p.id + "|r1|2000-01-01"], r2: G[p.id + "|r2|2000-01-01"], ex: G[p.id + "|ex|2000-01-01"] };
          return '<tr><td class="nm">' + e(p.full_name || p.login) + '</td>' + dl.map(function (d) { return cell(p.id, "w", d, 10); }).join("") + cell(p.id, "r1", "2000-01-01", 100) + cell(p.id, "r2", "2000-01-01", 100) + cell(p.id, "ex", "2000-01-01", 100) + '<td class="res" data-tot="' + p.id + '">' + total(o) + '</td></tr>';
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
var PEOPLE = {};
function chatV() {
  var v = $("clv");
  Promise.all([sb.from("rooms").select("*").order("is_general", { ascending: false }).order("created_at"), sb.from("profiles").select("id, full_name, login, role, grp").neq("role", "pending").order("full_name")]).then(function (rs) {
    var rooms = rs[0].data || [], ppl = rs[1].data || [];
    PEOPLE = {}; ppl.forEach(function (p) { PEOPLE[p.id] = p; });
    if (!ROOM || !rooms.some(function (r) { return r.id === ROOM; })) ROOM = rooms.length ? rooms[0].id : null;
    v.innerHTML = '<div class="cl-chat"><div class="cl-rooms">' + rooms.map(function (r) { return '<button class="cl-room' + (r.id === ROOM ? " on" : "") + '" data-r="' + r.id + '">' + (r.is_general ? "🌐 " : "👥 ") + e(r.name) + '</button>'; }).join("") +
      '<button class="cl-b pri" id="bng">+ ' + e(t("newGrp")) + '</button></div><div><div id="rtools" class="cl-act" style="margin:0 0 8px"></div><div class="card cl-msgs"><div class="cl-ml" id="ml"></div><form class="cl-send" id="fms"><textarea class="cl-in" name="b" maxlength="2000" placeholder="' + e(t("msgPh")) + '"></textarea><button class="btn2" style="margin:0">' + e(t("send")) + '</button></form></div></div></div>';
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
    var MS = [];
    function draw() {
      var ml = $("ml"); if (!ml) return;
      var atBottom = ml.scrollHeight - ml.scrollTop - ml.clientHeight < 60;
      ml.innerHTML = MS.length ? MS.map(function (m) {
        var me = m.user_id === ME.id, p = PEOPLE[m.user_id], can = me || isAdmin();
        return '<div class="cl-m' + (me ? " me" : "") + '"><div class="who">' + e(p ? (p.full_name || p.login) : "—") + ' · ' + ftime(m.created_at) + (m.edited_at ? ' · ' + e(t("edited")) : '') +
          (can ? '<button data-me="' + m.id + '" title="' + e(t("edit")) + '">✎</button><button data-md="' + m.id + '" title="' + e(t("del")) + '">🗑</button>' : '') + '</div><div class="bb">' + e(m.body) + '</div></div>';
      }).join("") : '<p class="sub">' + e(t("empty")) + '</p>';
      if (atBottom) ml.scrollTop = ml.scrollHeight;
    }
    function load() {
      sb.from("messages").select("*").eq("room_id", ROOM).order("id", { ascending: false }).limit(150).then(function (r) { MS = (r.data || []).reverse(); draw(); var ml = $("ml"); if (ml) ml.scrollTop = ml.scrollHeight; });
    }
    $("ml").onclick = function (ev) {
      var d = ev.target.dataset || {};
      if (d.md && confirm(t("delQ"))) sb.from("messages").delete().eq("id", +d.md).then(load);
      if (d.me) { var m = MS.filter(function (x) { return x.id === +d.me; })[0], n = m && prompt(t("edit"), m.body); if (n && n.trim()) sb.from("messages").update({ body: n.trim().slice(0, 2000) }).eq("id", m.id).then(load); }
    };
    var f = $("fms");
    f.onsubmit = function (ev) {
      ev.preventDefault(); var b = f.b.value.trim(); if (!b) return;
      f.b.value = "";
      sb.from("messages").insert({ room_id: ROOM, body: b }).then(function (r) { if (r.error) { f.b.value = b; alert(r.error.message); } else load(); });
    };
    f.b.onkeydown = function (ev) { if (ev.key === "Enter" && !ev.shiftKey) { ev.preventDefault(); f.requestSubmit ? f.requestSubmit() : f.onsubmit(ev); } };
    if (CH) sb.removeChannel(CH);
    CH = sb.channel("room-" + ROOM).on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: "room_id=eq." + ROOM }, load).subscribe();
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
function adminV() {
  var v = $("clv");
  Promise.all([sb.from("profiles").select("*").order("created_at", { ascending: false }), sb.from("subjects").select("*").order("name")]).then(function (rs) {
    var us = rs[0].data || [], ss = rs[1].data || [], teachers = us.filter(function (u) { return u.role === "teacher" || u.role === "admin"; });
    us.sort(function (a, b) { return (a.role === "pending" ? 0 : 1) - (b.role === "pending" ? 0 : 1); });
    var roles = Object.keys(t("role"));
    function tOpts(sel) { return '<option value="">—</option>' + teachers.map(function (u) { return '<option value="' + u.id + '"' + (u.id === sel ? " selected" : "") + '>' + e(u.full_name || u.login) + '</option>'; }).join(""); }
    v.innerHTML = '<h2>' + e(t("users")) + '</h2><div class="jt"><table id="utbl"><tr><th class="nm">' + e(t("fio")) + '</th><th>' + e(t("lg")) + '</th><th>' + e(t("roleL")) + '</th><th>' + e(t("dept")) + '</th><th>' + e(t("grp")) + '</th><th></th></tr>' +
      us.map(function (u) {
        return '<tr data-u="' + u.id + '"' + (u.role === "pending" ? ' class="warn"' : '') + '><td class="nm l">' + e(u.full_name) + (u.role === "pending" ? ' <span class="cl-tag">' + e(t("newU")) + '</span>' : '') + '</td><td>' + e(u.login) + '</td>' +
          '<td><select data-f="role">' + roles.map(function (r) { return '<option value="' + r + '"' + (u.role === r ? " selected" : "") + '>' + e(t("role")[r]) + '</option>'; }).join("") + '</select></td>' +
          '<td><select data-f="dept"><option value="">—</option>' + deptOpts(u.dept || "") + '</select></td><td><input data-f="grp" value="' + e(u.grp || "") + '" style="width:110px"></td><td><button class="cl-b pri" data-sv="1">' + e(t("save")) + '</button></td></tr>';
      }).join("") + '</table></div>' +
      '<h2>' + e(t("subjects")) + '</h2><form class="card cl-f" id="fsb" style="margin-bottom:14px"><div class="row" style="gap:8px"><input class="cl-in" name="n" placeholder="' + e(t("title")) + '" maxlength="200" required style="flex:2 1 200px"><select class="cl-in" name="d" style="flex:1 1 160px">' + deptOpts(1) + '</select><select class="cl-in" name="tc" style="flex:1 1 160px">' + tOpts() + '</select><button class="cl-b pri">' + e(t("addSubj")) + '</button></div><p class="cl-msg" id="msb"></p></form>' +
      '<div class="jt"><table id="stbl"><tr><th class="nm">' + e(t("subject")) + '</th><th>' + e(t("dept")) + '</th><th>' + e(t("teacher")) + '</th><th></th></tr>' +
      ss.map(function (s) { return '<tr data-s="' + s.id + '"><td class="nm l"><input data-f="name" value="' + e(s.name) + '" style="width:220px"></td><td><select data-f="dept">' + deptOpts(s.dept) + '</select></td><td><select data-f="teacher_id">' + tOpts(s.teacher_id) + '</select></td><td><button class="cl-b pri" data-ss="1">' + e(t("save")) + '</button> <button class="cl-b dng" data-sd="1">✕</button></td></tr>'; }).join("") + '</table></div>';
    function vals(tr) { var o = {}; [].forEach.call(tr.querySelectorAll("[data-f]"), function (el) { var v = el.value.trim(); o[el.dataset.f] = v === "" ? null : (el.dataset.f === "dept" ? +v : v); }); return o; }
    function flash(btn, r) { btn.textContent = r.error ? "⚠ " + r.error.message : "✓"; setTimeout(function () { btn.textContent = t("save"); }, 1800); }
    $("utbl").onclick = function (ev) {
      if (!(ev.target.dataset && ev.target.dataset.sv)) return;
      var tr = ev.target.closest("tr"), o = vals(tr);
      sb.from("profiles").update(o).eq("id", tr.dataset.u).then(function (r) { flash(ev.target, r); if (tr.dataset.u === ME.id) loadMe(); });
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
window.MFC = { nav: nav, view: view, bind: bind };
if (READY) {
  sb = window.supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: true, autoRefreshToken: true } });
  var who = function () { return ME ? ME.id + ME.role : ""; }, last = null;
  var refresh = function () { loadMe().then(function () { if (who() !== last) { last = who(); X.render(); } }); };
  // перерисовываем страницу только если действительно сменился пользователь или его роль
  sb.auth.onAuthStateChange(function (ev) { if (ev === "SIGNED_OUT" || ev === "SIGNED_IN") setTimeout(refresh, 0); });
  refresh();
} else X.render();
})();
