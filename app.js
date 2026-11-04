/* Shared helpers: language, the reader's hero, header, footer. No frameworks, no build step. */
(function () {
  var LANGS = [["en", "English"], ["hi", "हिन्दी"], ["mr", "मराठी"]];

  function getLang() {
    var p = new URLSearchParams(location.search).get("lang");
    if (p && window.UI[p]) return p;
    try {
      var s = localStorage.getItem("pp-lang");
      if (s && window.UI[s]) return s;
    } catch (e) {}
    return "en";
  }

  function setLang(l) {
    try { localStorage.setItem("pp-lang", l); } catch (e) {}
    var u = new URL(location.href);
    u.searchParams.set("lang", l);
    location.href = u.toString();
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function chrome(lang) {
    var t = window.UI[lang];
    document.documentElement.lang = lang;
    var btns = LANGS.map(function (x) {
      return '<button type="button" data-l="' + x[0] + '" aria-pressed="' + (x[0] === lang) + '">' + x[1] + "</button>";
    }).join("");
    document.getElementById("top").innerHTML =
      '<div class="wrap"><a class="brand" href="index.html?lang=' + lang + '">' + esc(window.SITE.name[lang]) +
      '</a><div class="langs"><span>' + esc(t.lang) + "</span>" + btns + "</div></div>";
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-l")); });
    });
    var credit = (window.SITE.credit && window.SITE.credit[lang]) || "";
    document.getElementById("foot").innerHTML = '<div class="wrap">' + esc(t.disclaimer) + (credit ? "<br>" + esc(credit) : "") + "</div>";
  }

  /* ---------- The reader's hero ----------
     Asked for once, kept on this phone only, and used by every book.
     If the reader skips, the name is a friendly word in the current language. */
  var KEY = "pp-hero", memory = null;

  function readHero(lang) {
    var h = null;
    try { h = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
    if (!h) h = memory;
    if (!h || (h.g !== "b" && h.g !== "g")) return null;
    var t = window.UI[lang];
    var name = h.auto ? (h.g === "g" ? t.autoG : t.autoB) : String(h.name || "");
    if (!name) return null;
    return { name: name, g: h.g, auto: !!h.auto };
  }

  function saveHero(h) {
    memory = h;
    try { localStorage.setItem(KEY, JSON.stringify(h)); } catch (e) {}
  }

  /* Fill a text template: {name}, and [[boy|girl]] endings for Hindi and Marathi. */
  function tpl(s, hero) {
    var g = hero && hero.g === "g" ? 1 : 0, n = hero ? hero.name : "";
    return String(s).replace(/\{name\}/g, function () { return n; })
      .replace(/\[\[([^|\]]*)\|([^\]]*)\]\]/g, function (m, a, b) { return g ? b : a; });
  }

  /* The name-and-look form, used inline on a first visit and inside the pop-up later. */
  function heroForm(host, lang, current, onSave) {
    var t = window.UI[lang];
    var g = (current && current.g) || "g";
    var startName = current && !current.auto ? current.name : "";
    host.innerHTML =
      '<label>' + esc(t.nameLabel) + '<input type="text" maxlength="20" autocomplete="off" class="hf-name" value="' + esc(startName) + '"></label>' +
      '<div class="pick"></div>' +
      '<button type="button" class="btn primary big hf-go">' + esc(t.heroSave) + "</button>" +
      '<p class="hint hf-hint" role="alert"></p>' +
      '<button type="button" class="linkbtn hf-skip">' + esc(t.heroSkip) + "</button>" +
      '<p class="fine">' + esc(t.heroNote) + "</p>";
    var input = host.querySelector(".hf-name");
    function drawPick() {
      host.querySelector(".pick").innerHTML = ["g", "b"].map(function (k) {
        return '<button type="button" class="avatar" data-g="' + k + '" aria-pressed="' + (k === g) + '">' + window.Art.avatar(k) + "<span>" + esc(k === "g" ? t.girl : t.boy) + "</span></button>";
      }).join("");
      host.querySelectorAll(".avatar").forEach(function (b) {
        b.addEventListener("click", function () { g = b.getAttribute("data-g"); drawPick(); });
      });
    }
    drawPick();
    host.querySelector(".hf-go").addEventListener("click", function () {
      var n = input.value.trim();
      if (!n) { host.querySelector(".hf-hint").textContent = t.needName; input.focus(); return; }
      saveHero({ name: n, g: g });
      onSave(readHero(lang));
    });
    host.querySelector(".hf-skip").addEventListener("click", function () {
      saveHero({ g: g, auto: true });
      onSave(readHero(lang));
    });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") host.querySelector(".hf-go").click(); });
    return input;
  }

  /* Pop-up to change the hero without leaving the page. */
  function openHeroModal(lang, onSave) {
    var t = window.UI[lang];
    var before = document.activeElement;
    var ov = document.createElement("div");
    ov.className = "overlay";
    ov.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="m-t"><button type="button" class="x" aria-label="' + esc(t.close) + '">×</button><h2 id="m-t">' + esc(t.heroTitle) + '</h2><div class="mform"></div></div>';
    document.body.appendChild(ov);
    document.body.classList.add("noscroll");
    function close() {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("noscroll");
      ov.remove();
      if (before && before.focus) before.focus();
    }
    function onKey(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    ov.querySelector(".x").addEventListener("click", close);
    var input = heroForm(ov.querySelector(".mform"), lang, readHero(lang), function (h) { close(); if (onSave) onSave(h); });
    input.focus();
  }

  /* The little "Your hero: Aarav, change" button. */
  function heroChip(host, lang, onChange) {
    var t = window.UI[lang], h = readHero(lang);
    host.innerHTML = h
      ? '<button type="button" class="herochip" aria-label="' + esc(t.heroBar + ": " + h.name + ". " + t.change) + '"><span class="face">' + window.Art.headshot(h.g, 40) + '</span><span class="who"><small>' + esc(t.heroBar) + "</small><b>" + esc(h.name) + '</b></span><span class="edit">' + esc(t.change) + "</span></button>"
      : '<button type="button" class="herochip empty"><span class="face">' + window.Art.headshot("g", 40) + '</span><span class="who"><b>' + esc(t.heroPick) + "</b></span></button>";
    host.querySelector("button").addEventListener("click", function () { openHeroModal(lang, onChange); });
  }

  /* Works offline after the first visit (network first, saved copy as backup) */
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }

  window.App = { getLang: getLang, chrome: chrome, esc: esc, readHero: readHero, tpl: tpl, heroForm: heroForm, heroChip: heroChip, openHeroModal: openHeroModal };
})();
