/* ============================================================
   .NET Senior Interview Prep — application logic
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Topic metadata (keys must match data.js) ---------- */
  var TOPIC_META = {
    "csharp":            { color: "#512bd4", pl: "C# i system typów",           en: "C# & Type System" },
    "oop":               { color: "#7c4dff", pl: "OOP i SOLID",                 en: "OOP & SOLID" },
    "linq":              { color: "#4361ee", pl: "LINQ i funkcyjność",          en: "LINQ & Functional" },
    "async":             { color: "#2a9d8f", pl: "Async / Await",               en: "Async / Await" },
    "threading":         { color: "#188a7b", pl: "Wątki i współbieżność",       en: "Threading & Concurrency" },
    "dotnet-advanced":   { color: "#e76f51", pl: "Zaawansowany .NET (GC, pamięć)", en: "Advanced .NET (GC, Memory)" },
    "aspnetcore":        { color: "#0077b6", pl: "ASP.NET Core",                en: "ASP.NET Core" },
    "api-design":        { color: "#0096c7", pl: "Projektowanie API",           en: "API Design" },
    "architecture":      { color: "#9d4edd", pl: "Architektura i DDD/CQRS",     en: "Architecture & DDD/CQRS" },
    "patterns":          { color: "#c77dff", pl: "Wzorce projektowe",           en: "Design Patterns" },
    "efcore":            { color: "#d62828", pl: "EF Core",                     en: "EF Core" },
    "config-reliability":{ color: "#f77f00", pl: "Konfiguracja i niezawodność", en: "Configuration & Reliability" },
    "security":          { color: "#e63946", pl: "Bezpieczeństwo i tożsamość",  en: "Security & Identity" },
    "performance":       { color: "#fb8500", pl: "Wydajność",                   en: "Performance" },
    "caching":           { color: "#2b9348", pl: "Cache",                       en: "Caching" },
    "messaging":         { color: "#3a86ff", pl: "Systemy kolejkowe",           en: "Messaging" },
    "signalr":           { color: "#8338ec", pl: "SignalR / real-time",         en: "SignalR / Realtime" },
    "deployment":        { color: "#457b9d", pl: "Wdrożenia i DevOps",          en: "Deployment & DevOps" },
    "testing":           { color: "#606c38", pl: "Testowanie",                  en: "Testing" },
    "system-design":     { color: "#264653", pl: "Projektowanie systemów",      en: "System Design" }
  };

  /* ---------- i18n for UI chrome ---------- */
  var I18N = {
    tagline:      { pl: "Dwujęzyczny zestaw na poziom senior", en: "Bilingual senior-level study deck" },
    heroTitle:    { pl: "Przygotowanie do rozmowy senior .NET", en: "Senior .NET Interview Prep" },
    heroText:     { pl: "245 dogłębnych, dwujęzycznych pytań z odpowiedziami, kodem i kompromisami — z całego stosu .NET. Szukaj, filtruj po temacie i poziomie, dodawaj do zakładek i ćwicz w trybie quizu.", en: "245 deep, bilingual questions with answers, code and trade-offs — across the whole .NET stack. Search, filter by topic and level, bookmark, and drill with quiz mode." },
    statTopics:   { pl: "tematów", en: "topics" },
    statQ:        { pl: "pytań", en: "questions" },
    statLevels:   { pl: "poziomy: Śred./Senior/Ekspert", en: "levels: Mid/Senior/Expert" },
    statLang:     { pl: "języki: PL / EN", en: "languages: PL / EN" },
    quiz:         { pl: "Quiz", en: "Quiz" },
    difficulty:   { pl: "Poziom trudności", en: "Difficulty" },
    mid:          { pl: "Śred.", en: "Mid" },
    senior:       { pl: "Senior", en: "Senior" },
    expert:       { pl: "Ekspert", en: "Expert" },
    topics:       { pl: "Tematy", en: "Topics" },
    reset:        { pl: "Wyczyść filtry", en: "Reset all filters" },
    bookmarksOnly:{ pl: "Tylko zakładki", en: "Bookmarks only" },
    questions:    { pl: "pytań", en: "questions" },
    sortTopic:    { pl: "Wg tematu", en: "By topic" },
    sortEasy:     { pl: "Od najłatwiejszych", en: "Easiest first" },
    sortHard:     { pl: "Od najtrudniejszych", en: "Hardest first" },
    expandAll:    { pl: "Rozwiń wszystko", en: "Expand all" },
    collapseAll:  { pl: "Zwiń wszystko", en: "Collapse all" },
    searchph:     { pl: "Szukaj pytań, kodu, tagów…", en: "Search questions, code, tags…" },
    noResultsTitle:{ pl: "Nie znaleziono pytań", en: "No questions found" },
    noResultsText:{ pl: "Spróbuj innej frazy lub wyczyść filtry.", en: "Try a different search term or reset the filters." },
    done:         { pl: "Gotowe", en: "Done" },
    footerTitle:  { pl: ".NET Senior Interview Prep", en: ".NET Senior Interview Prep" },
    footerText:   { pl: "otwarty, darmowy zestaw do nauki. Treści mają charakter edukacyjny i powstały niezależnie.", en: "an open, free study deck. Content is educational and independently written." },
    prev:         { pl: "← Wstecz", en: "← Prev" },
    next:         { pl: "Dalej →", en: "Next →" },
    skip:         { pl: "Pomiń", en: "Skip" },
    shortLabel:   { pl: "Odpowiedź na rozmowę", en: "Interview answer" },
    revealAnswer: { pl: "Pokaż odpowiedź", en: "Reveal answer" },
    rateGood:     { pl: "Umiem", en: "Got it" },
    rateGoodSub:  { pl: "wiedziałem", en: "I knew it" },
    rateMeh:      { pl: "Prawie", en: "Almost" },
    rateMehSub:   { pl: "częściowo", en: "partial" },
    rateBad:      { pl: "Powtórka", en: "Review" },
    rateBadSub:   { pl: "nie umiem", en: "didn't know" },
    quizDone:     { pl: "Quiz ukończony!", en: "Quiz complete!" },
    quizAgain:    { pl: "Jeszcze raz", en: "Restart quiz" },
    quizReview:   { pl: "Przejrzyj oznaczone", en: "Review flagged" },
    quizExit:     { pl: "Zamknij", en: "Close" },
    copy:         { pl: "Kopiuj", en: "Copy" },
    copied:       { pl: "Skopiowano!", en: "Copied!" },
    bookmarkAdd:  { pl: "Dodano do zakładek", en: "Bookmarked" },
    bookmarkRem:  { pl: "Usunięto z zakładek", en: "Bookmark removed" },
    scopeAll:     { pl: "Pula pytań: wszystkie widoczne", en: "Quiz pool: all filtered" },
    sections: {
      intuition:  { pl: "Intuicja", en: "Intuition" },
      definition: { pl: "Definicja", en: "Definition" },
      when:       { pl: "Kiedy używać", en: "When to use" },
      tradeoffs:  { pl: "Kompromisy", en: "Trade-offs" },
      mistakes:   { pl: "Częste błędy", en: "Common mistakes" },
      comparison: { pl: "Porównanie", en: "Comparison" }
    }
  };
  var SECTION_ORDER = ["intuition","definition","when","tradeoffs","mistakes","comparison"];
  var SECTION_EMOJI = { intuition:"💡", definition:"📘", when:"✅", tradeoffs:"⚖️", mistakes:"⚠️", comparison:"🔀" };
  var DIFF_RANK = { mid:0, senior:1, expert:2 };

  /* ---------- State ---------- */
  var ALL = (window.QUESTIONS || []).slice();
  var state = {
    lang: localStorage.getItem("dnp_lang") || (navigator.language && navigator.language.slice(0,2) === "pl" ? "pl" : "en"),
    theme: localStorage.getItem("dnp_theme") || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
    search: "",
    topics: new Set(),
    diffs: new Set(),
    bookmarksOnly: false,
    sort: "topic",
    expanded: new Set(),
    bookmarks: new Set(JSON.parse(localStorage.getItem("dnp_bookmarks") || "[]"))
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function t(key) { var v = I18N[key]; return v ? v[state.lang] : key; }
  function L(obj) { return obj ? (obj[state.lang] || obj.en || obj.pl || "") : ""; }

  /* ---------- HTML escaping + C# highlighter ---------- */
  function esc(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }
  var CS_KW = new Set(("abstract as async await base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach get goto if implicit in init int interface internal is lock long namespace new null object operator out override params private protected public readonly record ref required return sbyte sealed set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using var virtual void volatile while yield when where global nameof with and or not").split(" "));
  function highlight(code) {
    var rx = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(@?\$?"(?:\\.|""|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d[\d_]*(?:\.\d+)?[fFdDmMlLuU]*\b|\b0[xX][0-9a-fA-F]+\b)|([A-Za-z_][A-Za-z0-9_]*)/g;
    var out = "", last = 0, m;
    while ((m = rx.exec(code)) !== null) {
      if (m.index > last) out += esc(code.slice(last, m.index));
      last = rx.lastIndex;
      if (m[1]) out += '<span class="tok-c">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="tok-s">' + esc(m[2]) + '</span>';
      else if (m[3]) out += '<span class="tok-n">' + esc(m[3]) + '</span>';
      else if (m[4]) {
        var w = m[4];
        if (CS_KW.has(w)) out += '<span class="tok-k">' + w + '</span>';
        else if (/^[A-Z]/.test(w)) out += '<span class="tok-t">' + w + '</span>';
        else out += w;
      }
    }
    if (last < code.length) out += esc(code.slice(last));
    return out;
  }

  /* ---------- Search index ---------- */
  ALL.forEach(function (q) {
    var parts = [q.q.pl, q.q.en, q.short.pl, q.short.en, (q.tags||[]).join(" "), q.code || ""];
    if (q.sections) SECTION_ORDER.forEach(function (k) { if (q.sections[k]) { parts.push(q.sections[k].pl, q.sections[k].en); } });
    q._idx = parts.join(" \n ").toLowerCase().replace(/<[^>]+>/g, " ");
  });

  /* ---------- Filtering ---------- */
  function matches(q) {
    if (state.topics.size && !state.topics.has(q.topic)) return false;
    if (state.diffs.size && !state.diffs.has(q.difficulty)) return false;
    if (state.bookmarksOnly && !state.bookmarks.has(q.id)) return false;
    if (state.search) {
      var terms = state.search.toLowerCase().split(/\s+/).filter(Boolean);
      for (var i = 0; i < terms.length; i++) if (q._idx.indexOf(terms[i]) === -1) return false;
    }
    return true;
  }
  function filtered() {
    var arr = ALL.filter(matches);
    if (state.sort === "diffAsc") arr.sort(function (a,b){ return DIFF_RANK[a.difficulty]-DIFF_RANK[b.difficulty]; });
    else if (state.sort === "diffDesc") arr.sort(function (a,b){ return DIFF_RANK[b.difficulty]-DIFF_RANK[a.difficulty]; });
    else arr.sort(function (a,b){ var ta=Object.keys(TOPIC_META).indexOf(a.topic), tb=Object.keys(TOPIC_META).indexOf(b.topic); return ta-tb || DIFF_RANK[a.difficulty]-DIFF_RANK[b.difficulty]; });
    return arr;
  }

  /* ---------- Rendering: sidebar ---------- */
  function renderTopics() {
    var counts = {};
    ALL.forEach(function (q){ counts[q.topic]=(counts[q.topic]||0)+1; });
    var host = $("#topicList"); host.innerHTML = "";
    Object.keys(TOPIC_META).forEach(function (key) {
      if (!counts[key]) return;
      var m = TOPIC_META[key];
      var b = document.createElement("button");
      b.className = "topic-chip"; b.setAttribute("aria-pressed", state.topics.has(key));
      b.innerHTML = '<span class="dot" style="background:'+m.color+'"></span><span>'+esc(m[state.lang])+'</span><span class="cnt">'+counts[key]+'</span>';
      b.addEventListener("click", function () { toggleSet(state.topics, key); render(); });
      host.appendChild(b);
    });
  }

  function toggleSet(set, v) { if (set.has(v)) set.delete(v); else set.add(v); }

  /* ---------- Rendering: cards ---------- */
  function badge(q) {
    var m = TOPIC_META[q.topic] || { color:"#888", pl:q.topic, en:q.topic };
    return '<span class="badge badge-topic"><span class="dot" style="background:'+m.color+'"></span>'+esc(m[state.lang])+'</span>'+
           '<span class="badge badge-diff" data-diff="'+q.difficulty+'">'+esc(t(q.difficulty))+'</span>';
  }
  function codeBlock(code) {
    if (!code) return "";
    return '<div class="code-lbl">C#</div><div class="code-block"><button class="copy" type="button">'+t("copy")+'</button><pre><code>'+highlight(code)+'</code></pre></div>';
  }
  function secLabel(k) { return I18N.sections[k][state.lang]; }

  function cardHTML(q) {
    var open = state.expanded.has(q.id);
    var bm = state.bookmarks.has(q.id);
    var body = "";
    if (open) {
      body += '<div class="short-answer"><div class="lbl">✦ '+t("shortLabel")+'</div><p>'+esc(L(q.short))+'</p></div>';
      SECTION_ORDER.forEach(function (k) {
        var sec = q.sections && q.sections[k]; if (!sec) return;
        var txt = L(sec); if (!txt || !txt.trim()) return;
        body += '<div class="section sec-'+k+'"><div class="section-h"><span class="ic">'+SECTION_EMOJI[k]+'</span>'+secLabel(k)+'</div><div class="section-c">'+txt+'</div></div>';
      });
      body += codeBlock(q.code);
      if (q.tags && q.tags.length) {
        body += '<div class="card-tags">'+q.tags.map(function(tg){return '<span class="tag">'+esc(tg)+'</span>';}).join("")+'</div>';
      }
    }
    return '<article class="card'+(open?" open":"")+'" data-id="'+q.id+'" role="listitem">'+
      '<div class="card-head" tabindex="0" role="button" aria-expanded="'+open+'">'+
        '<div><div class="q-meta">'+badge(q)+'</div><div class="q-text">'+L(q.q)+'</div></div>'+
        '<div class="head-actions">'+
          '<button class="mini bm'+(bm?" on":"")+'" data-act="bm" aria-label="'+(bm?"Remove bookmark":"Add bookmark")+'" aria-pressed="'+bm+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="'+(bm?"currentColor":"none")+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></button>'+
          '<span class="mini chev" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>'+
        '</div>'+
      '</div>'+
      '<div class="card-body">'+body+'</div>'+
    '</article>';
  }

  function renderCards() {
    var arr = filtered();
    $("#count").textContent = arr.length;
    var host = $("#results");
    if (!arr.length) { host.innerHTML = ""; $("#empty").style.display="block"; return; }
    $("#empty").style.display = "none";
    host.innerHTML = arr.map(cardHTML).join("");
  }

  function renderActiveFilters() {
    var host = $("#activeFilters"); host.innerHTML = "";
    function tag(label, onClear) {
      var el = document.createElement("span"); el.className="filter-tag";
      el.innerHTML = esc(label)+' <button aria-label="Remove filter">&times;</button>';
      el.querySelector("button").addEventListener("click", function(){ onClear(); render(); });
      host.appendChild(el);
    }
    state.topics.forEach(function(k){ tag(TOPIC_META[k][state.lang], function(){ state.topics.delete(k); }); });
    state.diffs.forEach(function(d){ tag(t(d), function(){ state.diffs.delete(d); }); });
    if (state.bookmarksOnly) tag("★ "+t("bookmarksOnly"), function(){ state.bookmarksOnly=false; });
  }

  /* ---------- Chrome sync ---------- */
  function applyI18n() {
    document.documentElement.lang = state.lang;
    $$("[data-i18n]").forEach(function(el){ el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-ph]").forEach(function(el){ el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    $("#langPL").setAttribute("aria-pressed", state.lang==="pl");
    $("#langEN").setAttribute("aria-pressed", state.lang==="en");
    var ea = $("#expandAll");
    ea.textContent = allExpanded() ? t("collapseAll") : t("expandAll");
  }
  function allExpanded() { var f = filtered(); return f.length>0 && f.every(function(q){return state.expanded.has(q.id);}); }

  function syncControls() {
    $$(".diff-btn").forEach(function(b){ b.setAttribute("aria-pressed", state.diffs.has(b.dataset.diff)); });
    $("#bookmarkFilter").setAttribute("aria-pressed", state.bookmarksOnly);
    var bc = $("#bmCount");
    if (state.bookmarks.size) { bc.style.display="inline-block"; bc.textContent=state.bookmarks.size; } else bc.style.display="none";
    $("#searchClear").classList.toggle("show", !!state.search);
    $("#footerStats").textContent = ALL.length + (state.lang==="pl"?" pytań • "+Object.keys(TOPIC_META).length+" tematów • PL/EN":" questions • "+Object.keys(TOPIC_META).length+" topics • PL/EN");
    var nTopics = {}; ALL.forEach(function(q){ nTopics[q.topic]=1; });
    $("#heroStats").innerHTML =
      '<span class="hs"><b>'+ALL.length+'</b> '+t("statQ")+'</span>'+
      '<span class="hs"><b>'+Object.keys(nTopics).length+'</b> '+t("statTopics")+'</span>'+
      '<span class="hs">'+t("statLevels")+'</span>'+
      '<span class="hs">'+t("statLang")+'</span>';
  }

  function render() {
    renderTopics(); renderCards(); renderActiveFilters(); applyI18n(); syncControls();
    persist();
  }
  function persist() {
    localStorage.setItem("dnp_lang", state.lang);
    localStorage.setItem("dnp_theme", state.theme);
    localStorage.setItem("dnp_bookmarks", JSON.stringify(Array.from(state.bookmarks)));
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function(){ el.classList.remove("show"); }, 1600);
  }

  /* ---------- Theme ---------- */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var ic = $("#themeIcon");
    if (state.theme === "dark") ic.innerHTML = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
    else ic.innerHTML = '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  }

  /* ---------- Events: header ---------- */
  $("#langPL").addEventListener("click", function(){ state.lang="pl"; render(); if(quiz.active) renderQuiz(); });
  $("#langEN").addEventListener("click", function(){ state.lang="en"; render(); if(quiz.active) renderQuiz(); });
  $("#themeToggle").addEventListener("click", function(){ state.theme = state.theme==="dark"?"light":"dark"; applyTheme(); persist(); });

  var searchTimer;
  $("#search").addEventListener("input", function(e){
    clearTimeout(searchTimer);
    var v = e.target.value;
    searchTimer = setTimeout(function(){ state.search = v.trim(); renderCards(); renderActiveFilters(); syncControls(); }, 120);
  });
  $("#searchClear").addEventListener("click", function(){ $("#search").value=""; state.search=""; render(); $("#search").focus(); });

  $$(".diff-btn").forEach(function(b){ b.addEventListener("click", function(){ toggleSet(state.diffs, b.dataset.diff); render(); }); });
  $("#bookmarkFilter").addEventListener("click", function(){ state.bookmarksOnly=!state.bookmarksOnly; render(); });
  $("#resetFilters").addEventListener("click", function(){ state.topics.clear(); state.diffs.clear(); state.bookmarksOnly=false; state.search=""; $("#search").value=""; render(); });
  $("#sortSel").addEventListener("change", function(e){ state.sort=e.target.value; renderCards(); });
  $("#expandAll").addEventListener("click", function(){
    var f = filtered();
    if (allExpanded()) f.forEach(function(q){ state.expanded.delete(q.id); });
    else f.forEach(function(q){ state.expanded.add(q.id); });
    renderCards(); applyI18n();
  });

  /* ---------- Events: card interaction (delegation) ---------- */
  function toggleCard(id) { if (state.expanded.has(id)) state.expanded.delete(id); else state.expanded.add(id); }
  $("#results").addEventListener("click", function(e){
    var copyBtn = e.target.closest(".copy");
    if (copyBtn) {
      var code = copyBtn.parentNode.querySelector("code").innerText;
      navigator.clipboard && navigator.clipboard.writeText(code).then(function(){ toast(t("copied")); });
      return;
    }
    var bm = e.target.closest('[data-act="bm"]');
    if (bm) {
      var card = bm.closest(".card"); var id = card.dataset.id;
      if (state.bookmarks.has(id)) { state.bookmarks.delete(id); toast(t("bookmarkRem")); }
      else { state.bookmarks.add(id); toast(t("bookmarkAdd")); }
      persist(); syncControls();
      if (state.bookmarksOnly) renderCards(); else { renderCards(); }
      return;
    }
    var head = e.target.closest(".card-head");
    if (head) { var id2 = head.closest(".card").dataset.id; toggleCard(id2); renderCards(); applyI18n(); }
  });
  $("#results").addEventListener("keydown", function(e){
    if ((e.key==="Enter"||e.key===" ") && e.target.classList.contains("card-head")) {
      e.preventDefault(); toggleCard(e.target.closest(".card").dataset.id); renderCards(); applyI18n();
    }
  });

  /* ---------- Mobile drawer ---------- */
  function openDrawer(){ $("#sidebar").classList.add("open"); $("#drawerBackdrop").classList.add("show"); }
  function closeDrawer(){ $("#sidebar").classList.remove("open"); $("#drawerBackdrop").classList.remove("show"); }
  $("#openFilters").addEventListener("click", openDrawer);
  $("#closeFilters").addEventListener("click", closeDrawer);
  $("#drawerBackdrop").addEventListener("click", closeDrawer);

  /* ============================================================
     QUIZ MODE
     ============================================================ */
  var quiz = { active:false, order:[], i:0, revealed:false, results:{} };

  function startQuiz() {
    var pool = filtered();
    if (!pool.length) { toast(state.lang==="pl"?"Brak pytań w puli":"No questions in pool"); return; }
    quiz.order = shuffle(pool.map(function(q){return q.id;}));
    quiz.i = 0; quiz.revealed = false; quiz.results = {}; quiz.active = true;
    $("#quizOverlay").classList.add("show");
    document.body.style.overflow = "hidden";
    renderQuiz();
    $("#quizClose").focus();
  }
  function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var x=a[i];a[i]=a[j];a[j]=x;} return a; }
  function byId(id){ for(var i=0;i<ALL.length;i++) if(ALL[i].id===id) return ALL[i]; }

  function renderQuiz() {
    var total = quiz.order.length;
    if (quiz.i >= total) { renderQuizResult(); return; }
    var q = byId(quiz.order[quiz.i]);
    var scored = Object.keys(quiz.results).filter(function(k){return quiz.results[k]==="good";}).length;
    $("#quizPos").textContent = (quiz.i+1) + " / " + total;
    $("#quizScore").textContent = scored + " ✓";
    $("#quizFill").style.width = ((quiz.i)/total*100) + "%";

    var answer = "";
    answer += '<div class="short-answer"><div class="lbl">✦ '+t("shortLabel")+'</div><p>'+esc(L(q.short))+'</p></div>';
    SECTION_ORDER.forEach(function (k) {
      var sec = q.sections && q.sections[k]; if (!sec) return;
      var txt = L(sec); if (!txt || !txt.trim()) return;
      answer += '<div class="section sec-'+k+'"><div class="section-h"><span class="ic">'+SECTION_EMOJI[k]+'</span>'+secLabel(k)+'</div><div class="section-c">'+txt+'</div></div>';
    });
    answer += codeBlock(q.code);

    var m = TOPIC_META[q.topic];
    $("#quizContent").innerHTML =
      '<div class="quiz-qbox">'+
        '<div class="q-meta">'+badge(q)+'</div>'+
        '<div class="quiz-q">'+L(q.q)+'</div>'+
        (quiz.revealed
          ? '<div class="quiz-answer show">'+answer+
              '<div class="quiz-rate">'+
                '<button class="rate-btn bad" data-rate="bad">'+t("rateBad")+'<small>'+t("rateBadSub")+'</small></button>'+
                '<button class="rate-btn meh" data-rate="meh">'+t("rateMeh")+'<small>'+t("rateMehSub")+'</small></button>'+
                '<button class="rate-btn good" data-rate="good">'+t("rateGood")+'<small>'+t("rateGoodSub")+'</small></button>'+
              '</div>'+
            '</div>'
          : '<button class="iconbtn btn-primary quiz-reveal-btn" id="revealBtn" style="color:#fff">'+t("revealAnswer")+'</button>')+
      '</div>';
    $("#quizScroll").scrollTop = 0;

    if (!quiz.revealed) $("#revealBtn").addEventListener("click", function(){ quiz.revealed=true; renderQuiz(); });
    $$("[data-rate]").forEach(function(b){ b.addEventListener("click", function(){ quiz.results[q.id]=b.dataset.rate; nextQuiz(); }); });
    $("#quizPrev").style.visibility = quiz.i>0 ? "visible":"hidden";
  }

  function nextQuiz(){ quiz.i++; quiz.revealed=false; renderQuiz(); }
  function prevQuiz(){ if(quiz.i>0){ quiz.i--; quiz.revealed=!!quiz.results[quiz.order[quiz.i]]; renderQuiz(); } }

  function renderQuizResult() {
    var total = quiz.order.length;
    var good=0, meh=0, bad=0;
    quiz.order.forEach(function(id){ var r=quiz.results[id]; if(r==="good")good++; else if(r==="meh")meh++; else bad++; });
    var pct = Math.round(good/total*100);
    $("#quizFill").style.width = "100%";
    $("#quizPos").textContent = total+" / "+total;
    $("#quizScore").textContent = good+" ✓";
    var flagged = quiz.order.filter(function(id){ return quiz.results[id]!=="good"; });
    $("#quizContent").innerHTML =
      '<div class="quiz-result">'+
        '<div class="score-ring">'+pct+'%</div>'+
        '<h2 style="margin:6px 0 2px">'+t("quizDone")+'</h2>'+
        '<div class="quiz-stat-row">'+
          '<div class="qstat" style="border-color:var(--ok)"><b style="color:var(--ok)">'+good+'</b><span>'+t("rateGood")+'</span></div>'+
          '<div class="qstat" style="border-color:var(--warn)"><b style="color:var(--warn)">'+meh+'</b><span>'+t("rateMeh")+'</span></div>'+
          '<div class="qstat" style="border-color:var(--danger)"><b style="color:var(--danger)">'+bad+'</b><span>'+t("rateBad")+'</span></div>'+
        '</div>'+
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">'+
          '<button class="iconbtn btn-primary" id="quizRestart" style="color:#fff">'+t("quizAgain")+'</button>'+
          (flagged.length ? '<button class="iconbtn" id="quizReviewBtn">'+t("quizReview")+' ('+flagged.length+')</button>' : '')+
          '<button class="iconbtn" id="quizExit2">'+t("quizExit")+'</button>'+
        '</div>'+
      '</div>';
    $("#quizPrev").style.visibility="hidden";
    $("#quizRestart").addEventListener("click", function(){ quiz.order=shuffle(quiz.order.slice()); quiz.i=0; quiz.revealed=false; quiz.results={}; renderQuiz(); });
    $("#quizExit2").addEventListener("click", closeQuiz);
    var rev = $("#quizReviewBtn");
    if (rev) rev.addEventListener("click", function(){ quiz.order=shuffle(flagged.slice()); quiz.i=0; quiz.revealed=false; quiz.results={}; renderQuiz(); });
  }

  function closeQuiz(){ quiz.active=false; $("#quizOverlay").classList.remove("show"); document.body.style.overflow=""; $("#quizBtn").focus(); }

  $("#quizBtn").addEventListener("click", startQuiz);
  $("#quizClose").addEventListener("click", closeQuiz);
  $("#quizNext").addEventListener("click", function(){ if(!quiz.revealed){quiz.revealed=true;renderQuiz();} else nextQuiz(); });
  $("#quizSkip").addEventListener("click", nextQuiz);
  $("#quizPrev").addEventListener("click", prevQuiz);
  $("#quizOverlay").addEventListener("click", function(e){
    var b = e.target.closest(".copy");
    if (b){ var code=b.parentNode.querySelector("code").innerText; navigator.clipboard && navigator.clipboard.writeText(code).then(function(){toast(t("copied"));}); }
  });

  /* ---------- Global keyboard ---------- */
  document.addEventListener("keydown", function(e){
    if (quiz.active) {
      if (e.key==="Escape") closeQuiz();
      else if (e.key==="ArrowRight") { if(!quiz.revealed){quiz.revealed=true;renderQuiz();} else nextQuiz(); }
      else if (e.key==="ArrowLeft") prevQuiz();
      else if (e.key===" " && !quiz.revealed) { e.preventDefault(); quiz.revealed=true; renderQuiz(); }
      else if (quiz.revealed && (e.key==="1"||e.key==="2"||e.key==="3")) {
        var map={"1":"bad","2":"meh","3":"good"}; quiz.results[quiz.order[quiz.i]]=map[e.key]; nextQuiz();
      }
      return;
    }
    if (e.key === "/" && document.activeElement !== $("#search")) { e.preventDefault(); $("#search").focus(); }
  });

  /* ---------- Boot ---------- */
  applyTheme();
  render();
  // deep-link: #id opens a card
  if (location.hash) {
    var id = location.hash.slice(1);
    if (byId(id)) { state.expanded.add(id); renderCards(); setTimeout(function(){ var el=$('[data-id="'+id+'"]'); if(el) el.scrollIntoView({block:"center"}); }, 100); }
  }
  console.log("%c.NET Senior Interview Prep","color:#7c4dff;font-weight:bold", "· "+ALL.length+" questions loaded");
})();
