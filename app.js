/* Shared helpers: language choice, header, footer. No frameworks, no build step. */
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
    document.getElementById("foot").innerHTML = '<div class="wrap">' + esc(t.disclaimer) + "</div>";
  }

  window.App = { getLang: getLang, chrome: chrome, esc: esc };
})();
