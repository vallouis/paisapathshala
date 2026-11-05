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
  function kaka(x, y, s, mood) {
    var b = "";
    b += arm(-30, -82, -66, -60, "#fff") + arm(30, -82, 66, -60, "#fff");
    b += `<path d="M-38 -96 Q-38 -102 -30 -102 L30 -102 Q38 -102 38 -96 L38 0 L-38 0 Z" fill="#fff"${S}/>`;
    b += `<path d="M-36 -98 L-14 -98 L38 -32 L38 -54 Z" fill="#f4a261"${S}/>`;
    b += `<circle cx="0" cy="-124" r="27" fill="${SKIN}"${S}/>`;
    b += `<path d="M-27 -126 C-29 -160 29 -160 27 -126 C18 -142 -18 -142 -27 -126 Z" fill="${HAIR}"${S}/>`;
    b += `<circle cx="-10" cy="-128" r="3" fill="${INK}"/><circle cx="10" cy="-128" r="3" fill="${INK}"/>`;
    b += `<circle cx="-18" cy="-118" r="4.5" fill="#f4a6a0" opacity=".85"/><circle cx="18" cy="-118" r="4.5" fill="#f4a6a0" opacity=".85"/>`;
    b += mood === "sad" ? `<path d="M-7 -104 Q0 -111 7 -104" fill="none"${S}/><path d="M-16 -137 L-5 -133 M16 -137 L5 -133" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>` : `<path d="M-7 -108 Q0 -101 7 -108" fill="none"${S}/>`;
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
  function tag(x, y, s, txt, fs) { return T(`translate(${x} ${y}) rotate(-8) scale(${s})`, `<path d="M-32 -15 L18 -15 L34 0 L18 15 L-32 15 Z" fill="#fff3b0"${S}/><circle cx="22" cy="0" r="3" fill="${INK}"/><text x="-6" y="${(fs || 17) * 0.35}" text-anchor="middle" font-size="${fs || 17}" font-weight="700" ${FONT} fill="${INK}">${txt}</text>`); }
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

  /* ---------- New props and cast for books 6 to 10 ---------- */
  function samosa(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<path d="M-22 14 L0 -22 L22 14 Z" fill="#e0a143"${S}/><path d="M-9 0 Q0 4 9 0" stroke="#b67a2e" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="-6" cy="8" r="2" fill="#b67a2e"/><circle cx="6" cy="7" r="2" fill="#b67a2e"/>`); }
  function upArrow(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-10 10 L-10 -2 L-19 -2 L0 -24 L19 -2 L10 -2 L10 10 Z" fill="#e63946"${S2}/>`); }
  function sack(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-26 0 Q-34 -32 -15 -46 L-9 -56 L9 -56 L15 -46 Q34 -32 26 0 Z" fill="#e9d3a8"${S}/><path d="M-10 -47 Q0 -42 10 -47" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M-12 -18 Q0 -12 12 -18" stroke="#b79a63" stroke-width="2.2" fill="none"/>`); }
  function cylinder(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-20" y="-62" width="40" height="62" rx="16" fill="#e63946"${S}/><rect x="-9" y="-76" width="18" height="14" rx="3" fill="${INK}"/><rect x="-20" y="-38" width="40" height="7" fill="#fff" opacity=".55"/><ellipse cx="-9" cy="-48" rx="3" ry="7" fill="#fff" opacity=".45"/>`); }
  function oilTin(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-17" y="-44" width="34" height="44" rx="5" fill="#ffd23f"${S}/><rect x="-6" y="-54" width="12" height="11" rx="2" fill="#8d5a3b"${S}/><path d="M0 -34 q7 10 0 16 q-7 -6 0 -16 Z" fill="#fff"${S2}/>`); }
  function onion(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-3 -18 Q0 -30 4 -19" fill="none" stroke="#6b8e3a" stroke-width="3" stroke-linecap="round"/><path d="M0 -20 Q-22 -8 -16 6 Q-8 15 0 15 Q8 15 16 6 Q22 -8 0 -20 Z" fill="#c1445f"${S2}/><path d="M-4 -14 Q-9 0 -4 12 M5 -14 Q9 0 4 12" stroke="#8f2d43" stroke-width="1.8" fill="none"/>`); }
  function rainCloud(x, y, s, drops) {
    var o = `<ellipse cx="0" cy="0" rx="34" ry="16" fill="#9aa5b8"/><ellipse cx="-20" cy="5" rx="20" ry="12" fill="#9aa5b8"/><ellipse cx="22" cy="5" rx="22" ry="12" fill="#9aa5b8"/>`;
    for (var i = 0; i < (drops || 0); i++) o += `<line x1="${-30 + i * 14}" y1="${22 + (i % 2) * 8}" x2="${-36 + i * 14}" y2="${40 + (i % 2) * 8}" stroke="#4cc9f0" stroke-width="3" stroke-linecap="round"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, o);
  }
  function rain(x0, y0, w, h, gap) {
    var o = "";
    for (var yy = y0, r = 0; yy < y0 + h; yy += gap, r++) for (var xx = x0 + (r % 2) * gap / 2; xx < x0 + w; xx += gap) o += `<line x1="${xx}" y1="${yy}" x2="${xx - 5}" y2="${yy + 13}" stroke="#4cc9f0" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>`;
    return o;
  }
  function sun(x, y, r) {
    var o = "";
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; o += `<line x1="${x + Math.cos(a) * (r + 6)}" y1="${y + Math.sin(a) * (r + 6)}" x2="${x + Math.cos(a) * (r + 18)}" y2="${y + Math.sin(a) * (r + 18)}" stroke="#ffb703" stroke-width="5" stroke-linecap="round"/>`; }
    return o + `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd23f"${S}/>`;
  }
  function shield(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M0 -28 L24 -19 L24 4 Q24 21 0 30 Q-24 21 -24 4 L-24 -19 Z" fill="#2a9d8f"${S}/><path d="M-10 2 L-3 10 L11 -8" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); }
  function fox(x, y, s) {
    var b = `<path d="M-26 -14 L-24 -42 L-6 -24 Z" fill="#f08a24"${S}/><path d="M26 -14 L24 -42 L6 -24 Z" fill="#f08a24"${S}/>`;
    b += `<path d="M-28 -16 Q0 -32 28 -16 Q30 8 0 30 Q-30 8 -28 -16 Z" fill="#f08a24"${S}/>`;
    b += `<path d="M-27 0 Q-12 2 0 29 Q-27 10 -27 0 Z" fill="#fff"/><path d="M27 0 Q12 2 0 29 Q27 10 27 0 Z" fill="#fff"/>`;
    b += `<path d="M-17 -6 L-6 -2 M17 -6 L6 -2" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/><circle cx="-11" cy="1" r="2.6" fill="${INK}"/><circle cx="11" cy="1" r="2.6" fill="${INK}"/>`;
    b += `<ellipse cx="0" cy="22" rx="4.5" ry="3.5" fill="${INK}"/><path d="M-9 14 Q0 22 9 14" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function callPhone(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-17" y="-28" width="34" height="56" rx="6" fill="${INK}"/><rect x="-13" y="-22" width="26" height="40" rx="3" fill="#ffe0e0"/>` + fox(0, -2, 0.42) + `<circle cy="23" r="2.2" fill="#fff"/><path d="M-26 -10 Q-32 0 -26 10 M26 -10 Q32 0 26 10" fill="none" stroke="#e63946" stroke-width="3" stroke-linecap="round"/>`); }
  function phoneT(x, y, s, txt) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-17" y="-28" width="34" height="56" rx="6" fill="${INK}"/><rect x="-13" y="-22" width="26" height="40" rx="3" fill="#bde0fe"/><text y="2" text-anchor="middle" font-size="12" font-weight="700" ${FONT} fill="${INK}">${txt}</text><circle cy="23" r="2.2" fill="#fff"/>`); }
  function otpMsg(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-34" y="-20" width="68" height="40" rx="8" fill="#fff"${S}/><path d="M-16 20 L-22 30 L-6 20 Z" fill="#fff"${S2}/><text y="-3" text-anchor="middle" font-size="11" font-weight="700" ${FONT} fill="${INK}">OTP</text><text y="13" text-anchor="middle" font-size="15" font-weight="700" ${FONT} fill="#3a86ff">4 8 2 1</text>`); }
  function noSign(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="26" fill="none" stroke="#e63946" stroke-width="6"/><line x1="-18" y1="-18" x2="18" y2="18" stroke="#e63946" stroke-width="6" stroke-linecap="round"/>`); }
  function stopSign(x, y, s) {
    var pts = [];
    for (var i = 0; i < 8; i++) { var a = Math.PI / 8 + i * Math.PI / 4; pts.push((Math.cos(a) * 38).toFixed(1) + " " + (Math.sin(a) * 38).toFixed(1)); }
    return T(`translate(${x} ${y}) scale(${s})`, `<path d="M${pts.join(" L")} Z" fill="#e63946"${S}/><rect x="-13" y="-4" width="26" height="22" rx="7" fill="#fff"/><rect x="-13" y="-22" width="6" height="22" rx="3" fill="#fff"/><rect x="-5" y="-26" width="6" height="26" rx="3" fill="#fff"/><rect x="3" y="-24" width="6" height="24" rx="3" fill="#fff"/><rect x="11" y="-18" width="5" height="20" rx="2.5" fill="#fff"/>`);
  }
  function qr(x, y, s) {
    var o = `<rect x="-24" y="-24" width="48" height="48" rx="4" fill="#fff"${S}/>`, g = 6, ox = -18, oy = -18;
    function f(cx, cy) { return `<rect x="${ox + cx * g}" y="${oy + cy * g}" width="${g * 3}" height="${g * 3}" fill="${INK}"/><rect x="${ox + cx * g + 3}" y="${oy + cy * g + 3}" width="${g * 3 - 6}" height="${g * 3 - 6}" fill="#fff"/><rect x="${ox + cx * g + 6}" y="${oy + cy * g + 6}" width="${g * 3 - 12}" height="${g * 3 - 12}" fill="${INK}"/>`; }
    o += f(0, 0) + f(3, 0) + f(0, 3);
    [[3, 3], [4, 4], [5, 3], [3, 5], [5, 5], [4, 2], [2, 4], [1, 5], [5, 1]].forEach(function (c) { o += `<rect x="${ox + c[0] * g}" y="${oy + c[1] * g}" width="${g - 1}" height="${g - 1}" fill="${INK}"/>`; });
    return T(`translate(${x} ${y}) scale(${s})`, o);
  }
  function bush(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<ellipse cx="0" cy="0" rx="48" ry="26" fill="#4f9d4f"${S}/><ellipse cx="-30" cy="6" rx="26" ry="18" fill="#5fb85f"${S}/><ellipse cx="30" cy="6" rx="26" ry="18" fill="#5fb85f"${S}/>`); }

  /* money lender (neutral, not a villain): cream kurta, brown vest, glasses, ledger in hand */
  function lender(x, y, s) {
    var b = "";
    b += arm(-30, -82, -58, -50, "#e9d3a8") + arm(30, -82, 58, -50, "#e9d3a8");
    b += `<path d="M-38 -96 Q-38 -102 -30 -102 L30 -102 Q38 -102 38 -96 L38 0 L-38 0 Z" fill="#e9d3a8"${S}/>`;
    b += `<path d="M-36 -98 L-8 -98 L-12 0 L-38 0 Z" fill="#8d5a3b"${S}/><path d="M36 -98 L8 -98 L12 0 L38 0 Z" fill="#8d5a3b"${S}/>`;
    b += `<circle cx="0" cy="-124" r="27" fill="${SKIN}"${S}/>`;
    b += `<path d="M-27 -128 C-29 -158 29 -158 27 -128 C18 -142 -18 -142 -27 -128 Z" fill="#8b8b99"${S}/>`;
    b += `<circle cx="-10" cy="-126" r="7" fill="#fff" fill-opacity=".5" stroke="${INK}" stroke-width="2"/><circle cx="10" cy="-126" r="7" fill="#fff" fill-opacity=".5" stroke="${INK}" stroke-width="2"/><line x1="-3" y1="-126" x2="3" y2="-126" stroke="${INK}" stroke-width="2"/>`;
    b += `<circle cx="-10" cy="-126" r="2.4" fill="${INK}"/><circle cx="10" cy="-126" r="2.4" fill="${INK}"/>`;
    b += `<circle cx="-18" cy="-114" r="4.5" fill="#f4a6a0" opacity=".8"/><circle cx="18" cy="-114" r="4.5" fill="#f4a6a0" opacity=".8"/>`;
    b += `<path d="M-6 -106 Q0 -102 6 -106" fill="none"${S}/><path d="M-14 -112 Q-7 -118 0 -113 Q7 -118 14 -112 Q7 -108 0 -110 Q-7 -108 -14 -112 Z" fill="#8b8b99"${S2}/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function ledger(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-24" y="-17" width="48" height="34" rx="3" fill="#b5543a"${S}/><rect x="-19" y="-12" width="38" height="24" rx="2" fill="#fffaf0"/><line x1="0" y1="-12" x2="0" y2="12" stroke="${INK}" stroke-width="2"/><path d="M-15 -5 H-4 M-15 1 H-4 M-15 7 H-4 M4 -5 H15 M4 1 H15 M4 7 H15" stroke="#9aa0b4" stroke-width="2"/>`); }
  function paper(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-17" y="-22" width="34" height="44" rx="2" fill="#fff"${S}/><path d="M-9 -12 H9 M-9 -5 H9 M-9 2 H5" stroke="#9aa0b4" stroke-width="2.4"/><path d="M-9 12 l3 3 l7 -7" fill="none" stroke="#2e9a3a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`); }
  function bucket(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-22 -34 L22 -34 L17 0 L-17 0 Z" fill="#9aa5b8"${S}/><ellipse cx="0" cy="-34" rx="22" ry="6" fill="#4cc9f0"${S2}/><path d="M-22 -34 Q0 -66 22 -34" fill="none" stroke="${INK}" stroke-width="3"/>`); }
  function drop(x, y, s) { return T(`translate(${x} ${y}) scale(${s || 1})`, `<path d="M0 -9 Q9 4 0 10 Q-9 4 0 -9 Z" fill="#4cc9f0"${S2}/>`); }
  /* balance scales. theta > 0 means the right side is lower. contentL/contentR are drawn at each pan. */
  function scales(x, y, s, theta, contentL, contentR) {
    var L = 64, a = theta * Math.PI / 180, ay = -118;
    var rx = L * Math.cos(a), ry = ay + L * Math.sin(a), lx = -rx, ly = ay - L * Math.sin(a);
    var b = `<path d="M-30 0 L30 0 L18 -12 L-18 -12 Z" fill="#8d5a3b"${S}/><rect x="-5" y="-${-ay}" width="10" height="${-ay - 12}" fill="#a8683a"${S}/>`;
    b += `<line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="#d9a566" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="${ay}" r="7" fill="#ffd23f"${S}/>`;
    [[lx, ly, contentL], [rx, ry, contentR]].forEach(function (p) {
      var px = p[0], py = p[1] + 44;
      b += `<path d="M${px} ${p[1]} L${px - 28} ${py} M${px} ${p[1]} L${px + 28} ${py}" stroke="${INK}" stroke-width="2" fill="none"/>`;
      b += `<path d="M${px - 32} ${py} L${px + 32} ${py} Q${px + 26} ${py + 14} ${px} ${py + 14} Q${px - 26} ${py + 14} ${px - 32} ${py} Z" fill="#d9a566"${S}/>`;
      b += T(`translate(${px} ${py - 1})`, p[2] || "");
    });
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function umbrella(x, y, s, c, pole) {
    var b = `<line x1="0" y1="0" x2="0" y2="${pole}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    b += `<path d="M-60 0 Q-60 -50 0 -54 Q60 -50 60 0 Q45 -13 30 0 Q15 -13 0 0 Q-15 -13 -30 0 Q-45 -13 -60 0 Z" fill="${c}"${S}/>`;
    b += `<path d="M0 -54 Q-22 -26 -30 0 M0 -54 Q22 -26 30 0 M0 -54 L0 0" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/><circle cx="0" cy="-56" r="3" fill="${INK}"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function pot(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<ellipse cx="0" cy="-30" rx="38" ry="32" fill="#d9763a"${S}/><rect x="-18" y="-72" width="36" height="14" rx="4" fill="#d9763a"${S}/><ellipse cx="0" cy="-72" rx="18" ry="5" fill="#8d4a22"${S2}/><path d="M-34 -36 Q0 -24 34 -36" stroke="#f9c784" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-30 -20 Q0 -8 30 -20" stroke="#f9c784" stroke-width="3" fill="none" stroke-linecap="round"/>`); }
  function clipboard(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-20" y="-26" width="40" height="52" rx="4" fill="#a8683a"${S}/><rect x="-15" y="-19" width="30" height="40" rx="2" fill="#fff"/><rect x="-8" y="-31" width="16" height="9" rx="3" fill="#8d96a3"${S2}/><path d="M-10 -8 H10 M-10 0 H10 M-10 8 H4" stroke="#9aa0b4" stroke-width="2.2"/>`); }
  function policy(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-22" y="-30" width="44" height="60" rx="3" fill="#fff"${S}/><path d="M0 -24 L12 -19 L12 -8 Q12 0 0 5 Q-12 0 -12 -8 L-12 -19 Z" fill="#2a9d8f"${S2}/><path d="M-5 -10 L-1 -6 L6 -15" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M-14 12 H14 M-14 18 H14 M-14 24 H4" stroke="#9aa0b4" stroke-width="2"/>`); }
  function magnifier(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<line x1="0" y1="14" x2="0" y2="38" stroke="#8d5a3b" stroke-width="8" stroke-linecap="round"/><circle cx="0" cy="-6" r="19" fill="#d8f1ff" fill-opacity=".7"${S}/><path d="M-10 -14 Q-6 -20 2 -20" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`); }
  function officer(x, y, s) {
    var b = "";
    b += `<rect x="-18" y="-60" width="15" height="56" rx="5" fill="#2f3e5c"${S}/><rect x="3" y="-60" width="15" height="56" rx="5" fill="#2f3e5c"${S}/>`;
    b += `<ellipse cx="-11" cy="-3" rx="13" ry="6" fill="${INK}"${S}/><ellipse cx="11" cy="-3" rx="13" ry="6" fill="${INK}"${S}/>`;
    b += arm(-27, -102, -34, -66, "#6c8ebf") + arm(27, -102, 44, -80, "#6c8ebf");
    b += `<path d="M-27 -110 Q-27 -114 -20 -114 L20 -114 Q27 -114 27 -110 L27 -60 L-27 -60 Z" fill="#6c8ebf"${S}/>`;
    b += `<path d="M-6 -114 L6 -114 L3 -78 L0 -72 L-3 -78 Z" fill="#e63946"${S2}/><rect x="10" y="-98" width="12" height="16" rx="2" fill="#fff"${S2}/>`;
    b += `<circle cx="0" cy="-138" r="27" fill="${SKIN}"${S}/><path d="M-28 -140 C-30 -172 30 -172 28 -140 C22 -154 -10 -156 -28 -140 Z" fill="${HAIR}"${S}/>`;
    b += face(-136, "happy");
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function water(y, a) {
    var d = `M-400 ${y}`;
    for (var xx = -400; xx < 800; xx += 40) d += ` q10 -9 20 0 t20 0`;
    d += ` L800 800 L-400 800 Z`;
    return `<path d="${d}" fill="#4cc9f0" fill-opacity="${a || 0.6}"/><path d="M0 ${y + 18} q15 -7 30 0 M120 ${y + 30} q15 -7 30 0 M250 ${y + 16} q15 -7 30 0 M340 ${y + 34} q15 -7 30 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/>`;
  }
  function wheat(x, y, s) {
    var b = `<path d="M0 30 L0 -10" stroke="#a07a45" stroke-width="3" stroke-linecap="round"/>`;
    for (var i = 0; i < 5; i++) { b += `<ellipse cx="-6" cy="${-8 - i * 8}" rx="5" ry="3" transform="rotate(-35 -6 ${-8 - i * 8})" fill="#e9b949"${S2}/><ellipse cx="6" cy="${-12 - i * 8}" rx="5" ry="3" transform="rotate(35 6 ${-12 - i * 8})" fill="#e9b949"${S2}/>`; }
    return T(`translate(${x} ${y}) scale(${s})`, b + `<ellipse cx="0" cy="-50" rx="4" ry="6" fill="#e9b949"${S2}/>`);
  }
  function plusSign(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-22" y="-22" width="44" height="44" rx="9" fill="#fff"${S}/><path d="M-4 -14 H4 V-4 H14 V4 H4 V14 H-4 V4 H-14 V-4 H-4 Z" fill="#e63946"/>`); }
  function houseIcon(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-20" y="-6" width="40" height="30" fill="#f2d6a2"${S}/><path d="M-26 -6 L0 -28 L26 -6 Z" fill="#b5543a"${S}/><rect x="-6" y="8" width="12" height="16" fill="#8d5a3b"${S2}/>`); }
  function glassJar(x, y, s, n) {
    var b = `<rect x="-27" y="-92" width="54" height="14" rx="5" fill="#e63946"${S}/>`;
    b += `<path d="M-30 -78 L30 -78 L30 -10 Q30 0 20 0 L-20 0 Q-30 0 -30 -10 Z" fill="#e8f6ff" fill-opacity=".85"${S}/>`;
    for (var i = 0; i < (n || 0); i++) {
      var cx = -20 + (i % 4) * 13.4 + (Math.floor(i / 4) % 2) * 6, cy = -10 - Math.floor(i / 4) * 11;
      if (cy < -70) break;
      b += `<ellipse cx="${cx}" cy="${cy}" rx="9.5" ry="6" fill="#ffd23f"${S2}/>`;
    }
    b += `<circle cx="0" cy="-44" r="14" fill="#fff"${S2}/><path d="M-3 -54 H3 V-47 H10 V-41 H3 V-34 H-3 V-41 H-10 V-47 H-3 Z" fill="#e63946"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function tin(x, y, s, open) {
    var b = `<rect x="-26" y="-34" width="52" height="34" rx="6" fill="#e63946"${S}/>`;
    b += open ? `<path d="M-26 -34 L-20 -52 L26 -58 L26 -34 Z" fill="#c92f3b"${S}/><rect x="-18" y="-40" width="14" height="8" rx="2" fill="#b7e4a0"${S2}/><rect x="2" y="-42" width="16" height="9" rx="2" fill="#b7e4a0"${S2}/>` : `<rect x="-28" y="-44" width="56" height="12" rx="5" fill="#c92f3b"${S}/>`;
    b += `<circle cx="0" cy="-16" r="10" fill="#fff"${S2}/><path d="M-2.5 -22 H2.5 V-18.5 H6 V-13.5 H2.5 V-10 H-2.5 V-13.5 H-6 V-18.5 H-2.5 Z" fill="#e63946"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function burstPipe(x, y) {
    var o = `<rect x="${x - 150}" y="${y - 10}" width="300" height="20" rx="5" fill="#8d96a3"${S}/><rect x="${x - 4}" y="${y - 14}" width="14" height="28" rx="3" fill="#6d7686"${S}/><path d="M${x - 10} ${y - 10} L${x + 4} ${y - 2} L${x - 4} ${y + 4} L${x + 8} ${y + 10}" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    var sp = [[-70, 90], [-40, 126], [-12, 148], [18, 150], [46, 128], [74, 92]];
    sp.forEach(function (p, i) { o += `<path d="M${x - 2} ${y + 8} Q${x + p[0] * 0.55} ${y - 34 + (i % 2) * 6} ${x + p[0]} ${y + p[1]}" fill="none" stroke="#4cc9f0" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 9"/>`; });
    sp.forEach(function (p, i) { o += drop(x + p[0], y + p[1] - 6 - (i % 3) * 8, 0.8); });
    return o;
  }
  function wrench(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-5" y="-6" width="10" height="46" rx="5" fill="#b8bfc7"${S}/><path d="M-14 -34 L-14 -14 Q-14 -6 0 -6 Q14 -6 14 -14 L14 -34 L6 -34 L6 -22 L-6 -22 L-6 -34 Z" fill="#b8bfc7"${S}/>`); }
  /* shop front for Kaka: awning high above his head, counter in front of his body. Draw Kaka first. */
  function kiosk(cx, y, a, c) {
    var o = `<rect x="${cx - 70}" y="${y - 166}" width="5" height="${166}" fill="#8d5a3b"${S}/><rect x="${cx + 65}" y="${y - 166}" width="5" height="166" fill="#8d5a3b"${S}/>`;
    o += `<path d="M${cx - 78} ${y - 204} L${cx + 78} ${y - 204} L${cx + 84} ${y - 166} L${cx - 84} ${y - 166} Z" fill="${a}"${S}/>`;
    for (var i = 0; i < 5; i++) { var x0 = cx - 78 + i * 31.2 + 15.6; o += `<path d="M${x0} ${y - 204} L${x0 + 15.6} ${y - 204} L${x0 + 17} ${y - 166} L${x0 - 1.4} ${y - 166} Z" fill="${c}"/>`; }
    for (var j = 0; j < 6; j++) o += `<circle cx="${cx - 78 + j * 31.2}" cy="${y - 166}" r="8" fill="${j % 2 ? c : a}"${S}/>`;
    return o + `<rect x="${cx - 74}" y="${y}" width="148" height="${Math.max(30, 400 - y)}" fill="#c58b4e"${S}/><rect x="${cx - 80}" y="${y - 6}" width="160" height="10" rx="3" fill="#e0a86a"${S}/>`;
  }
  function table(x, y, w) { return `<rect x="${x}" y="${y}" width="${w}" height="12" rx="3" fill="#c07a44"${S}/><rect x="${x + 10}" y="${y + 12}" width="9" height="${400 - y - 12}" fill="#a8683a"${S}/><rect x="${x + w - 19}" y="${y + 12}" width="9" height="${400 - y - 12}" fill="#a8683a"${S}/>`; }

  /* ---------- BOOK 6: The Shrinking Rupee (why-prices-rise) ---------- */
  function sceneInflation(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 280) + hills(280) + `<circle cx="344" cy="60" r="24" fill="#ffd23f"/>` + cloud(70, 56, 0.8) + ground("#79c86a", 280);
      o += stall(312, 226, "#f4a261", "#fff") + samosa(284, 214, 1.0) + samosa(314, 214, 1.0) + samosa(344, 214, 1.0);
      o += tag(312, 96, 1.25, "₹15", 19) + upArrow(372, 88, 0.9);
      o += aaji(46, 394, 0.92, false, "down") + gullu(112, 396, 0.7) + hero(180, 394, 1.1, g, "up", "wow") + samosa(232, 214, 1.3, 8) + spark(250, 176, 0.8);
    } else if (n === 1) {
      o += sky("#d6f0ff", 285) + hills(285) + cloud(318, 50, 0.9) + ground("#8bcf73", 285);
      o += stall(326, 222, "#f4a261", "#fff") + samosa(300, 210, 0.95) + samosa(330, 210, 0.95) + tag(326, 100, 1.1, "₹15", 17) + upArrow(378, 96, 0.8);
      o += aaji(64, 396, 0.95, false, "down") + gullu(238, 396, 0.7) + hero(166, 396, 1.05, g, "down", "think");
      o += bubble(112, 96, 84, 54, 70, 214) + samosa(92, 98, 1.25) + tag(146, 112, 0.9, "₹1", 17);
    } else if (n === 2) {
      o += room("#fde8c8", 340, "#b98150");
      o += kaka(180, 274, 1.0);
      o += oilTin(262, 268, 1.0) + sack(310, 268, 0.95) + cylinder(356, 268, 0.9);
      o += upArrow(262, 186, 0.8) + upArrow(310, 180, 0.8) + upArrow(356, 166, 0.8);
      o += counterFront(274);
      o += bottle(80, 268, 1.0) + coin(110, 262, 0.8);
      o += hero(50, 402, 1.05, g, "down", "think");
    } else if (n === 3) {
      o += sky("#ffe9c7", 300) + sun(70, 70, 34) + ground("#d9b77a", 300);
      o += `<path d="M0 316 L40 330 L28 350 L70 362 M120 322 L100 346 L130 362 M30 380 L74 372" stroke="#8d6a3a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      o += `<path d="M24 324 Q26 304 34 296 M92 336 Q96 316 104 310" stroke="#a89a4a" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      o += stall(318, 232, "#3a86ff", "#fff") + onion(296, 222, 1.2) + onion(324, 224, 1.2) + onion(352, 222, 1.2);
      o += tag(318, 100, 1.3, "₹80", 19) + upArrow(378, 94, 0.9);
      o += gullu(262, 398, 0.72) + hero(180, 394, 1.1, g, "down", "wow") + sweat(214, 244);
    } else {
      o += room("#e8f1e0", 336, "#c9a46a");
      o += chalkboard(200, 112, 320, 112, ["₹100 → ₹105"], 40);
      o += `<ellipse cx="62" cy="372" rx="46" ry="20" fill="#ff9fb8"${S}/><ellipse cx="50" cy="366" rx="9" ry="6" fill="#ffd23f"${S2}/>`;
      o += hero(168, 398, 1.1, g, "high", "happy") + gullu(262, 398, 0.85) + passbook(338, 352, 1.3, -8) + spark(300, 290, 0.8) + spark(214, 220, 0.7);
    }
    return o;
  }

  /* ---------- BOOK 7: Fraud Alert (phone-scams) ---------- */
  function sceneScam(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 290) + hills(290) + `<circle cx="344" cy="60" r="24" fill="#ffd23f"/>` + cloud(80, 56, 0.8) + ground("#79c86a", 290);
      o += fox(62, 330, 1.3) + bush(62, 368, 1.0);
      o += shield(300, 150, 2.4) + spark(240, 90, 0.9) + spark(366, 220, 0.8);
      o += hero(170, 394, 1.15, g, "up", "happy") + phoneT(228, 200, 1.1, "OK") + gullu(334, 394, 0.85);
    } else if (n === 1) {
      o += room("#fff1d6", 334, "#c98f5a");
      o += window2(24, 44, 84, 76, false);
      o += aaji(96, 398, 1.0, false, "give") + callPhone(166, 266, 1.0);
      o += bubble(244, 110, 96, 58, 180, 232) + otpMsg(214, 114, 1.15) + `<text x="282" y="124" text-anchor="middle" font-size="46" font-weight="700" ${FONT} fill="#e63946">?!</text>`;
      o += gullu(264, 398, 0.8) + hero(338, 398, 1.05, g, "down", "wow") + sweat(300, 252);
    } else if (n === 2) {
      o += room("#fff1d6", 334, "#c98f5a");
      o += stopSign(306, 112, 1.9);
      o += hero(92, 398, 1.1, g, "give", "think") + callPhone(160, 270, 1.0) + noSign(160, 270, 1.35);
      o += aaji(326, 398, 0.9, true, "down") + gullu(228, 398, 0.8) + spark(222, 330, 0.7);
    } else if (n === 3) {
      o += room("#e8f1e0", 336, "#c9a46a");
      o += `<rect x="30" y="34" width="340" height="168" rx="10" fill="#2f6f4f" stroke="#8d5a3b" stroke-width="8"/>`;
      o += otpMsg(98, 106, 0.95) + noSign(98, 112, 1.5);
      o += card(200, 112, 1.3) + noSign(200, 112, 1.5);
      o += qr(302, 112, 1.2) + noSign(302, 112, 1.5);
      o += `<path d="M62 176 L338 176" stroke="#fff" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>`;
      o += hero(96, 398, 1.1, g, "high", "happy") + gullu(322, 398, 0.9);
    } else {
      o += room("#fff1d6", 334, "#c98f5a");
      o += window2(24, 44, 84, 76, false);
      o += shield(210, 118, 1.7) + spark(160, 84, 0.8) + spark(262, 78, 0.9);
      o += aaji(92, 398, 0.95, false, "down") + hero(232, 398, 1.1, g, "give", "happy") + phoneT(308, 276, 1.15, "1930");
      o += gullu(362, 398, 0.7);
      o += fox(344, 80, 0.7) + sweat(372, 62) + `<path d="M298 72 L316 72 M292 84 L312 84 M300 96 L316 96" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    return o;
  }

  /* ---------- BOOK 8: Moneylender or Bank? (moneylender-or-bank) ---------- */
  function sceneBorrow(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 296) + hills(296) + cloud(76, 52, 0.8) + cloud(316, 78, 0.7) + ground("#8bcf73", 296);
      o += `<path d="M-30 400 L150 306 L250 306 L430 400 Z" fill="#e9c88f" opacity=".8"/>`;
      o += table(18, 308, 96) + lender(64, 308, 0.8) + ledger(54, 304, 0.8) + coin(94, 300, 0.7);
      o += bank(338, 312, 0.62);
      o += hero(200, 396, 1.12, g, "down", "think") + gullu(272, 398, 0.8);
      o += bubble(200, 78, 54, 38, 200, 196) + `<text x="200" y="98" text-anchor="middle" font-size="52" font-weight="700" ${FONT} fill="${INK}">?</text>`;
    } else if (n === 1) {
      o += room("#ffe9c7", 336, "#c98f5a");
      o += `<ellipse cx="196" cy="22" rx="46" ry="22" fill="#b98150" opacity=".45"/>`;
      o += window2(270, 40, 100, 90, true) + rain(272, 44, 96, 84, 22);
      o += drop(196, 56, 1) + drop(196, 130, 1) + drop(196, 210, 1) + drop(196, 282, 1);
      o += bucket(196, 366, 1.2);
      o += aaji(62, 398, 0.95, false, "down");
      o += bubble(72, 128, 66, 42, 62, 224) + tag(72, 128, 0.95, "₹10,000", 12.5);
      o += gullu(268, 398, 0.75) + hero(336, 398, 1.05, g, "down", "think");
    } else if (n === 2) {
      o += room("#f5e1c4", 334, "#c9a46a");
      o += chalkboard(106, 112, 196, 110, ["₹500 × 12", "= ₹6,000"], 30);
      o += lender(294, 272, 1.1) + ledger(236, 262, 0.95, -4) + note(344, 262, 0.7, 8) + note(338, 258, 0.7, -6);
      o += counterFront(272);
      o += hero(60, 402, 1.08, g, "down", "wow");
    } else if (n === 3) {
      o += room("#e6f2ff", 334, "#d9c7a0");
      o += clock(344, 64, 1.0) + chalkboard(116, 112, 216, 110, ["₹10,000", "12% = ₹1,200"], 28);
      o += didi(312, 264, 1.15) + paper(246, 250, 0.95, 6) + stamp(206, 252, 1);
      o += counterFront(264);
      o += hero(66, 402, 1.08, g, "give", "happy");
    } else {
      o += sky("#bfe9ff", 296) + hills(296) + sun(346, 56, 22) + cloud(210, 50, 0.8) + ground("#79c86a", 296);
      o += house(262, 306, 118, 90) + `<path d="M252 306 L321 254 L390 306" fill="none" stroke="#ffd23f" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>`;
      o += scales(96, 392, 0.9, -14, coinStack(0, 0, 1.0, 6), coinStack(0, 0, 1.0, 1));
      o += tag(60, 252, 0.95, "₹6,000", 13) + tag(152, 232, 0.95, "₹1,200", 13);
      o += hero(232, 396, 1.0, g, "high", "happy") + spark(280, 196, 0.8);
      o += gullu(356, 398, 0.62);
    }
    return o;
  }

  /* ---------- BOOK 9: Umbrella for Rainy Days (insurance) ---------- */
  function sceneInsure(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#cfd8e8", 290) + rainCloud(80, 40, 1.3, 0) + rainCloud(330, 56, 1.1, 0) + ground("#79c86a", 290);
      o += rain(0, 70, 400, 290, 32);
      o += aaji(96, 396, 0.9, false, "down") + hero(182, 394, 1.1, g, "up", "happy") + gullu(300, 396, 0.85);
      o += umbrella(232, 150, 2.3, "#e63946", 36) + spark(120, 80, 0.7) + spark(350, 90, 0.7);
    } else if (n === 1) {
      o += sky("#cfd8e8", 280) + rainCloud(70, 38, 1.2, 0) + rainCloud(300, 50, 1.2, 0) + ground("#9dbf8a", 280);
      o += kaka(274, 252, 0.85, "sad") + kiosk(274, 252, "#f4a261", "#fff");
      o += hero(92, 398, 1.1, g, "down", "wow") + gullu(176, 398, 0.75);
      o += notebook(214, 330, 1.0, 18) + bread(332, 340, 1.0) + mango(376, 326, 1.3, 20);
      o += water(312, 0.6) + rain(0, 70, 400, 240, 30);
    } else if (n === 2) {
      o += sky("#e4f4ff", 290) + hills(290) + cloud(60, 220, 0.6) + ground("#8bcf73", 290);
      var hx = [44, 112, 180, 248, 316, 380];
      hx.forEach(function (x) { o += T(`translate(${x} 142) scale(0.5)`, house(-30, 0, 60, 44)); });
      hx.forEach(function (x, i) { o += coin(x, 190 + (i % 2) * 6, 0.7) + `<path d="M${x} ${210} Q${x + (200 - x) * 0.3} 246 ${200 + (x - 200) * 0.15} 270" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="3 5" stroke-linecap="round"/>`; });
      o += pot(200, 350, 1.5) + coin(200, 244, 0.7);
      o += tag(330, 300, 1.05, "₹2,00,000", 11);
      o += hero(58, 398, 1.0, g, "up", "happy");
    } else if (n === 3) {
      o += sky("#e4f4ff", 280) + hills(280) + cloud(300, 52, 0.9) + ground("#a9c98c", 280);
      o += kaka(104, 252, 0.85) + kiosk(104, 252, "#f4a261", "#fff");
      o += `<ellipse cx="90" cy="372" rx="70" ry="16" fill="#8d6a3a" opacity=".55"/>` + `<ellipse cx="152" cy="380" rx="30" ry="9" fill="#4cc9f0" opacity=".6"/>`;
      o += officer(246, 396, 1.0) + clipboard(296, 306, 1.0, 12);
      o += bubble(256, 78, 62, 44, 246, 196) + shield(256, 78, 1.15);
      o += hero(344, 398, 1.0, g, "down", "think") + gullu(170, 398, 0.7);
    } else {
      o += sky("#bfe9ff", 280) + hills(280) + sun(346, 56, 22) + cloud(200, 56, 0.8) + ground("#79c86a", 280);
      o += kaka(100, 252, 0.85) + kiosk(100, 252, "#f4a261", "#fff") + mango(70, 238, 1.2, -8) + mango(98, 240, 1.2, 8) + bread(130, 240, 0.9);
      o += note(206, 190, 0.8, -12) + note(246, 226, 0.8, 8) + note(166, 218, 0.8, 6) + spark(206, 156, 0.8);
      o += hero(268, 394, 1.1, g, "high", "happy") + policy(318, 188, 0.9, 10);
      o += gullu(180, 398, 0.72) + magnifier(222, 336, 0.9, 24);
    }
    return o;
  }

  /* ---------- BOOK 10: The Rainy Day Jar (emergency-fund) ---------- */
  function sceneEmergency(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 290) + hills(290) + sun(52, 58, 22) + rainCloud(318, 54, 1.2, 5) + ground("#79c86a", 290);
      o += glassJar(250, 392, 2.5, 16);
      o += hero(104, 394, 1.12, g, "high", "happy") + gullu(356, 398, 0.7) + spark(170, 150, 0.8) + spark(334, 190, 0.7);
    } else if (n === 1) {
      o += room("#ffe9c7", 336, "#c98f5a");
      o += burstPipe(200, 190);
      o += `<ellipse cx="206" cy="364" rx="116" ry="18" fill="#4cc9f0" opacity=".7"/>`;
      o += hero(66, 398, 1.1, g, "down", "wow") + gullu(300, 398, 0.78) + sweat(318, 340) + aaji(352, 398, 0.82, true, "down");
    } else if (n === 2) {
      o += room("#ffe9c7", 336, "#c98f5a");
      o += window2(24, 44, 84, 76, false);
      o += aaji(106, 398, 1.0, false, "give") + tin(184, 300, 1.15, true) + spark(204, 236, 0.8) + wrench(196, 378, 0.85, 80);
      o += hero(332, 398, 1.05, g, "down", "think") + gullu(246, 398, 0.72);
      o += bubble(286, 100, 92, 56, 322, 208) + football(264, 98, 0.95) + tag(316, 116, 0.8, "-50%", 14) + noSign(290, 100, 1.9);
    } else if (n === 3) {
      o += room("#fde8c8", 336, "#b98150");
      o += chalkboard(200, 84, 320, 90, ["₹10 × 50 = ₹500"], 30);
      o += calendar(340, 206, 0.95, 9);
      o += table(120, 300, 170) + glassJar(204, 300, 1.35, 7);
      o += hero(62, 398, 1.1, g, "give", "happy") + coin(132, 262, 0.9) + `<path d="M132 276 L132 288" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
      o += gullu(352, 398, 0.78);
    } else {
      o += room("#fde8c8", 336, "#b98150");
      o += window2(34, 40, 130, 110, true) + rain(36, 44, 126, 104, 22);
      o += glassJar(296, 396, 2.0, 22);
      o += hero(110, 398, 1.1, g, "up", "happy") + gullu(192, 398, 0.8) + spark(180, 232, 0.9) + spark(350, 216, 0.8);
    }
    return o;
  }

  /* ---------- New props for books 11 to 20 ---------- */
  function billPaper(x, y, s, r, rows) {
    var b = `<path d="M-24 -36 L24 -36 L24 32 L19 37 L13 32 L7 37 L1 32 L-5 37 L-11 32 L-17 37 L-24 32 Z" fill="#fff"${S}/><rect x="-16" y="-30" width="32" height="6" rx="2" fill="#e63946"/>`;
    if (rows) rows.forEach(function (t, i) { b += `<text x="0" y="${-8 + i * 15}" text-anchor="middle" font-size="12" font-weight="700" ${FONT} fill="${INK}">${t}</text>`; });
    else b += `<path d="M-16 -14 H16 M-16 -6 H16 M-16 2 H10 M-16 10 H16 M-16 18 H8" stroke="#9aa0b4" stroke-width="2.4"/>`;
    return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, b);
  }
  function payslip(x, y, s, r, rows) {
    var b = `<rect x="-33" y="-40" width="66" height="80" rx="3" fill="#fff"${S}/><rect x="-33" y="-40" width="66" height="10" rx="3" fill="#3a86ff"${S}/>`;
    if (rows) rows.forEach(function (t, i) { b += `<text x="0" y="${-14 + i * 16}" text-anchor="middle" font-size="11" font-weight="700" ${FONT} fill="${INK}">${t}</text>`; });
    else b += `<path d="M-22 -16 H22 M-22 -6 H22 M-22 4 H12 M-22 14 H22" stroke="#9aa0b4" stroke-width="2.4"/>`;
    return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, b);
  }
  function kite(x, y, s, r, c, notail) {
    var b = `<path d="M0 -30 L20 -4 L0 34 L-20 -4 Z" fill="${c || "#e63946"}"${S}/><path d="M0 -30 L20 -4 L0 -4 Z" fill="#fff" opacity=".35"/><path d="M0 -30 L0 34 M-20 -4 L20 -4" stroke="${INK}" stroke-width="2" fill="none"/>`;
    if (!notail) b += `<path d="M0 34 Q-10 46 0 54 Q10 62 0 72 Q-8 80 2 90" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/><path d="M-7 54 L7 54 L0 47 Z M-7 74 L7 74 L0 67 Z" fill="#ffd23f"${S2}/>`;
    return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, b);
  }
  function pie(x, y, r, n, pull) {
    var cols = ["#ffd23f", "#ff70a6", "#4cc9f0", "#b7e4a0", "#f4a261"], b = "";
    for (var i = 0; i < n; i++) {
      var a0 = -Math.PI / 2 + i * 2 * Math.PI / n, a1 = -Math.PI / 2 + (i + 1) * 2 * Math.PI / n, am = (a0 + a1) / 2, d = pull === i ? 12 : 0, ox = Math.cos(am) * d, oy = Math.sin(am) * d;
      b += `<path d="M${ox.toFixed(1)} ${oy.toFixed(1)} L${(ox + Math.cos(a0) * r).toFixed(1)} ${(oy + Math.sin(a0) * r).toFixed(1)} A${r} ${r} 0 0 1 ${(ox + Math.cos(a1) * r).toFixed(1)} ${(oy + Math.sin(a1) * r).toFixed(1)} Z" fill="${cols[i % 5]}"${S2}/>`;
    }
    return T(`translate(${x} ${y})`, b);
  }
  function cert(x, y, s, r) {
    return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-30" y="-22" width="60" height="44" rx="3" fill="#fffaf0"${S}/><rect x="-25" y="-17" width="50" height="34" rx="2" fill="none" stroke="#e0a800" stroke-width="2"/>` + kite(-4, -2, 0.36, 0, "#e63946", true) + `<path d="M8 -8 H20 M8 -1 H20 M8 6 H16" stroke="#9aa0b4" stroke-width="2.2"/><circle cx="17" cy="14" r="6" fill="#e63946"${S2}/>`);
  }
  function lemon(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<path d="M-16 0 Q-14 -13 0 -13 Q14 -13 16 0 Q14 13 0 13 Q-14 13 -16 0 Z" fill="#ffe14d"${S2}/><path d="M-16 0 L-21 -2 M16 0 L21 2" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M2 -13 Q8 -21 15 -17 Q9 -11 2 -13 Z" fill="#2e9a3a"${S2}/><ellipse cx="-5" cy="-4" rx="3.5" ry="2" fill="#fff" opacity=".65"/>`); }
  function glassDrink(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-15 -36 L15 -36 L11 0 L-11 0 Z" fill="#fff3a8" fill-opacity=".92"${S}/><path d="M-13 -26 L13 -26" stroke="#fff" stroke-width="2.4" opacity=".85"/><line x1="5" y1="-54" x2="2" y2="-14" stroke="#e63946" stroke-width="4" stroke-linecap="round"/><circle cx="-14" cy="-36" r="8.5" fill="#ffe14d"${S2}/><path d="M-20 -36 H-8 M-14 -42 V-30" stroke="#f9a825" stroke-width="1.6"/>`); }
  function coinJar(x, y, s, n) {
    var b = `<rect x="-27" y="-92" width="54" height="14" rx="5" fill="#2a9d8f"${S}/><path d="M-30 -78 L30 -78 L30 -10 Q30 0 20 0 L-20 0 Q-30 0 -30 -10 Z" fill="#e8f6ff" fill-opacity=".85"${S}/>`;
    for (var i = 0; i < (n || 0); i++) {
      var cx = -20 + (i % 4) * 13.4 + (Math.floor(i / 4) % 2) * 6, cy = -10 - Math.floor(i / 4) * 11;
      if (cy < -70) break;
      b += `<ellipse cx="${cx}" cy="${cy}" rx="9.5" ry="6" fill="#ffd23f"${S2}/>`;
    }
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function well(x, y, s) {
    var b = `<rect x="-34" y="-38" width="68" height="38" rx="4" fill="#c9c9d6"${S}/><ellipse cx="0" cy="-38" rx="34" ry="9" fill="#3a4a66"${S}/>`;
    b += `<path d="M-34 -20 H34 M-12 -20 V0 M12 -20 V0 M-22 -38 V-20 M2 -38 V-20 M24 -38 V-20" stroke="${INK}" stroke-width="2" opacity=".45" fill="none"/>`;
    b += `<rect x="-32" y="-98" width="7" height="62" fill="#8d5a3b"${S2}/><rect x="25" y="-98" width="7" height="62" fill="#8d5a3b"${S2}/>`;
    b += `<path d="M-46 -98 L0 -128 L46 -98 Z" fill="#b5543a"${S}/><line x1="0" y1="-106" x2="0" y2="-64" stroke="${INK}" stroke-width="2.5"/><path d="M-10 -64 L10 -64 L8 -48 L-8 -48 Z" fill="#9aa5b8"${S2}/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function school(x, y, s) {
    var b = `<rect x="-62" y="-70" width="124" height="70" fill="#f6c86a"${S}/><path d="M-70 -70 L0 -108 L70 -70 Z" fill="#b5543a"${S}/>`;
    b += `<line x1="0" y1="-108" x2="0" y2="-134" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M0 -134 L24 -127 L0 -120 Z" fill="#e63946"${S2}/>`;
    b += `<rect x="-52" y="-52" width="26" height="24" rx="2" fill="#bde0fe"${S2}/><rect x="26" y="-52" width="26" height="24" rx="2" fill="#bde0fe"${S2}/><rect x="-11" y="-38" width="22" height="38" rx="3" fill="#8d5a3b"${S2}/>`;
    b += `<circle cx="0" cy="-84" r="9" fill="#fff"${S2}/><path d="M0 -90 V-84 H5" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function clinic(x, y, s) {
    var b = `<rect x="-52" y="-70" width="104" height="70" fill="#fffaf0"${S}/><rect x="-58" y="-78" width="116" height="12" rx="3" fill="#2a9d8f"${S}/>`;
    b += `<rect x="-11" y="-36" width="22" height="36" rx="3" fill="#bde0fe"${S2}/><rect x="-44" y="-52" width="22" height="20" rx="2" fill="#bde0fe"${S2}/><rect x="22" y="-52" width="22" height="20" rx="2" fill="#bde0fe"${S2}/>`;
    b += `<circle cx="0" cy="-96" r="17" fill="#fff"${S}/><path d="M-4 -108 H4 V-100 H12 V-92 H4 V-84 H-4 V-92 H-12 V-100 H-4 Z" fill="#e63946"/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function road(y, h) {
    var o = `<rect x="-400" y="${y}" width="1200" height="${h}" fill="#8d96a3"/><rect x="-400" y="${y}" width="1200" height="5" fill="#6d7686"/>`;
    for (var i = -380; i < 800; i += 70) o += `<rect x="${i}" y="${y + h / 2 - 3}" width="38" height="6" rx="3" fill="#fff"/>`;
    return o;
  }
  function parcel(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-28" y="-22" width="56" height="44" rx="3" fill="#d9a566"${S}/><rect x="-6" y="-22" width="12" height="44" fill="#f2d6a2"/><path d="M-28 -22 L-6 -22 M6 -22 L28 -22 M-28 22 L28 22" stroke="${INK}" stroke-width="3"/><path d="M-6 -22 V22 M6 -22 V22" stroke="${INK}" stroke-width="2"/><path d="M-20 4 H-12 M-20 10 H-14" stroke="${INK}" stroke-width="2" opacity=".5"/>`); }
  function hook(x, topY, y, txt) {
    return `<line x1="${x}" y1="${topY}" x2="${x}" y2="${y}" stroke="${INK}" stroke-width="3"/><path d="M${x} ${y} L${x} ${y + 26} Q${x} ${y + 44} ${x - 16} ${y + 38} Q${x - 24} ${y + 34} ${x - 22} ${y + 26}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` + tag(x - 8, y + 66, 1.15, txt, 14);
  }
  function upG(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-10 10 L-10 -2 L-19 -2 L0 -24 L19 -2 L10 -2 L10 10 Z" fill="#2e9a3a"${S2}/>`); }
  function downR(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<path d="M-10 -10 L-10 2 L-19 2 L0 24 L19 2 L10 2 L10 -10 Z" fill="#e63946"${S2}/>`); }
  function arrowR(x1, y, x2, c) { return `<path d="M${x1} ${y} L${x2} ${y} M${x2 - 11} ${y - 9} L${x2} ${y} L${x2 - 11} ${y + 9}" fill="none" stroke="${c || INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`; }
  function stairs(x, y, n, w, h) {
    var o = "", cols = ["#d9a566", "#e0b27a", "#d9a566", "#e0b27a", "#d9a566", "#e0b27a"];
    for (var i = 0; i < n; i++) o += `<rect x="${x + i * w}" y="${y - (i + 1) * h}" width="${w}" height="${(i + 1) * h}" fill="${cols[i]}"${S}/>`;
    return o;
  }
  function cupboard(x, y, s, open) {
    var b = `<rect x="-42" y="-130" width="84" height="130" rx="4" fill="#a8683a"${S}/><rect x="-36" y="-124" width="72" height="118" rx="2" fill="#c58b4e"/>`;
    if (open) {
      b += `<rect x="-36" y="-124" width="72" height="118" fill="#6b4129"/><rect x="-36" y="-90" width="72" height="5" fill="#a8683a"/><rect x="-36" y="-50" width="72" height="5" fill="#a8683a"/>`;
      b += envelope(-14, -104, 0.45, "#e63946", -6) + envelope(14, -66, 0.45, "#3a86ff", 5) + `<rect x="-26" y="-34" width="50" height="22" rx="3" fill="#b7e4a0"${S2}/><circle cx="-1" cy="-23" r="6" fill="#8fce73"/>`;
      b += `<path d="M-36 -124 L-70 -112 L-70 -12 L-36 -6 Z" fill="#c58b4e"${S}/><circle cx="-62" cy="-62" r="3.5" fill="${INK}"/>`;
    } else {
      b += `<line x1="0" y1="-124" x2="0" y2="-6" stroke="${INK}" stroke-width="3"/><circle cx="-8" cy="-62" r="3.5" fill="${INK}"/><circle cx="8" cy="-62" r="3.5" fill="${INK}"/><rect x="-28" y="-112" width="22" height="42" rx="2" fill="none" stroke="#a8683a" stroke-width="2.5"/><rect x="6" y="-112" width="22" height="42" rx="2" fill="none" stroke="#a8683a" stroke-width="2.5"/>`;
    }
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function mouse(x, y, s, flip) {
    return T(`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`, `<path d="M-22 -4 Q-40 -2 -44 -14 Q-46 -22 -38 -24" fill="none" stroke="#f4a6a0" stroke-width="3" stroke-linecap="round"/><ellipse cx="0" cy="-12" rx="24" ry="14" fill="#b8bfc7"${S}/><circle cx="14" cy="-24" r="9" fill="#b8bfc7"${S2}/><circle cx="22" cy="-20" r="9" fill="#b8bfc7"${S}/><circle cx="26" cy="-20" r="2.6" fill="#f4a6a0"/><circle cx="20" cy="-23" r="2.2" fill="${INK}"/><circle cx="12" cy="-28" r="5" fill="#f4a6a0"${S2}/>`);
  }
  function officeBldg(x, y, s) {
    var b = `<rect x="-50" y="-170" width="100" height="170" fill="#9fb4d8"${S}/>`;
    for (var r = 0; r < 4; r++) for (var c = 0; c < 3; c++) b += `<rect x="${-38 + c * 28}" y="${-156 + r * 30}" width="18" height="20" rx="2" fill="${(r + c) % 3 === 0 ? "#fff3b0" : "#e6f2ff"}"${S2}/>`;
    b += `<rect x="-12" y="-36" width="24" height="36" rx="3" fill="#8d5a3b"${S2}/><rect x="-56" y="-178" width="112" height="10" rx="3" fill="#6c8ebf"${S}/>`;
    return T(`translate(${x} ${y}) scale(${s})`, b);
  }
  function bigPhone(x, y, s, inner) {
    return T(`translate(${x} ${y}) scale(${s})`, `<rect x="-31" y="-52" width="62" height="104" rx="9" fill="${INK}"/><rect x="-27" y="-44" width="54" height="84" rx="3" fill="#e6f2ff"/>` + inner + `<circle cx="0" cy="46" r="3" fill="#fff"/>`);
  }
  function tick(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="15" fill="#fff"${S2}/><path d="M-7 1 L-2 7 L8 -6" fill="none" stroke="#2e9a3a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`); }

  /* ---------- BOOK 11: The Buy-Now Trap (buy-now-trap) ---------- */
  function sceneEmi(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + sun(352, 56, 20) + cloud(250, 62, 0.8) + ground("#9ccf7e", 300);
      o += `<rect x="12" y="120" width="182" height="182" fill="#f6e7c8"${S}/><rect x="4" y="100" width="198" height="26" rx="4" fill="#e63946"${S}/><text x="103" y="120" text-anchor="middle" font-size="19" font-weight="700" ${FONT} fill="#fff">EMI</text>`;
      o += `<rect x="28" y="146" width="150" height="116" rx="6" fill="#bde0fe"${S}/><path d="M40 158 L66 158 M40 168 L52 168" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/><rect x="34" y="262" width="138" height="14" fill="#c58b4e"${S2}/>`;
      o += phoneT(76, 214, 2.0, "") + tag(146, 170, 1.0, "₹12,000", 12);
      o += hero(280, 394, 1.15, g, "up", "happy") + gullu(358, 396, 0.8) + spark(222, 150, 0.9) + spark(344, 190, 0.7);
    } else if (n === 1) {
      o += room("#fff1d6", 336, "#c98f5a") + window2(24, 44, 84, 76, false);
      o += `<rect x="206" y="270" width="70" height="66" rx="4" fill="#e9d3a8"${S}/>` + phoneT(241, 242, 1.2, "") + tag(241, 304, 0.85, "₹12,000", 12);
      o += T(`translate(338 0) scale(-1 1)`, officer(0, 398, 1.0));
      o += bubble(268, 108, 92, 52, 338, 224) + `<text x="268" y="118" text-anchor="middle" font-size="28" font-weight="700" ${FONT} fill="#e63946">₹1,100</text>`;
      o += hero(86, 398, 1.1, g, "down", "wow") + gullu(158, 398, 0.75) + sweat(120, 214);
    } else if (n === 2) {
      o += room("#fde8c8", 336, "#b98150");
      o += chalkboard(200, 82, 352, 120, ["₹1,100 × 12 = ₹13,200", "₹13,200 − ₹12,000 = ₹1,200"], 21);
      o += table(128, 300, 160) + phoneT(208, 270, 1.15, "") + tag(268, 262, 0.95, "+₹1,200", 12);
      o += hero(62, 398, 1.1, g, "down", "think") + gullu(350, 398, 0.78) + sweat(366, 340);
    } else if (n === 3) {
      o += room("#fde8c8", 336, "#b98150");
      o += calendar(340, 190, 0.95, 9);
      o += bubble(190, 84, 88, 52, 206, 178) + phoneT(190, 84, 0.95, "");
      o += table(118, 300, 176) + coinJar(206, 300, 1.35, 12);
      o += hero(58, 398, 1.1, g, "give", "happy") + coin(128, 262, 0.9) + `<path d="M128 276 L128 288" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
      o += gullu(352, 398, 0.78);
    } else {
      o += room("#fff1d6", 334, "#c98f5a");
      o += T(`translate(290 0)`, officer(0, 334, 1.0));
      o += counterFront(292);
      o += note(236, 274, 0.7, -8) + note(262, 270, 0.7, 6) + tag(210, 252, 0.8, "₹12,000", 12);
      o += gullu(364, 292, 0.75);
      o += hero(104, 398, 1.1, g, "high", "happy") + phoneT(158, 184, 1.05, "") + spark(196, 160, 0.9) + spark(118, 130, 0.7);
    }
    return o;
  }

  /* ---------- BOOK 12: Read Your Bill (shop-bill) ---------- */
  function sceneBill(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(70, 56, 0.8) + ground("#9ccf7e", 300);
      o += bank(330, 250, 0.52);
      o += billPaper(196, 190, 2.4, -5, ["₹100", "+ ₹5", "₹105"]) + magnifier(270, 238, 1.5, 28);
      o += coin(246, 84, 0.9) + coin(282, 66, 0.9) + coin(318, 62, 0.9) + spark(224, 100, 0.8);
      o += hero(70, 394, 1.1, g, "up", "happy") + gullu(350, 396, 0.8);
    } else if (n === 1) {
      o += sky("#bfe9ff", 300) + hills(300) + ground("#9ccf7e", 300) + cloud(80, 56, 0.8);
      o += kaka(300, 292, 1.0) + kiosk(300, 292, "#3a86ff", "#fff");
      o += notebook(262, 272, 1.0, -6) + pencil(330, 274, 0.9, 70) + tag(220, 204, 0.95, "₹100", 14);
      o += hero(82, 398, 1.1, g, "give", "happy") + note(146, 298, 0.55, 10) + gullu(180, 398, 0.75);
    } else if (n === 2) {
      o += room("#ffe9c7", 336, "#c98f5a");
      o += kaka(318, 322, 1.0) + kiosk(318, 322, "#3a86ff", "#fff");
      o += billPaper(170, 170, 2.3, -4, ["₹100", "+ ₹5", "₹105"]) + magnifier(224, 214, 1.3, 25);
      o += hero(76, 398, 1.1, g, "recv", "think") + gullu(160, 398, 0.72);
    } else if (n === 3) {
      o += sky("#bfe9ff", 300) + hills(300) + ground("#9ccf7e", 300) + cloud(220, 50, 0.7);
      o += billPaper(66, 150, 1.5, -6, ["₹100", "+ ₹5", "₹105"]) + arrowR(116, 150, 160, "#e63946");
      o += pot(238, 190, 1.0) + coin(222, 110, 0.8) + coin(246, 94, 0.8) + coin(262, 124, 0.8);
      o += school(318, 190, 0.5) + clinic(366, 190, 0.32) + spark(316, 80, 0.8);
      o += road(340, 60);
      o += hero(88, 394, 1.1, g, "up", "happy") + gullu(190, 396, 0.8) + aaji(318, 398, 0.9, true, "down");
    } else {
      o += room("#ffe9c7", 336, "#c98f5a");
      o += `<rect x="150" y="30" width="226" height="110" rx="6" fill="#d9a566"${S}/><rect x="158" y="38" width="210" height="94" rx="3" fill="#e6c08a"/>`;
      o += paper(190, 84, 1.1, -6) + paper(262, 84, 1.1, 4) + paper(334, 84, 1.1, -3);
      o += aaji(306, 398, 0.95, true, "down") + gullu(236, 398, 0.75);
      o += hero(92, 398, 1.1, g, "high", "happy") + billPaper(150, 166, 0.95, 10) + tick(176, 126, 0.9);
    }
    return o;
  }

  /* ---------- BOOK 13: Where to Keep Your Savings (safe-place) ---------- */
  function sceneSafe(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + ground("#9ccf7e", 300);
      [100, 200, 300].forEach(function (cx, i) {
        o += `<circle cx="${cx}" cy="76" r="38" fill="#fff"${S}/>`;
        o += i === 0 ? shield(cx, 76, 1.05) : i === 1 ? clock(cx, 76, 1.25) : mangoTree(cx, 104, 0.26, "coin", 5);
      });
      o += cupboard(58, 392, 0.78, false) + hero(206, 394, 1.15, g, "up", "happy") + gullu(334, 396, 0.85) + passbook(278, 330, 0.9, -10);
    } else if (n === 1) {
      o += room("#ffe9c7", 336, "#c98f5a") + window2(24, 44, 84, 76, false);
      o += cupboard(214, 340, 1.15, true) + note(300, 350, 0.6, 8) + mouse(280, 356, 1.1);
      o += hero(64, 398, 1.1, g, "down", "think") + aaji(356, 398, 0.82, true, "down") + sweat(340, 214);
    } else if (n === 2) {
      o += room("#e6f2ff", 336, "#b98150") + clock(58, 76, 1.5) + shield(342, 80, 1.3);
      o += didi(268, 304, 1.1) + counterFront(300) + passbook(212, 282, 1.0, -8);
      o += hero(74, 398, 1.1, g, "give", "happy") + gullu(352, 300, 0.7);
    } else if (n === 3) {
      o += sky("#bfe9ff", 290) + hills(290) + cloud(60, 50, 0.8) + ground("#79c86a", 290);
      o += fox(296, 296, 1.3) + bush(296, 334, 1.3);
      o += bubble(262, 112, 126, 66, 294, 232) + `<text x="262" y="106" text-anchor="middle" font-size="21" font-weight="700" ${FONT} fill="${INK}">₹1,000 → ₹2,000</text><text x="262" y="142" text-anchor="middle" font-size="30" font-weight="700" ${FONT} fill="#e63946">×2</text>`;
      o += hero(80, 398, 1.1, g, "give", "think") + gullu(178, 398, 0.78) + sweat(204, 340);
    } else {
      o += sky("#bfe9ff", 290) + hills(290) + cloud(70, 56, 0.8) + ground("#79c86a", 290);
      o += bank(66, 296, 0.5);
      o += mangoTree(292, 394, 0.86, "coin", 8);
      o += hero(126, 394, 1.1, g, "high", "happy") + passbook(182, 186, 0.9, 10) + gullu(210, 396, 0.76) + spark(240, 130, 0.8);
    }
    return o;
  }

  /* ---------- BOOK 14: The Kite Company (kite-company) ---------- */
  function sceneKite(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(100, 190, 0.8) + ground("#9ccf7e", 300);
      o += pie(54, 66, 34, 10, -1) + kite(150, 100, 0.9, -12, "#3a86ff") + kite(336, 66, 1.0, 14, "#ffd23f") + kite(262, 150, 1.2, 8, "#e63946");
      o += `<path d="M202 232 Q238 200 254 190" fill="none" stroke="${INK}" stroke-width="2.2"/>`;
      o += hero(154, 394, 1.15, g, "up", "happy") + gullu(300, 396, 0.85);
    } else if (n === 1) {
      o += room("#e6f2ff", 336, "#c98f5a");
      o += chalkboard(200, 62, 200, 66, ["₹1,000"], 32);
      o += table(14, 252, 372) + kite(130, 220, 0.8, -12, "#e63946", true) + kite(270, 220, 0.8, 10, "#3a86ff", true) + kite(200, 210, 0.7, 0, "#ffd23f", true);
      o += hero(62, 398, 1.0, g, "give", "happy") + coin(122, 306, 0.8);
      o += hero(196, 398, 1.0, "b", "up", "happy", { top: "#e63946", low: "#2a9d8f" });
      o += hero(326, 398, 1.0, "g", "give", "happy", { top: "#6a4c93", low: "#ffd23f" });
    } else if (n === 2) {
      o += room("#e6f2ff", 336, "#c98f5a");
      o += chalkboard(200, 56, 350, 74, ["₹1,000 ÷ 10 = ₹100"], 27);
      o += pie(210, 220, 78, 10, 0) + tag(318, 176, 0.95, "₹100", 13) + cert(340, 258, 1.15, 8);
      o += hero(58, 398, 1.1, g, "give", "happy") + gullu(340, 398, 0.75);
    } else if (n === 3) {
      o += `<rect x="-400" y="-400" width="600" height="1200" fill="#bfe9ff"/><rect x="200" y="-400" width="600" height="1200" fill="#cfd8e8"/>`;
      o += sun(58, 60, 20) + cloud(150, 56, 0.7) + rainCloud(300, 60, 1.3, 5);
      o += `<rect x="-400" y="316" width="600" height="400" fill="#79c86a"/><rect x="200" y="316" width="600" height="400" fill="#6fae66"/>`;
      o += kite(66, 150, 1.0, -10, "#e63946") + kite(150, 214, 0.8, 8, "#ffd23f") + kite(312, 306, 0.8, 72, "#3a86ff");
      o += tag(70, 280, 0.95, "₹120", 13) + upG(30, 280, 0.9) + tag(330, 250, 0.95, "₹80", 13) + downR(372, 250, 0.9);
      o += `<line x1="200" y1="0" x2="200" y2="400" stroke="${INK}" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>`;
      o += hero(200, 398, 1.1, g, "down", "think");
    } else {
      o += room("#fde8c8", 336, "#b98150") + window2(24, 44, 84, 76, false);
      o += `<rect x="256" y="40" width="124" height="104" rx="5" fill="#a8683a"${S}/><rect x="264" y="48" width="108" height="88" rx="2" fill="#fff3d6"/>` + cert(318, 92, 1.5, -3);
      o += table(30, 300, 120) + glassJar(90, 300, 1.35, 16);
      o += hero(214, 398, 1.1, g, "high", "happy") + gullu(344, 398, 0.8) + spark(180, 190, 0.8);
    }
    return o;
  }

  /* ---------- BOOK 15: The Nimbu Pani Stall (nimbu-pani-stall) ---------- */
  function sceneStall(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + sun(60, 60, 24) + cloud(290, 66, 0.9) + ground("#9ccf7e", 300);
      o += hero(200, 332, 1.0, g, "up", "happy") + kiosk(200, 300, "#ffd23f", "#fff");
      o += glassDrink(134, 296, 1.0) + glassDrink(156, 296, 1.0) + lemon(246, 285, 0.95) + lemon(266, 286, 0.95, 20) + lemon(256, 268, 0.95, -10);
      o += tag(200, 352, 1.2, "₹10", 18) + gullu(340, 396, 0.85) + spark(98, 220, 0.8);
    } else if (n === 1) {
      o += sky("#bfe9ff", 300) + hills(300) + ground("#9ccf7e", 300) + cloud(90, 56, 0.8);
      o += kaka(300, 292, 1.0) + kiosk(300, 292, "#2a9d8f", "#fff");
      o += lemon(256, 280, 1.1) + lemon(282, 282, 1.1, 15) + lemon(268, 262, 1.1, -10) + sack(342, 292, 0.7);
      o += tag(204, 262, 0.95, "₹6", 16);
      o += hero(86, 398, 1.1, g, "give", "happy") + note(150, 298, 0.55, 8) + gullu(168, 398, 0.75);
    } else if (n === 2) {
      o += room("#fde8c8", 336, "#b98150");
      o += chalkboard(200, 68, 340, 92, ["₹10 − ₹6 = ₹4"], 32);
      o += table(106, 304, 190) + lemon(140, 290, 1.0) + lemon(166, 292, 1.0, 14) + lemon(152, 274, 1.0, -8) + glassDrink(242, 304, 1.45);
      o += tag(150, 240, 0.9, "₹6", 15) + tag(300, 236, 0.9, "₹10", 15);
      o += hero(52, 398, 1.05, g, "down", "think") + gullu(352, 398, 0.78);
    } else if (n === 3) {
      o += sky("#bfe9ff", 300) + hills(300) + sun(350, 54, 20) + ground("#9ccf7e", 300);
      o += chalkboard(72, 62, 132, 74, ["₹4 × 50", "= ₹200"], 20);
      o += hero(200, 332, 1.0, g, "high", "happy") + kiosk(200, 300, "#ffd23f", "#fff");
      o += glassDrink(134, 296, 1.0) + glassDrink(156, 296, 1.0) + coinStack(252, 296, 0.8, 5);
      o += hero(44, 398, 0.9, "b", "give", "happy", { top: "#e63946", low: "#2a9d8f" }) + hero(98, 398, 0.9, "g", "up", "happy", { top: "#6a4c93", low: "#ffd23f" }) + hero(334, 398, 0.95, "b", "give", "happy", { top: "#2a9d8f", low: "#3a86ff" });
    } else {
      o += `<rect x="-400" y="-400" width="1200" height="1200" fill="#ffd9a8"/>` + `<circle cx="330" cy="268" r="44" fill="#ffb703"/>` + ground("#8bcf73", 290);
      o += cloud(90, 70, 0.8) + cloud(210, 120, 0.6);
      o += table(100, 304, 200) + coinStack(140, 304, 1.5, 6) + coinStack(188, 304, 1.5, 8) + coinStack(236, 304, 1.5, 5) + coinStack(274, 304, 1.5, 7);
      o += tag(200, 200, 1.2, "₹200", 16) + spark(120, 214, 0.9) + spark(284, 190, 0.8);
      o += hero(50, 398, 1.05, g, "up", "happy") + gullu(350, 398, 0.8);
    }
    return o;
  }

  /* ---------- BOOK 16: The Shared Well (shared-well) ---------- */
  function sceneWell(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + sun(344, 58, 22) + cloud(90, 60, 0.8) + ground("#9ccf7e", 300);
      o += school(62, 292, 0.62) + clinic(344, 292, 0.62) + road(338, 62);
      o += well(206, 340, 1.5);
      o += hero(104, 394, 1.12, g, "up", "happy") + gullu(310, 396, 0.85) + spark(150, 160, 0.8);
    } else if (n === 1) {
      o += sky("#bfe9ff", 300) + hills(300) + ground("#9ccf7e", 300) + cloud(80, 56, 0.8);
      o += pot(200, 356, 1.5);
      o += coin(180, 170, 0.9) + coin(204, 130, 0.9) + coin(228, 190, 0.9) + `<path d="M180 190 V204 M204 150 V166 M228 210 V224" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
      o += hero(66, 398, 1.1, g, "give", "happy") + coin(130, 284, 0.9) + aaji(346, 398, 0.88, true, "give");
    } else if (n === 2) {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(300, 52, 0.8) + ground("#9ccf7e", 300);
      o += school(196, 296, 0.95) + clinic(332, 296, 0.82) + road(338, 62);
      o += hero(68, 394, 1.12, g, "up", "happy") + gullu(262, 396, 0.8) + spark(110, 190, 0.8);
    } else if (n === 3) {
      o += sky("#bfe9ff", 300) + hills(300) + ground("#9ccf7e", 300) + cloud(220, 44, 0.7);
      o += billPaper(60, 140, 1.4, -6, ["₹100", "+ ₹5", "₹105"]) + arrowR(104, 140, 142, "#e63946");
      o += pot(188, 188, 0.85) + arrowR(224, 140, 262, "#e63946");
      o += well(332, 190, 0.8);
      o += coin(168, 94, 0.8) + coin(190, 78, 0.8) + coin(210, 98, 0.8);
      o += hero(84, 398, 1.1, g, "down", "think") + gullu(198, 398, 0.78) + aaji(316, 398, 0.9, true, "down");
    } else {
      o += sky("#bfe9ff", 300) + hills(300) + sun(56, 56, 20) + ground("#9ccf7e", 300);
      o += school(190, 340, 1.5) + road(354, 46);
      o += hero(70, 396, 1.1, g, "high", "happy") + hero(322, 396, 1.0, "b", "up", "happy", { top: "#e63946", low: "#2a9d8f" }) + gullu(194, 398, 0.78);
      o += spark(110, 190, 0.8) + spark(300, 190, 0.8);
    }
    return o;
  }

  /* ---------- BOOK 17: Too Good to Be True (too-good-sale) ---------- */
  function sceneSale(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(80, 60, 0.8) + ground("#79c86a", 300);
      o += hook(300, -10, 110, "-90%");
      o += fox(338, 300, 1.2) + bush(338, 338, 1.2);
      o += hero(100, 394, 1.15, g, "up", "think") + phoneT(150, 196, 1.05, "₹99") + gullu(210, 396, 0.8) + sweat(236, 340);
    } else if (n === 1) {
      o += room("#fff1d6", 336, "#c98f5a");
      o += bigPhone(206, 196, 3.0, football(0, -6, 0.95) + tag(12, -30, 0.62, "-90%", 14) + `<text y="32" text-anchor="middle" font-size="15" font-weight="700" ${FONT} fill="#e63946">₹99</text>`);
      o += spark(84, 120, 0.9) + spark(330, 110, 1.0) + spark(318, 300, 0.8);
      o += hero(52, 398, 1.0, g, "down", "wow") + gullu(362, 398, 0.78);
    } else if (n === 2) {
      o += room("#fff1d6", 336, "#c98f5a") + window2(24, 44, 84, 76, false);
      o += bubble(238, 80, 72, 44, 236, 190) + `<text x="238" y="102" text-anchor="middle" font-size="58" font-weight="700" ${FONT} fill="#e63946">?</text>`;
      o += hero(92, 398, 1.1, g, "up", "think") + phoneT(140, 196, 1.0, "₹99");
      o += aaji(318, 398, 1.0, true, "give") + magnifier(234, 262, 1.3, 30) + gullu(218, 398, 0.72);
    } else if (n === 3) {
      o += room("#e8f1e0", 336, "#c9a46a");
      o += `<rect x="30" y="34" width="340" height="168" rx="10" fill="#2f6f4f" stroke="#8d5a3b" stroke-width="8"/>`;
      o += lock(98, 110, 1.6) + magnifier(200, 104, 1.4) + shield(302, 108, 1.7);
      o += tick(130, 160, 0.95) + tick(232, 160, 0.95) + tick(334, 160, 0.95);
      o += hero(96, 398, 1.1, g, "high", "happy") + gullu(322, 398, 0.9);
    } else {
      o += room("#fff1d6", 334, "#c98f5a");
      o += shield(210, 112, 1.6) + spark(160, 84, 0.8) + spark(262, 78, 0.9);
      o += T(`translate(348 0) scale(-1 1)`, officer(0, 398, 1.0)) + parcel(278, 318, 1.0, -6);
      o += hero(104, 398, 1.1, g, "give", "happy") + note(170, 296, 0.6, 8) + gullu(196, 398, 0.75);
      o += fox(52, 74, 0.7) + sweat(80, 56) + `<path d="M96 66 L114 66 M92 78 L110 78 M98 90 L114 90" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    return o;
  }

  /* ---------- BOOK 18: The Growing Staircase (growing-staircase) ---------- */
  function sceneStairs(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + sun(60, 56, 22) + cloud(260, 56, 0.8) + ground("#9ccf7e", 300);
      o += stairs(100, 330, 5, 56, 34);
      [1, 1, 2, 3, 5].forEach(function (k, i) { o += coinStack(100 + i * 56 + 28, 330 - (i + 1) * 34, 0.95, k); });
      o += gullu(354, 140, 0.7) + spark(300, 70, 0.9) + spark(372, 110, 0.7);
      o += hero(56, 394, 1.12, g, "up", "happy");
    } else if (n === 1) {
      o += room("#e6f2ff", 336, "#b98150");
      o += chalkboard(112, 76, 200, 72, ["₹1,000"], 32);
      o += didi(268, 304, 1.1) + counterFront(300) + passbook(214, 282, 1.0, -8) + tag(338, 120, 1.15, "10%", 18);
      o += hero(70, 398, 1.1, g, "give", "happy") + note(134, 296, 0.6, 6);
    } else if (n === 2) {
      o += room("#fde8c8", 336, "#b98150");
      o += chalkboard(200, 62, 352, 80, ["₹1,000 + ₹100 = ₹1,100"], 24);
      o += calendar(58, 202, 0.9, 1);
      o += table(112, 304, 190) + coinStack(180, 304, 1.5, 9) + coinStack(240, 304, 1.5, 1) + spark(244, 242, 0.9) + tag(278, 244, 0.9, "+₹100", 12);
      o += hero(46, 398, 1.0, g, "down", "think") + gullu(354, 398, 0.78);
    } else if (n === 3) {
      o += room("#fde8c8", 336, "#b98150");
      o += chalkboard(200, 62, 352, 80, ["₹1,100 + ₹110 = ₹1,210"], 24);
      o += stairs(106, 330, 3, 64, 12);
      [8, 9, 10].forEach(function (k, i) { o += coinStack(106 + i * 64 + 32, 330 - (i + 1) * 12, 1.3, k); });
      o += tag(258, 190, 1.0, "+₹110", 14) + spark(212, 162, 0.9) + spark(292, 150, 0.8);
      o += hero(46, 398, 1.0, g, "high", "wow") + gullu(354, 398, 0.78);
    } else {
      o += room("#e6f2ff", 336, "#b98150");
      o += chalkboard(200, 54, 130, 62, ["20"], 38);
      o += coinStack(104, 332, 1.6, 5) + tag(104, 240, 1.0, "₹3,000", 14);
      o += coinStack(300, 332, 1.6, 11) + tag(300, 150, 1.0, "₹6,727", 14) + spark(340, 120, 0.9) + spark(262, 110, 0.7);
      o += hero(200, 398, 1.05, g, "up", "wow");
    }
    return o;
  }

  /* ---------- BOOK 19: The Journey of Fifty Rupees (journey-of-50) ---------- */
  function sceneUpi(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(90, 190, 0.7) + ground("#9ccf7e", 300);
      o += phoneT(46, 98, 1.0, "₹50") + arrowR(78, 104, 112, "#2a9d8f");
      o += bank(150, 140, 0.3) + arrowR(190, 104, 222, "#2a9d8f");
      o += bank(262, 140, 0.3) + arrowR(302, 104, 332, "#2a9d8f");
      o += T(`translate(366 150) scale(0.34)`, stall(0, 0, "#e63946", "#fff"));
      o += tag(128, 40, 0.9, "₹50", 14) + spark(210, 60, 0.8);
      o += hero(124, 394, 1.15, g, "up", "happy") + phoneT(178, 218, 1.0, "") + gullu(320, 396, 0.85);
    } else if (n === 1) {
      o += sky("#bfe9ff", 300) + hills(300) + ground("#9ccf7e", 300) + cloud(80, 56, 0.8);
      o += kaka(310, 290, 1.0) + kiosk(310, 290, "#e63946", "#fff") + qr(352, 262, 1.0);
      o += hero(92, 398, 1.1, g, "up", "happy") + phoneT(144, 208, 1.0, "") + `<path d="M162 206 L330 252" stroke="#2a9d8f" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" fill="none"/>` + spark(240, 190, 0.8);
      o += gullu(190, 398, 0.75);
    } else if (n === 2) {
      o += room("#e8f1e0", 336, "#c9a46a");
      o += bigPhone(214, 190, 3.0, nametag(0, -14, 1.3) + `<text y="22" text-anchor="middle" font-size="16" font-weight="700" ${FONT} fill="${INK}">₹50</text>`);
      o += magnifier(246, 160, 1.5, 32);
      o += hero(54, 398, 1.0, g, "down", "think") + gullu(356, 398, 0.78);
    } else if (n === 3) {
      o += room("#fff1d6", 334, "#c98f5a");
      o += lock(176, 270, 2.0);
      o += bubble(296, 100, 88, 50, 214, 220) + `<text x="296" y="116" text-anchor="middle" font-size="36" font-weight="700" ${FONT} fill="${INK}">• • • •</text>` + noSign(296, 100, 2.1);
      o += hero(70, 398, 1.1, g, "give", "think") + gullu(262, 398, 0.78) + hero(352, 398, 0.85, g === "g" ? "b" : "g", "down", "wow");
    } else {
      o += sky("#bfe9ff", 300) + hills(300) + ground("#9ccf7e", 300) + cloud(80, 56, 0.8);
      o += kaka(300, 290, 1.0) + kiosk(300, 290, "#e63946", "#fff");
      o += phoneT(262, 258, 1.15, "") + `<path d="M250 258 l8 9 l16 -18" stroke="#2e9a3a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      o += hero(88, 398, 1.1, g, "high", "happy") + samosa(146, 186, 1.0, -10) + gullu(184, 398, 0.78) + spark(112, 120, 0.8) + spark(214, 150, 0.7);
    }
    return o;
  }

  /* ---------- BOOK 20: My First Salary (first-salary) ---------- */
  function sceneSalary(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + sun(60, 54, 20) + cloud(250, 50, 0.8) + ground("#9ccf7e", 300);
      o += officeBldg(326, 304, 1.0);
      o += envelope(120, 70, 0.8, "#e63946", -10) + envelope(184, 54, 0.8, "#ffd23f", 6) + envelope(246, 76, 0.8, "#3a86ff", -4);
      o += hero(160, 394, 1.15, g, "high", "happy") + note(216, 178, 1.0, -10) + gullu(60, 396, 0.85) + spark(90, 190, 0.8);
    } else if (n === 1) {
      o += room("#fff1d6", 336, "#c98f5a") + window2(24, 44, 84, 76, false);
      o += payslip(206, 176, 2.3, -4, ["", "₹20,000"]);
      o += spark(118, 140, 0.9) + spark(310, 100, 1.0);
      o += hero(60, 398, 1.1, g, "up", "wow") + aaji(336, 398, 0.95, true, "give") + gullu(262, 398, 0.7);
    } else if (n === 2) {
      o += room("#fde8c8", 336, "#b98150");
      o += payslip(206, 184, 2.6, 0, ["₹20,000", "− ₹1,200", "− ₹800", "= ₹18,000"]) + magnifier(312, 276, 1.3, 28);
      o += hero(56, 398, 1.05, g, "down", "think") + gullu(354, 398, 0.78) + sweat(374, 340);
    } else if (n === 3) {
      o += room("#e6f2ff", 336, "#b98150");
      o += bigPhone(206, 190, 3.0, `<text y="-18" text-anchor="middle" font-size="11" font-weight="700" ${FONT} fill="${INK}">+₹18,000</text>` + passbook(0, 10, 1.0, 0));
      o += coin(100, 100, 0.9) + coin(318, 84, 0.9) + coin(330, 230, 0.9) + spark(88, 190, 0.9) + spark(340, 150, 0.8);
      o += hero(58, 398, 1.1, g, "up", "happy") + gullu(354, 398, 0.78);
    } else {
      o += room("#fde8c8", 336, "#b98150");
      o += table(100, 304, 280);
      o += envelope(150, 284, 1.1, "#2a9d8f", -4) + envelope(240, 284, 1.1, "#ffd23f", 3) + envelope(330, 284, 1.1, "#ff70a6", -3);
      o += passbook(150, 214, 1.1, -6) + bread(240, 220, 1.7) + football(330, 214, 0.9);
      o += hero(46, 398, 1.0, g, "give", "happy") + spark(190, 168, 0.8) + spark(290, 164, 0.8);
    }
    return o;
  }

  /* ---------- NEW PROPS (books: money-swap, better-buy, two-currencies) ---------- */
  function rupeeCoin(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="26" fill="#ffd23f"${S}/><circle r="19" fill="none" stroke="#e0a800" stroke-width="3"/><text y="9" text-anchor="middle" font-size="26" font-weight="700" ${FONT} fill="${INK}">₹</text>`); }
  function dollarCoin(x, y, s) { return T(`translate(${x} ${y}) scale(${s})`, `<circle r="26" fill="#c9d6df"${S}/><circle r="19" fill="none" stroke="#8da2b0" stroke-width="3"/><text y="9" text-anchor="middle" font-size="26" font-weight="700" ${FONT} fill="${INK}">$</text>`); }
  function dollarNote(x, y, s, r) { return T(`translate(${x} ${y}) rotate(${r || 0}) scale(${s})`, `<rect x="-26" y="-14" width="52" height="28" rx="3" fill="#bfe3b4"${S}/><circle r="8" fill="#8fce73"${S2}/><text y="5" text-anchor="middle" font-size="13" font-weight="700" ${FONT} fill="${INK}">$</text>`); }
  function arrowL(x1, y, x2, c) { return `<path d="M${x1} ${y} L${x2} ${y} M${x2 + 11} ${y - 9} L${x2} ${y} L${x2 + 11} ${y + 9}" fill="none" stroke="${c || INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`; }
  function swapArrows(x1, y, x2, c) { return arrowR(x1, y - 9, x2, c) + arrowL(x2, y + 11, x1, c); }
  function txt(x, y, size, str, col) { return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="700" ${FONT} fill="${col || INK}">${str}</text>`; }

  /* ---------- BOOK 1: What is Money? (money-swap) ---------- */
  function sceneSwap(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(70, 56, 0.8) + cloud(310, 40, 0.7) + ground("#9ccf7e", 300);
      o += football(80, 100, 1.1) + bread(320, 106, 1.9) + swapArrows(134, 102, 266, "#e63946");
      o += rupeeCoin(200, 190, 1.0) + spark(160, 170, 0.8) + spark(244, 164, 0.8);
      o += hero(100, 394, 1.15, g, "up", "happy") + kaka(312, 394, 1.05) + gullu(204, 396, 0.8);
    } else if (n === 1) {
      o += room("#fff1d6", 336, "#c98f5a");
      o += bubble(104, 80, 64, 42, 104, 200) + bread(104, 84, 1.45);
      o += bubble(304, 80, 64, 42, 304, 200) + football(304, 80, 0.85) + noSign(304, 80, 1.5);
      o += hero(80, 398, 1.1, g, "give", "think") + football(154, 266, 0.95) + kaka(322, 398, 1.0, "sad") + gullu(214, 398, 0.78);
    } else if (n === 2) {
      o += room("#e8f1e0", 336, "#c9a46a");
      o += football(62, 142, 0.95) + arrowR(104, 142, 144, "#e63946") + sack(192, 178, 1.0) + arrowR(236, 142, 276, "#e63946") + bread(330, 146, 1.8);
      o += clock(200, 262, 1.9);
      o += hero(60, 398, 1.0, g, "down", "think") + sweat(86, 244) + gullu(340, 398, 0.82) + sweat(360, 336);
    } else if (n === 3) {
      o += room("#fff1d6", 336, "#c98f5a");
      o += table(112, 304, 276);
      o += bread(160, 292, 1.6) + tag(160, 236, 0.78, "₹10", 15) + sack(256, 300, 0.92) + tag(256, 226, 0.78, "₹40", 15) + football(346, 280, 0.95) + tag(346, 226, 0.78, "₹100", 13);
      o += hero(52, 398, 1.0, g, "up", "wow") + coin(112, 190, 1.5) + spark(150, 150, 0.8) + spark(300, 150, 0.8);
    } else {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(80, 56, 0.8) + ground("#9ccf7e", 300);
      o += kaka(304, 290, 1.0) + kiosk(304, 290, "#e3a857", "#fff");
      o += hero(98, 398, 1.15, g, "give", "happy") + coin(170, 296, 1.15) + bread(214, 222, 1.6) + arrowR(172, 250, 204, "#2a9d8f");
      o += spark(130, 130, 0.8) + spark(250, 150, 0.8) + gullu(194, 396, 0.78);
    }
    return o;
  }

  /* ---------- BOOK 6: The Better Buy (better-buy) ---------- */
  function sceneBetter(n, g) {
    var o = "";
    if (n === 0) {
      o += room("#fff1d6", 336, "#c98f5a") + window2(24, 44, 84, 76, false);
      o += table(112, 304, 276);
      o += sack(186, 298, 0.74) + tag(186, 244, 0.75, "₹50", 15) + txt(186, 214, 22, "500 g");
      o += sack(310, 298, 1.14) + tag(310, 214, 0.8, "₹90", 16) + txt(310, 178, 24, "1 kg");
      o += hero(52, 398, 1.0, g, "up", "think") + gullu(380, 398, 0.7);
    } else if (n === 1) {
      o += room("#fff1d6", 336, "#c98f5a");
      o += bubble(110, 80, 74, 46, 100, 200) + `<text x="110" y="102" text-anchor="middle" font-size="58" font-weight="700" ${FONT} fill="#e63946">?</text>`;
      o += table(172, 304, 216) + sack(236, 298, 0.74) + tag(236, 244, 0.75, "₹50", 15) + sack(332, 298, 1.1) + tag(332, 218, 0.8, "₹90", 16);
      o += hero(70, 398, 1.1, g, "down", "think") + gullu(152, 398, 0.66);
    } else if (n === 2) {
      o += room("#e8f1e0", 336, "#c9a46a");
      o += chalkboard(200, 120, 340, 176, ["500 g = ₹50", "× 2", "1 kg = ₹100"], 30);
      o += hero(60, 398, 1.05, g, "high", "happy") + gullu(340, 398, 0.85) + spark(352, 250, 0.8);
    } else if (n === 3) {
      o += room("#e8f1e0", 336, "#c9a46a");
      o += chalkboard(200, 124, 344, 190, [], 20);
      o += sack(112, 160, 0.78) + txt(112, 190, 22, "₹100/kg", "#fff");
      o += sack(290, 168, 1.02) + txt(290, 192, 22, "₹90/kg", "#fff") + tick(340, 70, 1.1);
      o += hero(96, 398, 1.1, g, "high", "happy") + gullu(322, 398, 0.9);
    } else {
      o += room("#fde8c8", 336, "#b98150");
      o += table(120, 306, 190) + sack(190, 300, 1.1) + tick(244, 244, 1.1) + calendar(336, 110, 0.9, 9);
      o += hero(58, 398, 1.05, g, "give", "happy") + aaji(348, 398, 0.95, true, "give");
      o += spark(150, 190, 0.8) + spark(268, 150, 0.8) + gullu(250, 398, 0.7);
    }
    return o;
  }

  /* ---------- BOOK 20: Money Across Borders (two-currencies) ---------- */
  function sceneBorders(n, g) {
    var o = "";
    if (n === 0) {
      o += sky("#bfe9ff", 300) + hills(300) + cloud(80, 56, 0.8) + cloud(320, 80, 0.7) + ground("#9ccf7e", 300);
      o += rupeeCoin(100, 150, 1.5) + dollarCoin(300, 150, 1.5) + swapArrows(150, 148, 250, "#e63946");
      o += spark(200, 90, 0.9) + spark(200, 220, 0.7);
      o += hero(130, 394, 1.1, g, "high", "happy") + gullu(270, 396, 0.85);
    } else if (n === 1) {
      o += room("#fff1d6", 336, "#c98f5a") + window2(24, 44, 84, 76, false);
      o += trunk(204, 336, 0.7);
      o += hero(84, 398, 1.1, g, "recv", "wow") + dollarNote(150, 268, 1.1, -8) + didi(318, 398, 1.0) + gullu(206, 398, 0.7);
      o += spark(124, 200, 0.8) + spark(340, 150, 0.8);
    } else if (n === 2) {
      o += room("#e6f2ff", 336, "#b98150");
      o += chalkboard(200, 110, 340, 150, ["$1 = ₹80"], 54);
      o += dollarCoin(156, 262, 0.8) + swapArrows(194, 262, 270, "#e63946") + rupeeCoin(310, 262, 0.8);
      o += hero(56, 398, 1.0, g, "down", "think") + gullu(352, 398, 0.78);
    } else if (n === 3) {
      o += room("#fde8c8", 336, "#b98150");
      o += chalkboard(200, 118, 340, 170, ["$5 × 80", "= ₹400"], 42);
      o += pencil(300, 270, 1.6, 20) + tag(300, 230, 0.8, "₹400", 15) + dollarNote(120, 252, 1.0, -6);
      o += hero(52, 398, 1.0, g, "up", "happy") + gullu(350, 398, 0.78) + spark(210, 250, 0.8);
    } else {
      o += room("#e6f2ff", 336, "#b98150");
      o += chalkboard(110, 90, 180, 90, ["$1 = ₹80"], 28) + chalkboard(300, 90, 180, 90, ["$1 = ₹85"], 28);
      o += arrowR(160, 160, 250, "#e63946") + upG(205, 210, 1.1);
      o += tag(104, 262, 0.9, "₹800", 15) + tag(300, 262, 0.9, "₹850", 15) + football(104, 300, 0.8) + football(300, 300, 0.8);
      o += hero(206, 398, 1.0, g, "down", "think") + gullu(356, 398, 0.7);
    }
    return o;
  }

  var SCENES = { "money-swap": sceneSwap, "better-buy": sceneBetter, "two-currencies": sceneBorders, "needs-vs-wants": sceneNeeds, "piggy-jar": sceneWish, "inside-a-bank": sceneBank, "family-budget": sceneBudget, "what-is-interest": sceneInterest, "why-prices-rise": sceneInflation, "phone-scams": sceneScam, "moneylender-or-bank": sceneBorrow, "insurance": sceneInsure, "emergency-fund": sceneEmergency, "buy-now-trap": sceneEmi, "shop-bill": sceneBill, "safe-place": sceneSafe, "kite-company": sceneKite, "nimbu-pani-stall": sceneStall, "shared-well": sceneWell, "too-good-sale": sceneSale, "growing-staircase": sceneStairs, "journey-of-50": sceneUpi, "first-salary": sceneSalary };
  var SKIES = {
    "money-swap": ["#bfe9ff", "#fff1d6", "#e8f1e0", "#fff1d6", "#bfe9ff"],
    "better-buy": ["#fff1d6", "#fff1d6", "#e8f1e0", "#e8f1e0", "#fde8c8"],
    "two-currencies": ["#bfe9ff", "#fff1d6", "#e6f2ff", "#fde8c8", "#e6f2ff"],
    "needs-vs-wants": ["#bfe9ff", "#d6f0ff", "#bfe9ff", "#ffe3b3", "#ffd9a8"],
    "piggy-jar": ["#bfe9ff", "#d6f0ff", "#e4f4ff", "#ffe9c7", "#bfe9ff"],
    "inside-a-bank": ["#bfe9ff", "#d6f0ff", "#e6f2ff", "#e6f2ff", "#ffd9a8"],
    "family-budget": ["#bfe9ff", "#ffe9c7", "#fff1d6", "#fde8c8", "#ffd9a8"],
    "what-is-interest": ["#bfe9ff", "#d6f0ff", "#e6f2ff", "#e8f1e0", "#bfe9ff"],
    "why-prices-rise": ["#bfe9ff", "#d6f0ff", "#fde8c8", "#ffe9c7", "#e8f1e0"],
    "phone-scams": ["#bfe9ff", "#fff1d6", "#fff1d6", "#e8f1e0", "#fff1d6"],
    "moneylender-or-bank": ["#bfe9ff", "#ffe9c7", "#f5e1c4", "#e6f2ff", "#bfe9ff"],
    "insurance": ["#cfd8e8", "#cfd8e8", "#e4f4ff", "#e4f4ff", "#bfe9ff"],
    "emergency-fund": ["#bfe9ff", "#ffe9c7", "#ffe9c7", "#fde8c8", "#fde8c8"],
    "buy-now-trap": ["#bfe9ff", "#fff1d6", "#fde8c8", "#fde8c8", "#fff1d6"],
    "shop-bill": ["#bfe9ff", "#bfe9ff", "#ffe9c7", "#bfe9ff", "#ffe9c7"],
    "safe-place": ["#bfe9ff", "#ffe9c7", "#e6f2ff", "#bfe9ff", "#bfe9ff"],
    "kite-company": ["#bfe9ff", "#e6f2ff", "#e6f2ff", "#bfe9ff", "#fde8c8"],
    "nimbu-pani-stall": ["#bfe9ff", "#bfe9ff", "#fde8c8", "#bfe9ff", "#ffd9a8"],
    "shared-well": ["#bfe9ff", "#bfe9ff", "#bfe9ff", "#bfe9ff", "#bfe9ff"],
    "too-good-sale": ["#bfe9ff", "#fff1d6", "#fff1d6", "#e8f1e0", "#fff1d6"],
    "growing-staircase": ["#bfe9ff", "#e6f2ff", "#fde8c8", "#fde8c8", "#e6f2ff"],
    "journey-of-50": ["#bfe9ff", "#bfe9ff", "#e8f1e0", "#fff1d6", "#bfe9ff"],
    "first-salary": ["#bfe9ff", "#fff1d6", "#fde8c8", "#e6f2ff", "#fde8c8"]
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
      bank: bank(0, 26, 0.29), note: note(0, 0, 1.3), envelope: envelope(0, 0, 1.1, "#e63946"), seed: seed(0, 0, 2.2), tree: mangoTree(0, 32, 0.28, "mango", 5), mango: mango(0, 0, 1.8),
      samosa: samosa(0, 3, 1.5), oil: oilTin(0, 24, 0.95), onion: onion(0, 3, 1.6), cylinder: cylinder(0, 34, 0.8), sack: sack(0, 28, 0.85),
      fakecall: callPhone(0, 0, 1.0), qr: qr(0, 0, 1.25), shield: shield(0, 0, 1.05), fox: fox(0, 6, 0.85), otp: otpMsg(0, -2, 0.85),
      paper: paper(0, 0, 1.3), ledger: ledger(0, 0, 1.2), stamp: stamp(0, 10, 1.4), house: houseIcon(0, 4, 1.15),
      plus: plusSign(0, 0, 1.3), wheat: wheat(0, 14, 0.8), wrench: wrench(0, -4, 1.0, 40), cooker: cooker(0, 24, 0.5, false), jar: glassJar(0, 34, 0.62, 6),
      bill: billPaper(0, 0, 0.85), tag: tag(0, 0, 1.0, "₹", 20), kite: kite(0, -14, 0.5, 0, "#e63946"), up: upG(0, 0, 1.3), down: downR(0, 0, 1.3), pie: pie(0, 0, 26, 10, -1),
      cert: cert(0, 0, 1.0), lemon: lemon(0, 0, 1.5), glass: glassDrink(0, 22, 0.9), well: well(0, 30, 0.45), school: school(0, 26, 0.38), clinic: clinic(0, 26, 0.42),
      road: '<rect x="-30" y="-12" width="60" height="24" rx="3" fill="#8d96a3"' + S + '/><rect x="-22" y="-2" width="16" height="4" rx="2" fill="#fff"/><rect x="6" y="-2" width="16" height="4" rx="2" fill="#fff"/>',
      parcel: parcel(0, 0, 0.95), stairs: stairs(-24, 22, 4, 12, 10), payslip: payslip(0, 0, 0.8), cupboard: cupboard(0, 32, 0.45, false), mouse: mouse(0, 18, 0.85),
      clock: clock(0, 0, 1.3), trunk: trunk(0, 22, 0.55), office: officeBldg(0, 32, 0.3), tick: tick(0, 0, 1.8), coinjar: coinJar(0, 34, 0.62, 6), umbrella: umbrella(0, 10, 0.5, "#e63946", 36), pot: pot(0, 34, 0.7), clipboard: clipboard(0, 0, 1.2), magnifier: magnifier(0, -6, 1.0), bucket: bucket(0, 20, 1.0), sackp: sack(0, 28, 0.85), rupee: rupeeCoin(0, 0, 1.0), dollar: dollarCoin(0, 0, 1.0), dnote: dollarNote(0, 0, 1.1, 0), pencil: pencil(0, 0, 1.3, 20)
    };
    return `<svg viewBox="-34 -34 68 68" xmlns="http://www.w3.org/2000/svg" style="width:52px;height:52px;flex:none" aria-hidden="true">${m[name] || ""}</svg>`;
  }

  window.Art = { scene: scene, avatar: avatar, headshot: headshot, prop: prop, sky: skyOf };
})();
