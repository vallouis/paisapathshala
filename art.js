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
  function hero(x, y, s, gender, pose, mood) {
    var girl = gender === "g";
    var top = girl ? "#ffd23f" : "#3a86ff";
    var low = girl ? "#3a86ff" : "#8d5a3b";
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
      b += `<path d="M-26 -140 C-44 -126 -40 -106 -35 -96" fill="none" stroke="${HAIR}" stroke-width="11" stroke-linecap="round"/><circle cx="-35" cy="-93" r="6" fill="#e63946"${S}/>`;
      b += `<path d="M26 -140 C44 -126 40 -106 35 -96" fill="none" stroke="${HAIR}" stroke-width="11" stroke-linecap="round"/><circle cx="35" cy="-93" r="6" fill="#e63946"${S}/>`;
    }
    b += `<path d="M-28 -138 C-31 -174 31 -174 28 -138 C20 -154 -20 -154 -28 -138 Z" fill="${HAIR}"${S}/>`;
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

  function scene(n, g) {
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
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block;overflow:visible" aria-hidden="true">${o}</svg>`;
  }

  /* Small avatar for the setup screen */
  function avatar(g) {
    return `<svg viewBox="-50 -185 100 195" xmlns="http://www.w3.org/2000/svg" style="width:70px;height:130px" aria-hidden="true">${hero(0, 0, 1, g, "down", "happy")}</svg>`;
  }

  window.Art = { scene: scene, avatar: avatar, sky: SKY };
})();
