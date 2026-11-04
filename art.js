/* Flat cartoon art drawn in code. The hero changes with the reader's choice (boy or girl).
   Art.scene(n, gender) returns an SVG string for picture n (0 = cover, 1 to 4 = story pages). */
(function () {
  var INK = "#2b2d42", SKIN = "#c68a5b", HAIR = "#1d1d2b";
  var S = ` stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  var T = (t, body) => `<g transform="${t}">${body}</g>`;

  function face(cy, mood) {
    var o = `<circle cx="-9" cy="${cy}" r="3" fill="${INK}"/><circle cx="9" cy="${cy}" r="3" fill="${INK}"/>`;
    o += `<circle cx="-17" cy="${cy + 9}" r="4.5" fill="#f4a6a0" opacity=".85"/><circle cx="17" cy="${cy + 9}" r="4.5" fill="#f4a6a0" opacity=".85"/>`;
    if (mood === "wow") o += `<ellipse cx="0" cy="${cy + 14}" rx="5" ry="6.5" fill="#7a1f2b"${S}/>`;
    else if (mood === "think") o += `<path d="M-6 ${cy + 15} Q0 ${cy + 12} 6 ${cy + 15}" fill="none"${S}/><path d="M3 ${cy - 10} Q10 ${cy - 15} 17 ${cy - 10}" fill="none"${S}/>`;
    else o += `<path d="M-9 ${cy + 9} Q0 ${cy + 20} 9 ${cy + 9} Z" fill="#fff"${S}/>`;
    return o;
  }

  function arm(x1, y1, x2, y2, col) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="17" stroke-linecap="round"/>` +
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="11" stroke-linecap="round"/>` +
      `<circle cx="${x2}" cy="${y2}" r="7.5" fill="${SKIN}"${S}/>`;
  }

  /* HERO: the reader. pose: down | up | high | give | recv */
  function hero(x, y, s, gender, pose, mood, custom) {
    var girl = gender === "g";
    custom = custom || {};
    var top = custom.top || (girl ? "#ffd23f" : "#3a86ff");
    var low = custom.low || (girl ? "#3a86ff" : "#8d5a3b");
    var hair = custom.hair || HAIR;
    var b = "";
    b += `<rect x="-20" y="-62" width="16" height="56" rx="6" fill="${girl ? low : SKIN}"${S}/>`;
    b += `<rect x="4" y="-62" width="16" height="56" rx="6" fill="${girl ? low : SKIN}"${S}/>`;
    if (!girl) b += `<rect x="-25" y="-70" width="50" height="32" rx="9" fill="${low}"${S}/>`;
    b += `<ellipse cx="-12" cy="-4" rx="13" ry="6" fill="#e63946"${S}/><ellipse cx="12" cy="-4" rx="13" ry="6" fill="#e63946"${S}/>`;
    var R = { down: [27, -102, 36, -64], up: [27, -102, 46, -150], high: [27, -102, 50, -174], give: [27, -102, 56, -92], recv: [27, -102, 36, -64] }[pose || "down"];
    var Lm = pose === "recv" ? [-27, -102, -58, -92] : [-27, -102, -36, -64];
    b += arm(Lm[0], Lm[1], Lm[2], Lm[3], top) + arm(R[0], R[1], R[2], R[3], top);
    if (girl) {
      b += `<path d="M-27 -110 L27 -110 L36 -36 L-36 -36 Z" fill="${top}"${S}/>`;
      [[-12, -92], [10, -86], [-6, -66], [18, -60], [-22, -52], [4, -46]].forEach(function (d) { b += `<circle cx="${d[0]}" cy="${d[1]}" r="3.2" fill="#fff"/>`; });
    } else {
      b += `<path d="M-27 -108 Q-27 -114 -20 -114 L20 -114 Q27 -114 27 -108 L27 -64 L-27 -64 Z" fill="${top}"${S}/>`;
    }
    b += `<circle cx="0" cy="-138" r="27" fill="${SKIN}"${S}/>`;
    if (girl) {
      b += `<path d="M-26 -140 C-44 -126 -40 -106 -35 -96" fill="none" stroke="${hair}" stroke-width="11" stroke-linecap="round"/><circle cx="-35" cy="-93" r="6" fill="#e63946"${S}/>`;
      b += `<path d="M26 -140 C44 -126 40 -106 35 -96" fill="none" stroke="${hair}" stroke-width="11" stroke-linecap="round"/><circle cx="35" cy="-93" r="6" fill="#e63946"${S}/>`;
    }
    b += `<path d="M-28 -138 C-31 -174 31 -174 28 -138 C20 -154 -20 -154 -28 -138 Z" fill="${hair}"${S}/>`;
    b += face(-136, mood || "happy");
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }

  /* GULLU: the talking clay piggy jar */
  function gullu(x, y, s) {
    var P = "#f28482", b = "";
    b += `<ellipse cx="-18" cy="-6" rx="9" ry="6" fill="${P}"${S}/><ellipse cx="18" cy="-6" rx="9" ry="6" fill="${P}"${S}/>`;
    b += `<path d="M-26 -50 L-36 -78 L-8 -58 Z" fill="${P}"${S}/><path d="M26 -50 L36 -78 L8 -58 Z" fill="${P}"${S}/>`;
    b += `<ellipse cx="0" cy="-32" rx="40" ry="30" fill="${P}"${S}/>`;
    b += `<rect x="-11" y="-64" width="22" height="5" rx="2.5" fill="${INK}"/>`;
    b += `<circle cx="-15" cy="-40" r="3.4" fill="${INK}"/><circle cx="15" cy="-40" r="3.4" fill="${INK}"/>`;
    b += `<circle cx="-28" cy="-28" r="5" fill="#e76f6c" opacity=".8"/><circle cx="28" cy="-28" r="5" fill="#e76f6c" opacity=".8"/>`;
    b += `<ellipse cx="0" cy="-27" rx="12" ry="9" fill="#f9b9b7"${S}/><circle cx="-4.5" cy="-27" r="1.8" fill="${INK}"/><circle cx="4.5" cy="-27" r="1.8" fill="${INK}"/>`;
    b += `<path d="M-9 -13 Q0 -6 9 -13" fill="none"${S}/>`;
    b += `<path d="M24 -56 L29 -48 L24 -43" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }

  /* AAJI: grandmother */
  function aaji(x, y, s, flip, pose) {
    var M = "#8c2f39", b = "";
    b += `<ellipse cx="-14" cy="-4" rx="12" ry="5" fill="#8d5a3b"${S}/><ellipse cx="14" cy="-4" rx="12" ry="5" fill="#8d5a3b"${S}/>`;
    b += arm(-32, -98, -40, -60, M);
    b += arm(32, -98, pose === "give" ? 64 : 40, pose === "give" ? -86 : -60, M);
    b += `<path d="M-30 -112 L30 -112 L44 -8 L-44 -8 Z" fill="${M}"${S}/>`;
    b += `<path d="M-30 -112 L8 -112 L30 -60 L-4 -50 Z" fill="#b5485a"${S}/>`;
    b += `<path d="M-41 -22 L41 -22 L44 -8 L-44 -8 Z" fill="#fff"${S}/>`;
    b += `<circle cx="0" cy="-134" r="25" fill="${SKIN}"${S}/>`;
    b += `<circle cx="0" cy="-166" r="11" fill="#c9c9d6"${S}/><path d="M-26 -134 C-28 -166 28 -166 26 -134 C16 -148 -16 -148 -26 -134 Z" fill="#c9c9d6"${S}/>`;
    b += face(-132, "happy");
    b += `<circle cx="-9" cy="-134" r="8.5" fill="#fff" fill-opacity=".45"${S}/><circle cx="9" cy="-134" r="8.5" fill="#fff" fill-opacity=".45"${S}/><line x1="-1" y1="-134" x2="1" y2="-134" stroke="${INK}" stroke-width="2.5"/>`;
    b += `<circle cx="0" cy="-149" r="2.6" fill="#e63946"/>`;
    return T(`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`, b);
  }

  /* KAKA: shopkeeper, drawn from the counter top (y) upwards, arms out to hold baskets */
  function kaka(x, y, s) {
    var b = "";
    b += arm(-30, -82, -66, -60, "#fff") + arm(30, -82, 66, -60, "#fff");
    b += `<path d="M-38 -96 Q-38 -102 -30 -102 L30 -102 Q38 -102 38 -96 L38 0 L-38 0 Z" fill="#fff"${S}/>`;
    b += `<path d="M-36 -98 L-14 -98 L38 -32 L38 -54 Z" fill="#f4a261"${S}/>`;
    b += `<circle cx="0" cy="-124" r="27" fill="${SKIN}"${S}/>`;
    b += `<path d="M-27 -126 C-29 -160 29 -160 27 -126 C18 -142 -18 -142 -27 -126 Z" fill="${HAIR}"${S}/>`;
    b += `<circle cx="-10" cy="-128" r="3" fill="${INK}"/><circle cx="10" cy="-128" r="3" fill="${INK}"/>`;
    b += `<circle cx="-18" cy="-118" r="4.5" fill="#f4a6a0" opacity=".85"/><circle cx="18" cy="-118" r="4.5" fill="#f4a6a0" opacity=".85"/>`;
    b += `<path d="M-7 -108 Q0 -101 7 -108" fill="none"${S}/>`;
    b += `<path d="M-18 -116 Q-9 -126 0 -118 Q9 -126 18 -116 Q9 -111 0 -114 Q-9 -111 -18 -116 Z" fill="${HAIR}"${S}/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }

  /* PROPS */
  function note(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-24" y="-12" width="48" height="24" rx="3" fill="#b7e4a0"${S}/><circle r="7" fill="#8fce73"${S}/><rect x="-19" y="-7" width="8" height="4" fill="#8fce73"/><rect x="11" y="3" width="8" height="4" fill="#8fce73"/>`); }
  function balloon(x, y, s, c) { return T(`translate(${x} ${y}) scale(${s})`, `<line x1="0" y1="26" x2="0" y2="72" stroke="${INK}" stroke-width="2"/><ellipse rx="18" ry="23" fill="${c}"${S}/><path d="M-4 25 L4 25 L0 31 Z" fill="${c}"${S}/><ellipse cx="-7" cy="-8" rx="3" ry="6" fill="#fff" opacity=".6"/>`); }
  function jalebi(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="16" fill="#f9a825"${S}/><circle r="10" fill="none" stroke="#c76b00" stroke-width="3"/><circle r="4" fill="#c76b00"/>`); }
  function car(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-28 4 L-26 -8 L-14 -10 L-6 -22 L12 -22 L20 -10 L28 -8 L28 4 Z" fill="#e63946"${S}/><path d="M-4 -19 L11 -19 L16 -10 L-8 -10 Z" fill="#bde0fe"${S}/><circle cx="-14" cy="6" r="7" fill="${INK}"/><circle cx="16" cy="6" r="7" fill="${INK}"/><circle cx="-14" cy="6" r="2.5" fill="#fff"/><circle cx="16" cy="6" r="2.5" fill="#fff"/>`); }
  function notebook(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-15" y="-19" width="30" height="38" rx="3" fill="#3a86ff"${S}/><rect x="-9" y="-11" width="18" height="12" rx="2" fill="#fff"/><line x1="-9" y1="8" x2="9" y2="8" stroke="#fff" stroke-width="2"/><line x1="-9" y1="13" x2="5" y2="13" stroke="#fff" stroke-width="2"/>`); }
  function pencil(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-4" y="-22" width="8" height="38" fill="#ffd23f"${S}/><path d="M-4 16 L4 16 L0 25 Z" fill="#f1c9a0"${S}/><rect x="-4" y="-28" width="8" height="7" fill="#f4a6a0"${S}/>`); }
  function bread(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<ellipse rx="22" ry="12" fill="#e3a857"${S}/><path d="M-10 -8 L-6 6 M0 -10 L2 8 M10 -8 L12 6" stroke="#b67a2e" stroke-width="2" fill="none" stroke-linecap="round"/>`); }
  function bottle(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-9" y="-14" width="18" height="30" rx="4" fill="#fff"${S}/><rect x="-6" y="-21" width="12" height="8" rx="2" fill="#3a86ff"${S}/><rect x="-2" y="-8" width="4" height="14" fill="#e63946"/><rect x="-7" y="-3" width="14" height="4" fill="#e63946"/>`); }
  function lolly(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<line x1="0" y1="8" x2="0" y2="36" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle r="13" fill="#ff70a6"${S}/><circle r="6" fill="none" stroke="#fff" stroke-width="2.5"/>`); }
  function coin(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="10" fill="#ffd23f"${S}/><circle r="5.5" fill="none" stroke="#e0a800" stroke-width="2.5"/>`); }
  function spark(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z" fill="#ffd23f"${S.replace('stroke-width="3"', 'stroke-width="2"')}/>`); }
  function basket(x, y, s, kind) {
    var rim = kind === "need" ? "#5cb85c" : "#ff70a6", it = "";
    if (kind === "need") it = notebook(-20, -30, 0.65, -8) + bottle(-1, -30, 0.7) + pencil(14, -32, 0.65, 10) + bread(26, -22, 0.5);
    else it = car(-14, -26, 0.6) + lolly(10, -42, 0.8) + balloon(26, -52, 0.5, "#4cc9f0");
    return T(`translate(${x} ${y}) scale(${s})`, it +
      `<path d="M-30 -14 L30 -14 L24 18 L-24 18 Z" fill="#c58b4e"${S}/><path d="M-27 -2 L27 -2 M-25 8 L25 8" stroke="#a06a35" stroke-width="2.5"/><rect x="-34" y="-21" width="68" height="9" rx="4.5" fill="${rim}"${S}/>`);
  }
  function stall(cx, y, a, c) {
    var o = `<rect x="${cx - 50}" y="${y - 64}" width="5" height="${64}" fill="#8d5a3b"${S}/><rect x="${cx + 45}" y="${y - 64}" width="5" height="64" fill="#8d5a3b"${S}/>`;
    o += `<rect x="${cx - 56}" y="${y}" width="112" height="46" fill="#c58b4e"${S}/><rect x="${cx - 60}" y="${y - 5}" width="120" height="9" rx="3" fill="#e0a86a"${S}/>`;
    o += `<path d="M${cx - 64} ${y - 100} L${cx + 64} ${y - 100} L${cx + 72} ${y - 64} L${cx - 72} ${y - 64} Z" fill="${a}"${S}/>`;
    for (var i = 0; i < 4; i++) { var x0 = cx - 64 + i * 32 + 16; o += `<path d="M${x0} ${y - 100} L${x0 + 16} ${y - 100} L${x0 + 18} ${y - 64} L${x0 - 2} ${y - 64} Z" fill="${c}"/>`; }
    for (var j = 0; j < 5; j++) o += `<circle cx="${cx - 58 + j * 29}" cy="${y - 64}" r="8" fill="${j % 2 ? c : a}"${S}/>`;
    return o;
  }
  function bunting(y) {
    var cols = ["#e63946", "#ffd23f", "#3a86ff", "#2a9d8f", "#ff70a6"], o = `<path d="M-20 ${y} Q200 ${y + 22} 420 ${y}" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
    for (var i = 0; i < 11; i++) { var x = i * 38, yy = y + 11 * Math.sin((x / 400) * Math.PI) + 4; o += `<path d="M${x} ${yy} L${x + 22} ${yy} L${x + 11} ${yy + 24} Z" fill="${cols[i % 5]}"${S.replace('stroke-width="3"', 'stroke-width="2"')}/>`; }
    return o;
  }
  function ferris(cx, cy, r, base) {
    var o = `<path d="M${cx - r * 0.5} ${base} L${cx} ${cy} L${cx + r * 0.5} ${base}" fill="none" stroke="#6c5b7b" stroke-width="4" stroke-linecap="round"/>`;
    o += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#6c5b7b" stroke-width="4"/>`;
    var cols = ["#e63946", "#ffd23f", "#3a86ff", "#2a9d8f", "#ff70a6", "#f4a261", "#9b5de5", "#4cc9f0"];
    for (var i = 0; i < 8; i++) {
      var a = (i * Math.PI) / 4, px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
      o += `<line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#6c5b7b" stroke-width="2.5"/><circle cx="${px}" cy="${py}" r="${r * 0.13}" fill="${cols[i]}"${S.replace('stroke-width="3"', 'stroke-width="2"')}/>`;
    }
    return o + `<circle cx="${cx}" cy="${cy}" r="5" fill="#6c5b7b"/>`;
  }
  function tent(x, y, w, c) { return `<path d="M${x} ${y} L${x + w / 2} ${y - w * 0.6} L${x + w} ${y} Z" fill="${c}"${S.replace('stroke-width="3"', 'stroke-width="2"')}/>`; }
  function house(x, y, w, h) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f2d6a2"${S}/><path d="M${x - 10} ${y} L${x + w / 2} ${y - 52} L${x + w + 10} ${y} Z" fill="#b5543a"${S}/>` +
      `<rect x="${x + w - 44}" y="${y + h - 62}" width="32" height="62" rx="4" fill="#8d5a3b"${S}/><rect x="${x + 18}" y="${y + 24}" width="34" height="34" rx="3" fill="#bde0fe"${S}/><line x1="${x + 35}" y1="${y + 24}" x2="${x + 35}" y2="${y + 58}" stroke="${INK}" stroke-width="2"/><line x1="${x + 18}" y1="${y + 41}" x2="${x + 52}" y2="${y + 41}" stroke="${INK}" stroke-width="2"/>`;
  }
  function cloud(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<ellipse cx="0" cy="0" rx="30" ry="14" fill="#fff"/><ellipse cx="-18" cy="4" rx="18" ry="11" fill="#fff"/><ellipse cx="20" cy="4" rx="20" ry="11" fill="#fff"/>`); }
  var sky = (c, h) => `<rect x="-400" y="-400" width="1200" height="${400 + h}" fill="${c}"/>`;
  var ground = (c, h) => `<rect x="-400" y="${h}" width="1200" height="800" fill="${c}"/>`;
  var hills = h => `<ellipse cx="60" cy="${h}" rx="190" ry="62" fill="#9bdc95"/><ellipse cx="330" cy="${h}" rx="210" ry="48" fill="#86cf86"/>`;

  var SKY = ["#bfe9ff", "#d6f0ff", "#bfe9ff", "#ffe3b3", "#ffd9a8"];
  var S2 = S.replace('stroke-width="3"', 'stroke-width="2"');
  var FONT = 'font-family="Baloo 2, Noto Sans Devanagari, Arial, sans-serif"';

  function sceneNeeds(n, g) {
    var o = "";
    if (n === 0) {
      o += sky(SKY[0], 280) + hills(280) + `<circle cx="335" cy="78" r="28" fill="#ffd23f"/>` + cloud(210, 70, 1) + cloud(80, 50, 0.8);
      o += ferris(95, 190, 62, 280) + ground("#79c86a", 280) + `<path d="M170 400 L205 280 L235 280 L300 400 Z" fill="#e9c88f" opacity=".7"/>` + bunting(18);
      o += aaji(88, 376, 0.95, false, "down") + gullu(322, 378, 0.95) + hero(205, 380, 1.2, g, "up", "happy");
      o += note(262, 184, 0.9, -12) + spark(292, 150, 1) + spark(236, 140, 0.8);
    } else if (n === 1) {
      o += sky(SKY[1], 290) + hills(290) + ferris(338, 118, 34, 290) + tent(215, 290, 50, "#e63946") + tent(262, 290, 40, "#ffd23f") + ground("#8bcf73", 290);
      o += house(10, 170, 150, 120) + `<rect x="50" y="298" width="70" height="12" rx="3" fill="#a8683a"${S}/><rect x="58" y="310" width="8" height="26" fill="#a8683a"/><rect x="104" y="310" width="8" height="26" fill="#a8683a"/>`;
      o += gullu(85, 298, 0.95) + `<path d="M36 258 Q26 270 36 282 M134 258 Q144 270 134 282" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` + spark(40, 232, 0.9) + spark(135, 228, 0.7);
      o += aaji(212, 374, 1, false, "give") + hero(325, 374, 1, g, "recv", "happy") + note(272, 284, 0.75, -8);
    } else if (n === 2) {
      o += sky(SKY[2], 250) + hills(250) + cloud(320, 50, 0.8) + ground("#8bcf73", 250) + bunting(14);
      o += stall(70, 214, "#e63946", "#fff") + stall(200, 214, "#3a86ff", "#fff") + stall(330, 214, "#2a9d8f", "#fff");
      o += car(48, 200, 0.8) + car(90, 200, 0.8) + jalebi(180, 198, 0.9) + jalebi(206, 198, 0.9) + jalebi(231, 198, 0.9);
      o += balloon(305, 176, 0.8, "#ffd23f") + balloon(332, 168, 0.8, "#ff70a6") + balloon(357, 178, 0.8, "#4cc9f0");
      o += gullu(106, 366, 0.8) + `<path d="M78 350 Q106 340 134 350 L138 392 L74 392 Z" fill="#e63946"${S}/><rect x="86" y="362" width="40" height="14" rx="4" fill="#ffd23f"${S}/>`;
      o += hero(200, 394, 1, g, "down", "think");
      o += `<circle cx="248" cy="338" r="5" fill="#fff"${S}/><circle cx="262" cy="324" r="8" fill="#fff"${S}/><ellipse cx="316" cy="300" rx="52" ry="38" fill="#fff"${S}/>` + notebook(300, 300, 0.9, -8) + pencil(332, 302, 0.9, 25);
    } else if (n === 3) {
      o += `<rect x="-400" y="-400" width="1200" height="1200" fill="${SKY[3]}"/>`;
      o += `<rect x="-400" y="128" width="1200" height="8" fill="#b9824a"/><rect x="-400" y="198" width="1200" height="8" fill="#b9824a"/>`;
      var jc = ["#e63946", "#3a86ff", "#ffd23f", "#2a9d8f", "#ff70a6", "#f4a261"];
      for (var i = 0; i < 9; i++) { o += `<rect x="${12 + i * 44}" y="${100 + (i % 2) * 6}" width="30" height="${28 - (i % 2) * 6}" rx="5" fill="${jc[i % 6]}"${S}/>`; o += `<rect x="${24 + i * 44}" y="${172 + (i % 3) * 4}" width="26" height="${26 - (i % 3) * 4}" rx="5" fill="${jc[(i + 2) % 6]}"${S}/>`; }
      o += kaka(200, 252, 1.15) + `<rect x="-400" y="250" width="1200" height="400" fill="#b9824a"/><rect x="-400" y="246" width="1200" height="12" fill="#d9a566"${S}/><path d="M-400 320 L800 320 M-400 380 L800 380" stroke="#a06a35" stroke-width="3"/>`;
      o += basket(124, 200, 1.1, "need") + basket(276, 200, 1.1, "want");
      o += gullu(350, 252, 0.9) + hero(105, 400, 1, g, "down", "wow");
    } else {
      o += `<rect x="-400" y="-400" width="1200" height="1200" fill="${SKY[4]}"/><rect x="-400" y="320" width="1200" height="400" fill="#b98150"/>`;
      o += `<rect x="40" y="70" width="90" height="90" rx="4" fill="#2a3d66"${S}/><circle cx="96" cy="102" r="15" fill="#fff3b0"/><circle cx="62" cy="92" r="2" fill="#fff"/><circle cx="76" cy="136" r="2" fill="#fff"/><circle cx="112" cy="140" r="2" fill="#fff"/><line x1="85" y1="70" x2="85" y2="160" stroke="${INK}" stroke-width="3"/><line x1="40" y1="115" x2="130" y2="115" stroke="${INK}" stroke-width="3"/>`;
      o += `<rect x="150" y="290" width="12" height="75" fill="#a8683a"${S}/><rect x="368" y="290" width="12" height="75" fill="#a8683a"${S}/><rect x="140" y="276" width="250" height="14" rx="3" fill="#c07a44"${S}/>`;
      o += gullu(236, 276, 1) + notebook(318, 256, 1, 6);
      o += aaji(338, 398, 0.78, true, "give") + jalebi(288, 331, 0.7);
      o += hero(165, 398, 1.1, g, "high", "happy") + coin(224, 196, 0.9) + `<path d="M216 176 L216 184 M232 176 L232 184" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>` + spark(262, 190, 0.8) + spark(205, 166, 0.7);
    }
    return o;
  }


  /* ---------- New cast and props for books 2 to 5 ---------- */

  /* DIDI: the bank clerk (Meena Didi), drawn from the counter top upwards */
  function didi(x, y, s) {
    var b = "";
    b += arm(-30, -84, -50, -8, "#2a9d8f") + arm(30, -84, 50, -8, "#2a9d8f");
    b += `<path d="M-36 -96 Q-36 -102 -28 -102 L28 -102 Q36 -102 36 -96 L36 0 L-36 0 Z" fill="#2a9d8f"${S}/>`;
    b += `<path d="M-34 -98 L-8 -98 L36 -34 L36 -62 Z" fill="#f4a261"${S}/>`;
    b += `<rect x="8" y="-74" width="20" height="13" rx="2" fill="#fff"${S2}/><line x1="12" y1="-68" x2="24" y2="-68" stroke="${INK}" stroke-width="1.8"/>`;
    b += `<circle cx="0" cy="-124" r="27" fill="${SKIN}"${S}/>`;
    b += `<circle cx="0" cy="-163" r="13" fill="${HAIR}"${S}/><path d="M-27 -126 C-29 -160 29 -160 27 -126 C18 -142 -18 -142 -27 -126 Z" fill="${HAIR}"${S}/>`;
    b += `<circle cx="-10" cy="-128" r="3" fill="${INK}"/><circle cx="10" cy="-128" r="3" fill="${INK}"/>`;
    b += `<circle cx="-18" cy="-118" r="4.5" fill="#f4a6a0" opacity=".85"/><circle cx="18" cy="-118" r="4.5" fill="#f4a6a0" opacity=".85"/>`;
    b += `<path d="M-9 -112 Q0 -103 9 -112 Z" fill="#fff"${S}/>`;
    b += `<circle cx="0" cy="-141" r="2.8" fill="#e63946"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }

  function football(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="24" fill="#fff"${S}/><path d="M0 -9 L9 -2 L5 9 L-5 9 L-9 -2 Z" fill="${INK}"${S2}/><path d="M0 -9 L0 -23 M9 -2 L21 -8 M5 9 L13 20 M-5 9 L-13 20 M-9 -2 L-21 -8" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`); }
  function oldball(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<ellipse rx="25" ry="16" fill="#c9a27a"${S}/><path d="M-16 -6 L-7 -1 M6 -10 L11 -1 M-9 9 L1 5" stroke="#8d5a3b" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="-6" y="-5" width="13" height="9" rx="2" fill="#e9d3a8"${S2}/>`); }
  function tag(x, y, s, txt) { return T(`translate(${x} ${y}) rotate(-8) scale(${s})`, `<path d="M-32 -15 L18 -15 L34 0 L18 15 L-32 15 Z" fill="#fff3b0"${S}/><circle cx="22" cy="0" r="3" fill="${INK}"/><text x="-6" y="6" text-anchor="middle" font-size="17" font-weight="700" ${FONT} fill="${INK}">${txt}</text>`); }
  function bubble(cx, cy, rx, ry, tx, ty) {
    var bx = cx, by = cy + ry;
    function d(t) { return [tx + (bx - tx) * t, ty + (by - ty) * t]; }
    var a = d(0.2), b = d(0.55);
    return `<circle cx="${a[0]}" cy="${a[1]}" r="5" fill="#fff"${S2}/><circle cx="${b[0]}" cy="${b[1]}" r="8" fill="#fff"${S2}/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff"${S}/>`;
  }
  function coinStack(x, y, s, n) {
    var o = "";
    for (var i = 0; i < n; i++) o += `<rect x="-15" y="${-(i + 1) * 6}" width="30" height="6" fill="#ffd23f"${S2}/>`;
    o += `<ellipse cx="0" cy="${-n * 6}" rx="15" ry="5" fill="#ffe37a"${S2}/>`;
    return T(`translate(${x} ${y}) scale(${s})`, o);
  }
  function calendar(x, y, s, k) {
    var o = `<rect x="-34" y="-40" width="68" height="80" rx="6" fill="#fff"${S}/><path d="M-34 -34 Q-34 -40 -28 -40 L28 -40 Q34 -40 34 -34 L34 -20 L-34 -20 Z" fill="#e63946"${S}/><circle cx="-18" cy="-42" r="3.5" fill="${INK}"/><circle cx="18" cy="-42" r="3.5" fill="${INK}"/>`;
    for (var i = 0; i < 9; i++) {
      var cx = -20 + (i % 3) * 20, cy = -4 + Math.floor(i / 3) * 17;
      o += i < k ? `<path d="M${cx - 6} ${cy} l4.5 6 l9 -12" fill="none" stroke="#2e9a3a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>` : `<rect x="${cx - 6}" y="${cy - 6}" width="12" height="12" rx="2" fill="#efe6cf"/>`;
    }
    return T(`translate(${x} ${y}) scale(${s})`, o);
  }
  function bank(x, y, s) {
    var b = `<rect x="-112" y="-10" width="224" height="10" fill="#d9d9e3"${S}/><rect x="-102" y="-20" width="204" height="10" fill="#e6e6ee"${S}/>`;
    b += `<rect x="-92" y="-112" width="184" height="92" fill="#f6e7c8"${S}/>`;
    [-72, -46, 46, 72].forEach(function (cx) { b += `<rect x="${cx - 8}" y="-108" width="16" height="86" fill="#fffaf0"${S2}/>`; });
    b += `<path d="M-17 -20 L-17 -58 Q0 -78 17 -58 L17 -20 Z" fill="#8d5a3b"${S}/><line x1="0" y1="-70" x2="0" y2="-20" stroke="${INK}" stroke-width="2"/>`;
    b += `<rect x="-104" y="-124" width="208" height="14" fill="#e9c88f"${S}/><path d="M-108 -124 L0 -168 L108 -124 Z" fill="#b5543a"${S}/>`;
    b += `<circle cx="0" cy="-140" r="14" fill="#ffd23f"${S2}/><text x="0" y="-134" text-anchor="middle" font-size="18" font-weight="700" ${FONT} fill="${INK}">₹</text>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function passbook(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-17" y="-22" width="34" height="44" rx="3" fill="#2a9d8f"${S}/><circle cy="-5" r="10" fill="#ffd23f"${S2}/><text y="0" text-anchor="middle" font-size="13" font-weight="700" ${FONT} fill="${INK}">₹</text><rect x="-10" y="11" width="20" height="4" rx="2" fill="#fff"/>`); }
  function stamp(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-16" y="-7" width="32" height="9" rx="2" fill="#8d5a3b"${S}/><rect x="-5" y="-26" width="10" height="19" rx="4" fill="#e63946"${S}/><rect x="-10" y="-32" width="20" height="8" rx="3" fill="#e63946"${S}/>`); }
  function lock(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-9 -4 L-9 -14 Q-9 -27 0 -27 Q9 -27 9 -14 L9 -4" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><rect x="-15" y="-6" width="30" height="24" rx="5" fill="#ffd23f"${S}/><circle cy="4" r="3.5" fill="${INK}"/><rect x="-1.5" y="4" width="3" height="8" fill="${INK}"/>`); }
  function phone(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-14" y="-23" width="28" height="46" rx="5" fill="${INK}"/><rect x="-11" y="-18" width="22" height="32" rx="2" fill="#bde0fe"/><text y="-1" text-anchor="middle" font-size="10" font-weight="700" ${FONT} fill="${INK}">4 8 2</text><circle cy="18" r="2" fill="#fff"/>`); }
  function card(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-25" y="-16" width="50" height="32" rx="4" fill="#3a86ff"${S}/><rect x="-18" y="-8" width="13" height="10" rx="2" fill="#ffd23f"/><line x1="-18" y1="9" x2="17" y2="9" stroke="#fff" stroke-width="2.5"/>`); }
  function nametag(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-23" y="-17" width="46" height="34" rx="4" fill="#fff"${S}/><circle cx="-10" cy="-3" r="5.5" fill="${SKIN}"${S2}/><path d="M-18 12 Q-10 0 -2 12 Z" fill="#3a86ff"/><line x1="5" y1="-6" x2="18" y2="-6" stroke="${INK}" stroke-width="2.5"/><line x1="5" y1="3" x2="15" y2="3" stroke="${INK}" stroke-width="2.5"/>`); }
  function clock(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="22" fill="#fff"${S}/><path d="M0 0 L0 -14 M0 0 L10 6" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle r="2.5" fill="${INK}"/>`); }
  function trunk(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-44" y="-50" width="88" height="50" rx="5" fill="#4a6fa5"${S}/><path d="M-44 -50 Q0 -80 44 -50 Z" fill="#5b82bb"${S}/><rect x="-44" y="-28" width="88" height="6" fill="#2f4d7a"/>` + lock(0, -24, 0.85)); }
  function envelope(x, y, s, col, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-26" y="-18" width="52" height="36" rx="4" fill="#fffaf0"${S}/><path d="M-26 -18 L0 3 L26 -18 Z" fill="${col}"${S}/><path d="M-25 17 L-8 0 M25 17 L8 0" stroke="${INK}" stroke-width="2" fill="none"/>`); }
  function cot(x, y, w) {
    var o = `<rect x="${x + 8}" y="${y + 24}" width="9" height="34" fill="#a8683a"${S}/><rect x="${x + w - 17}" y="${y + 24}" width="9" height="34" fill="#a8683a"${S}/>`;
    o += `<rect x="${x}" y="${y}" width="${w}" height="24" rx="5" fill="#d9a566"${S}/>`;
    for (var i = 1; i < w / 14; i++) o += `<line x1="${x + i * 14}" y1="${y + 3}" x2="${x + i * 14}" y2="${y + 21}" stroke="#a06a35" stroke-width="1.8"/>`;
    return o + `<line x1="${x + 4}" y1="${y + 12}" x2="${x + w - 4}" y2="${y + 12}" stroke="#a06a35" stroke-width="1.8"/>`;
  }
  function cooker(x, y, s, broken) {
    var b = `<path d="M-34 0 L-34 -46 Q-34 -50 -30 -50 L30 -50 Q34 -50 34 -46 L34 0 Z" fill="#c4cad2"${S}/><rect x="34" y="-40" width="22" height="9" rx="4" fill="${INK}"/><rect x="-56" y="-40" width="22" height="9" rx="4" fill="${INK}"/>`;
    if (broken) {
      b += `<g transform="translate(8 -8) rotate(14)"><path d="M-36 -50 Q-36 -78 0 -78 Q36 -78 36 -50 Z" fill="#d8dde3"${S}/><circle cx="0" cy="-84" r="6" fill="${INK}"/></g>`;
      b += `<path d="M-6 -48 L4 -30 L-3 -20 L6 -4" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      b += `<path d="M-36 -50 Q-36 -78 0 -78 Q36 -78 36 -50 Z" fill="#d8dde3"${S}/><circle cx="0" cy="-84" r="6" fill="${INK}"/>`;
    }
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function puff(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<ellipse rx="18" ry="12" fill="#e9ecef"${S2}/><ellipse cx="-14" cy="6" rx="12" ry="9" fill="#e9ecef"${S2}/><ellipse cx="14" cy="6" rx="13" ry="9" fill="#e9ecef"${S2}/>`); }
  function mango(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<ellipse rx="9" ry="12" fill="#ffb703"${S2}/><path d="M0 -12 Q6 -20 12 -16 Q6 -10 0 -12 Z" fill="#2e9a3a"${S2}/><ellipse cx="-3" cy="-3" rx="2" ry="4" fill="#fff" opacity=".5"/>`); }
  function coinFruit(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="10" fill="#ffd23f"${S2}/><circle r="5.5" fill="none" stroke="#e0a800" stroke-width="2.2"/>`); }
  function mangoTree(x, y, s, kind, n) {
    var b = `<path d="M-15 0 L-10 -92 L10 -92 L15 0 Z" fill="#8d5a3b"${S}/><path d="M-3 -10 L-2 -70 M6 -22 L5 -60" stroke="#6b4129" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    b += `<circle cx="-48" cy="-118" r="50" fill="#4f9d4f"${S}/><circle cx="48" cy="-118" r="50" fill="#4f9d4f"${S}/><circle cx="0" cy="-160" r="56" fill="#5fb85f"${S}/><circle cx="0" cy="-112" r="46" fill="#5fb85f"${S}/>`;
    var P = [[-62, -126], [-28, -154], [20, -182], [52, -146], [-6, -124], [34, -100], [-46, -92], [72, -112], [-8, -170]];
    for (var i = 0; i < (n || 0) && i < P.length; i++) {
      var k = kind === "mix" ? (i % 2 ? "coin" : "mango") : kind;
      b += k === "coin" ? coinFruit(P[i][0], P[i][1], 1) : mango(P[i][0], P[i][1], 1, (i * 25) % 40 - 20);
    }
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function seed(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<ellipse rx="14" ry="8" fill="#c9a06a"${S}/><path d="M-9 0 Q0 -4 9 0" stroke="#a07a45" stroke-width="2" fill="none"/>`); }
  function chalkboard(x, y, w, h, lines, size) {
    var o = `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="8" fill="#2f6f4f" stroke="#8d5a3b" stroke-width="8"/>`;
    var gap = h / (lines.length + 1);
    lines.forEach(function (t, i) { o += `<text x="${x}" y="${y - h / 2 + gap * (i + 1) + (size || 28) * 0.35}" text-anchor="middle" font-size="${size || 28}" font-weight="700" ${FONT} fill="#fff">${t}</text>`; });
    return o;
  }
  function counterFront(y) {
    return `<rect x="-400" y="${y}" width="1200" height="400" fill="#b9824a"/><rect x="-400" y="${y - 6}" width="1200" height="14" fill="#d9a566"${S}/><path d="M-400 ${y + 70} L800 ${y + 70}" stroke="#a06a35" stroke-width="3"/>`;
  }
  var room = (wall, fy, floor) => `<rect x="-400" y="-400" width="1200" height="1200" fill="${wall}"/><rect x="-400" y="${fy}" width="1200" height="800" fill="${floor}"/><rect x="-400" y="${fy - 4}" width="1200" height="8" fill="#00000026"/>`;
  function goal(x, y, w, h) {
    var d = `M${x} ${y} L${x} ${y - h} L${x + w} ${y - h} L${x + w} ${y}`, net = "";
    for (var i = 1; i < 5; i++) net += `M${x + (w / 5) * i} ${y - h} L${x + (w / 5) * i} ${y} `;
    for (var j = 1; j < 3; j++) net += `M${x} ${y - (h / 3) * j} L${x + w} ${y - (h / 3) * j} `;
    return `<path d="${net}" stroke="#fff" stroke-opacity=".75" stroke-width="1.5" fill="none"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  function window2(x, y, w, h, night) {
    var o = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${night ? "#2a3d66" : "#bde0fe"}"${S}/>`;
    if (night) o += `<circle cx="${x + w * 0.62}" cy="${y + h * 0.35}" r="${w * 0.17}" fill="#fff3b0"/><circle cx="${x + w * 0.2}" cy="${y + h * 0.25}" r="2" fill="#fff"/><circle cx="${x + w * 0.35}" cy="${y + h * 0.8}" r="2" fill="#fff"/>`;
    else o += `<circle cx="${x + w * 0.68}" cy="${y + h * 0.32}" r="${w * 0.16}" fill="#ffd23f"/>`;
    return o + `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${INK}" stroke-width="3"/><line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="${INK}" stroke-width="3"/>`;
  }
  function sweat(x, y) { return `<path d="M${x} ${y} q6 10 0 16 q-6 -6 0 -16 Z" fill="#4cc9f0"${S2}/>`; }

  /* ---------- BOOK 2: The Big Wish (piggy-jar) ---------- */
  function sceneWish(n, g) {
    var o = "";
    var FR = { top: "#e63946", low: "#8d5a3b" }, FR2 = { top: "#9b5de5", low: "#2a9d8f" };
    if (n === 0) {
      o += sky("#bfe9ff", 280) + hills(280) + `<circle cx="338" cy="72" r="28" fill="#ffd23f"/>` + cloud(205, 66, 1) + cloud(78, 48, 0.8) + ground("#79c86a", 280);
      o += goal(14, 300, 96, 62);
      o += gullu(325, 380, 0.95) + coinStack(66, 392, 1, 5) + coin(358, 300, 0.8) + coin(300, 292, 0.7);
      o += hero(200, 384, 1.2, g, "up", "happy") + football(262, 172, 1.3) + spark(300, 130, 1) + spark(224, 118, 0.8) + spark(318, 188, 0.7);
    } else if (n === 1) {
      o += sky("#d6f0ff", 285) + hills(285) + cloud(318, 56, 0.9) + ground("#8bcf73", 285) + goal(292, 304, 92, 60);
      o += oldball(62, 376, 1.0);
      o += hero(135, 394, 1.1, g, "down", "think") + gullu(245, 394, 0.9);
      o += bubble(262, 112, 90, 58, 168, 206) + football(226, 108, 1.5) + tag(318, 138, 0.95, "₹200") + spark(312, 92, 0.8);
    } else if (n === 2) {
      o += sky("#e4f4ff", 250) + hills(250) + cloud(80, 50, 0.8) + ground("#8bcf73", 250);
      o += stall(292, 214, "#ff70a6", "#fff") + lolly(262, 190, 0.9) + lolly(290, 190, 0.9) + lolly(318, 190, 0.9);
      o += hero(330, 394, 1.0, "b", "up", "happy", FR) + lolly(376, 226, 0.8);
      o += hero(168, 394, 1.05, g, "down", "think") + note(214, 322, 0.6, 18);
      o += gullu(64, 394, 1.0) + `<path d="M16 346 Q6 358 16 370 M112 346 Q122 358 112 370" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` + sweat(98, 316);
    } else if (n === 3) {
      o += room("#ffe9c7", 332, "#c98f5a");
      o += `<rect x="50" y="48" width="300" height="28" rx="14" fill="#fff"${S}/><rect x="52" y="50" width="146" height="24" rx="12" fill="#7bd88f"/><line x1="200" y1="40" x2="200" y2="84" stroke="${INK}" stroke-width="3"/>`;
      o += `<text x="50" y="106" font-size="20" font-weight="700" ${FONT} fill="${INK}">0</text><text x="200" y="106" text-anchor="middle" font-size="20" font-weight="700" ${FONT} fill="${INK}">100</text><text x="350" y="106" text-anchor="end" font-size="20" font-weight="700" ${FONT} fill="${INK}">200</text>`;
      o += football(374, 62, 0.8) + calendar(334, 190, 1.15, 5);
      o += `<rect x="120" y="300" width="270" height="12" rx="3" fill="#a8683a"${S}/><rect x="130" y="312" width="9" height="58" fill="#a8683a"/><rect x="370" y="312" width="9" height="58" fill="#a8683a"/>`;
      [150, 186, 222, 258, 294].forEach(function (x) { o += coinStack(x, 300, 1, 4); });
      o += gullu(352, 300, 0.78);
      o += hero(66, 398, 1.1, g, "up", "happy") + spark(110, 190, 0.9) + spark(150, 150, 0.7);
    } else {
      o += sky("#bfe9ff", 285) + hills(285) + `<circle cx="344" cy="66" r="26" fill="#ffd23f"/>` + cloud(210, 54, 0.9) + ground("#79c86a", 285) + goal(8, 300, 92, 60);
      o += gullu(58, 396, 0.8);
      o += hero(140, 394, 1.15, g, "up", "happy") + football(196, 176, 1.25);
      o += hero(276, 394, 1.0, "b", "high", "happy", FR) + hero(338, 394, 0.92, "g", "up", "happy", FR2);
      o += spark(250, 120, 1) + spark(320, 110, 0.8) + spark(196, 110, 0.7) + `<circle cx="122" cy="120" r="4" fill="#ff70a6"/><circle cx="270" cy="82" r="4" fill="#4cc9f0"/><circle cx="366" cy="130" r="4" fill="#e63946"/>`;
    }
    return o;
  }

  /* ---------- BOOK 3: Inside a Bank ---------- */
  function sceneBank(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(70, 56, 0.9) + cloud(330, 80, 0.8) + ground("#8bcf73", 300);
      o += `<path d="M-50 400 L150 300 L250 300 L450 400 Z" fill="#e9c88f" opacity=".8"/>` + bank(200, 306, 1.2);
      o += hero(104, 394, 1.1, g, "up", "happy") + passbook(156, 214, 1.1, 12) + spark(190, 180, 0.9);
      o += gullu(205, 396, 0.85) + aaji(306, 394, 0.95, true, "give");
    } else if (n === 1) {
      o += sky("#d6f0ff", 292) + hills(292) + cloud(80, 54, 0.9) + ground("#8bcf73", 292);
      o += mangoTree(36, 306, 0.5, "mango", 4) + bank(326, 308, 0.62);
      o += `<rect x="-400" y="318" width="1200" height="120" fill="#e9c88f"/><path d="M-400 318 L800 318" stroke="${INK}" stroke-width="3"/>`;
      o += aaji(64, 396, 0.95, false, "down") + hero(176, 396, 1.05, g, "down", "happy");
      o += gullu(236, 366, 0.78) + sweat(268, 306) + sweat(204, 292);
    } else if (n === 2) {
      o += room("#e6f2ff", 334, "#d9c7a0");
      o += clock(334, 78, 1.1) + `<circle cx="78" cy="102" r="34" fill="#ffd23f"${S}/><text x="78" y="118" text-anchor="middle" font-size="46" font-weight="700" ${FONT} fill="${INK}">₹</text>`;
      o += didi(214, 264, 1.15) + passbook(256, 246, 0.8, 8) + stamp(172, 250, 1);
      o += counterFront(264);
      o += hero(96, 402, 1.1, g, "down", "wow") + aaji(334, 402, 0.9, true, "down");
    } else if (n === 3) {
      o += room("#e6f2ff", 334, "#d9c7a0");
      o += clock(60, 70, 1.0) + `<rect x="120" y="40" width="80" height="48" rx="6" fill="#fff"${S}/><circle cx="144" cy="64" r="10" fill="#ffd23f"${S2}/><line x1="162" y1="58" x2="188" y2="58" stroke="${INK}" stroke-width="3"/><line x1="162" y1="70" x2="182" y2="70" stroke="${INK}" stroke-width="3"/>`;
      o += didi(296, 264, 1.15) + stamp(352, 250, 1) + passbook(250, 246, 0.8, -8);
      o += counterFront(264);
      o += gullu(176, 266, 0.85) + coinStack(222, 262, 1, 5) + coinStack(124, 262, 1, 3) + spark(176, 190, 0.9);
      o += hero(70, 402, 1.1, g, "give", "happy");
    } else {
      o += `<rect x="-400" y="-400" width="1200" height="1200" fill="#ffd9a8"/><rect x="-400" y="320" width="1200" height="400" fill="#b98150"/>`;
      o += window2(40, 66, 90, 90, true);
      o += trunk(340, 384, 1.05);
      o += hero(112, 398, 1.1, g, "high", "happy") + passbook(168, 190, 1.0, -10) + spark(206, 168, 0.8) + spark(132, 150, 0.7);
      o += gullu(204, 398, 0.8) + aaji(262, 398, 0.85, false, "give") + passbook(314, 324, 0.7, 20);
    }
    return o;
  }

  /* ---------- BOOK 4: The Four Envelopes (family-budget) ---------- */
  function sceneBudget(n, g) {
    var o = "";
    var EC = ["#e63946", "#3a86ff", "#2a9d8f", "#ff70a6"];
    if (n === 0) {
      o += sky("#bfe9ff", 280) + hills(280) + `<circle cx="340" cy="74" r="28" fill="#ffd23f"/>` + cloud(60, 90, 0.8) + ground("#79c86a", 280);
      o += `<path d="M170 400 L205 280 L235 280 L300 400 Z" fill="#e9c88f" opacity=".7"/>`;
      o += envelope(86, 112, 1.2, EC[0], -14) + envelope(160, 76, 1.2, EC[1], -5) + envelope(240, 76, 1.2, EC[2], 5) + envelope(314, 112, 1.2, EC[3], 14);
      o += spark(200, 52, 1) + spark(50, 76, 0.7) + spark(356, 70, 0.8);
      o += aaji(88, 378, 0.95, false, "down") + gullu(324, 380, 0.95) + hero(205, 382, 1.2, g, "high", "happy");
    } else if (n === 1) {
      o += room("#ffe9c7", 340, "#c98f5a");
      o += window2(34, 52, 96, 86, false) + `<path d="M34 138 L130 138" stroke="${INK}" stroke-width="4"/>`;
      o += cot(104, 300, 200);
      for (var i = 0; i < 10; i++) o += note(130 + (i % 5) * 36, 304 + Math.floor(i / 5) * 9, 0.62, (i % 3 - 1) * 8);
      o += gullu(284, 300, 0.7);
      o += aaji(58, 398, 1.0, false, "give") + hero(344, 398, 1.05, g, "down", "think");
      o += bubble(236, 120, 80, 46, 332, 214) + note(206, 112, 0.9, -6) + note(246, 118, 0.9, 6) + `<text x="226" y="150" text-anchor="middle" font-size="26" font-weight="700" ${FONT} fill="${INK}">?</text>`;
    } else if (n === 2) {
      o += room("#fff1d6", 328, "#c98f5a");
      o += window2(160, 46, 80, 70, false);
      o += hero(84, 322, 0.95, g, "give", "happy") + aaji(326, 322, 0.9, true, "down");
      o += bread(140, 214, 1.2) + notebook(188, 212, 1.0, -6) + coin(234, 214, 1.5) + balloon(280, 198, 0.8, "#ff70a6");
      [140, 186, 232, 278].forEach(function (x, k) { o += `<line x1="${x}" y1="236" x2="${x}" y2="262" stroke="${INK}" stroke-width="2" stroke-dasharray="3 4"/>`; });
      o += `<rect x="20" y="300" width="360" height="16" rx="4" fill="#d9a566"${S}/><rect x="30" y="316" width="340" height="90" fill="#c07a44"${S}/>`;
      [140, 186, 232, 278].forEach(function (x, k) { o += envelope(x, 282, 0.92, EC[k], (k - 1.5) * 3); });
    } else if (n === 3) {
      o += room("#fde8c8", 332, "#b98150");
      o += `<rect x="236" y="120" width="140" height="8" rx="3" fill="#a8683a"${S}/>` + `<ellipse cx="270" cy="104" rx="20" ry="16" fill="#8d8d99"${S}/><ellipse cx="318" cy="108" rx="16" ry="12" fill="#c58b4e"${S}/>` + gullu(352, 122, 0.55);
      o += `<rect x="96" y="298" width="150" height="106" fill="#8d8d99"${S}/><rect x="96" y="290" width="150" height="14" rx="3" fill="#b8bfc7"${S}/>`;
      o += cooker(168, 292, 1.25, true) + puff(150, 170, 1.0) + puff(190, 140, 1.2) + puff(222, 176, 0.8);
      o += hero(46, 398, 1.1, g, "down", "wow");
      o += aaji(328, 398, 0.95, true, "give") + envelope(268, 312, 1.0, "#2a9d8f", -8) + spark(300, 262, 0.8);
    } else {
      o += `<rect x="-400" y="-400" width="1200" height="1200" fill="#ffd9a8"/><rect x="-400" y="320" width="1200" height="400" fill="#b98150"/>`;
      o += window2(34, 66, 90, 90, true) + calendar(344, 128, 1.1, 9);
      o += `<rect x="150" y="290" width="12" height="75" fill="#a8683a"${S}/><rect x="368" y="290" width="12" height="75" fill="#a8683a"${S}/><rect x="140" y="276" width="250" height="14" rx="3" fill="#c07a44"${S}/>`;
      o += envelope(300, 262, 0.8, EC[0], -6) + envelope(336, 262, 0.8, EC[1], 6);
      o += gullu(262, 276, 1) + aaji(352, 398, 0.78, true, "down");
      o += hero(150, 398, 1.1, g, "high", "happy") + coin(244, 190, 0.9) + `<path d="M236 170 L236 178 M252 170 L252 178" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>` + spark(290, 188, 0.8) + spark(200, 160, 0.7);
    }
    return o;
  }

  /* ---------- BOOK 5: The Money Tree (what-is-interest) ---------- */
  function sceneInterest(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 280) + hills(280) + `<circle cx="342" cy="66" r="26" fill="#ffd23f"/>` + cloud(60, 60, 0.8) + ground("#79c86a", 280);
      o += mangoTree(214, 318, 1.2, "mix", 9);
      o += hero(84, 392, 1.1, g, "up", "happy") + gullu(334, 392, 0.95) + coin(318, 300, 0.8) + coin(300, 340, 0.7) + spark(130, 190, 0.9) + spark(350, 244, 0.7);
    } else if (n === 1) {
      o += sky("#d6f0ff", 290) + hills(290) + cloud(300, 50, 0.9) + ground("#8bcf73", 290);
      o += mangoTree(74, 318, 1.0, "mango", 7);
      o += kaka(318, 300, 1.0) + `<rect x="240" y="300" width="170" height="110" fill="#c07a44"${S}/><rect x="234" y="294" width="182" height="12" rx="3" fill="#e0a86a"${S}/>`;
      o += mango(268, 284, 1.2, -10) + mango(294, 288, 1.2, 8) + mango(346, 288, 1.2, -6) + mango(372, 284, 1.2, 12);
      o += gullu(118, 396, 0.75);
      o += hero(172, 396, 1.1, g, "up", "wow") + seed(228, 222, 1.2, -20) + spark(206, 194, 0.8);
    } else if (n === 2) {
      o += room("#e6f2ff", 334, "#d9c7a0");
      o += chalkboard(150, 128, 220, 104, ["₹100", "+ ₹5"], 34);
      o += didi(318, 264, 1.15) + passbook(262, 246, 0.8, 8);
      o += counterFront(264);
      o += coinStack(196, 262, 1, 8) + coinStack(228, 262, 1, 1) + spark(232, 232, 0.8) + gullu(120, 266, 0.7);
      o += hero(70, 402, 1.05, g, "down", "wow");
    } else if (n === 3) {
      o += room("#e8f1e0", 336, "#c9a46a");
      o += chalkboard(222, 138, 280, 168, ["₹1000", "+ ₹50", "= ₹1050"], 34);
      o += `<line x1="150" y1="168" x2="294" y2="168" stroke="#fff" stroke-width="3"/>`;
      o += hero(66, 398, 1.1, g, "high", "happy") + gullu(340, 398, 0.9) + spark(310, 262, 0.8);
    } else {
      o += sky("#bfe9ff", 290) + hills(290) + `<circle cx="346" cy="60" r="26" fill="#ffd23f"/>` + cloud(70, 56, 0.9) + ground("#79c86a", 290);
      o += mangoTree(206, 322, 1.35, "mix", 9);
      o += hero(80, 396, 1.1, g, "high", "happy") + aaji(334, 396, 0.9, true, "down") + gullu(272, 398, 0.8);
      o += coin(262, 330, 0.8) + coin(290, 290, 0.7) + spark(120, 170, 0.8) + spark(350, 196, 0.7);
    }
    return o;
  }

  var SCENES = { "needs-vs-wants": sceneNeeds, "piggy-jar": sceneWish, "inside-a-bank": sceneBank, "family-budget": sceneBudget, "what-is-interest": sceneInterest };
  var SKIES = {
    "needs-vs-wants": ["#bfe9ff", "#d6f0ff", "#bfe9ff", "#ffe3b3", "#ffd9a8"],
    "piggy-jar": ["#bfe9ff", "#d6f0ff", "#e4f4ff", "#ffe9c7", "#bfe9ff"],
    "inside-a-bank": ["#bfe9ff", "#d6f0ff", "#e6f2ff", "#e6f2ff", "#ffd9a8"],
    "family-budget": ["#bfe9ff", "#ffe9c7", "#fff1d6", "#fde8c8", "#ffd9a8"],
    "what-is-interest": ["#bfe9ff", "#d6f0ff", "#e6f2ff", "#e8f1e0", "#bfe9ff"]
  };

  /* Art.scene(n, gender, slug): n = 0 (cover) to 4. Returns an SVG string. */
  function scene(n, g, slug) {
    var f = SCENES[slug || "needs-vs-wants"] || sceneNeeds;
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block;overflow:visible" aria-hidden="true">${f(n, g)}</svg>`;
  }
  function skyOf(slug) { return SKIES[slug || "needs-vs-wants"] || SKIES["needs-vs-wants"]; }

  /* Small avatar for the setup screen */
  function avatar(g, w) {
    return `<svg viewBox="-50 -185 100 195" xmlns="http://www.w3.org/2000/svg" style="width:${w || 70}px;height:${Math.round((w || 70) * 1.86)}px" aria-hidden="true">${hero(0, 0, 1, g, "down", "happy")}</svg>`;
  }

  /* Head and shoulders only, for the small "your hero" button */
  function headshot(g, w) {
    return `<svg viewBox="-48 -184 96 96" xmlns="http://www.w3.org/2000/svg" style="width:${w || 40}px;height:${w || 40}px;display:block" aria-hidden="true">${hero(0, 0, 1, g, "down", "happy")}</svg>`;
  }

  /* Small icons for the sorting quizzes */
  function prop(name) {
    var m = {
      notebook: notebook(0, 0, 1.3), car: car(0, 2, 0.95), bottle: bottle(0, 2, 1.35), balloon: balloon(0, -10, 0.62, "#ff70a6"), bread: bread(0, 4, 1.35),
      coin: coin(0, 0, 1.9), lolly: lolly(0, -6, 1.0), jalebi: jalebi(0, 0, 1.6), football: football(0, 0, 1.3), calendar: calendar(0, 0, 0.8, 5),
      lock: lock(0, 4, 1.3), phone: phone(0, 0, 1.2), card: card(0, 0, 1.2), nametag: nametag(0, 0, 1.3), passbook: passbook(0, 0, 1.2),
      bank: bank(0, 26, 0.29), note: note(0, 0, 1.3), envelope: envelope(0, 0, 1.1, "#e63946"), seed: seed(0, 0, 2.2), tree: mangoTree(0, 32, 0.28, "mango", 5), mango: mango(0, 0, 1.8)
    };
    return `<svg viewBox="-34 -34 68 68" xmlns="http://www.w3.org/2000/svg" style="width:52px;height:52px;flex:none" aria-hidden="true">${m[name] || ""}</svg>`;
  }

  window.Art = { scene: scene, avatar: avatar, headshot: headshot, prop: prop, sky: skyOf };
})();
