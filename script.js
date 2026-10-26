/* ============ EDIT THIS PART ============ */
const SURVEY = {
  endpoint: "https://script.google.com/macros/s/AKfycbw74Rzvi9pSCXxVcd2i9CwfkzJeml4XzfjuQoh7Ht2TjrERPxmAKrg6bE8I30gSTn4-4A/exec",
  title: "Alumni Connect Survey",
  description: "Tell us how you connect with alumni today, so we can build something that actually helps.",
  perks: ["Takes about 2 minutes", "No login or email needed", "Most answers are one tap"],
  startButton: "Start survey",
  thanksTitle: "Thank you!",
  thanksText: "Your answers are in. We’ll use them to shape the alumni platform.",
  introArt: "tajmahal",
  /* type: text | long | choice | multi | rating
     other: true adds an “Other” box | required: false lets people skip
     art: monument for the banner (tajmahal, indiagate, qutubminar, hawamahal, gateway, charminar, lotus, redfort)
          if you leave art out, monuments rotate automatically
     image: "images/your-photo.jpg" shows your own photo instead (optional caption: "Place, City") */
  questions: [
    { id: "name", section: "About you", type: "text", title: "What’s your name?", help: "Just so we know who’s responding.", placeholder: "e.g. Aarav Sharma", image: "images/indiagate.jpeg", caption: "India Gate, New Delhi"},
    { id: "field", type: "choice", other: true, title: "What is your field of study?", help: "Pick the closest match to your course.", image: "images/golghar.jpg", caption: "GolGhar, Patna",
      options: ["Engineering / Technology", "Management / Business", "Commerce / Economics", "Arts / Humanities / Social Sciences", "Science / Research", "Medical / Healthcare", "Law", "Design / Architecture"] },
    { id: "year", type: "choice", title: "Which year are you in?", image: "images/dlfcybercity.jpg", caption: "DLF CYBER CITY, Gurugram", options: ["1st year", "2nd year", "3rd year", "Final year", "Already graduated"] },
    { id: "challenges", section: "Alumni connections", type: "multi", other: true, title: "What challenges have you faced while connecting with alumni?", help: "Select all that apply.", image: "images/jaipur.jpeg", caption: "Hawa Mahal, Jaipur",
      options: ["I don’t know which alumni are relevant to me", "I don’t have their contact details", "They don’t respond", "I don’t have the right network", "I don’t know how to approach them", "I haven’t faced any challenges"] },
    { id: "frequency", type: "choice", title: "How often do you talk to alumni?", art: "charminar", options: ["Never", "Once or twice a year", "Every few months", "Every month or more"] },
    { id: "interest", type: "rating", title: "How useful would a platform that connects you with alumni be?", art: "lotus", low: "Not useful", high: "Very useful" },
    { id: "ideas", section: "Your ideas", type: "long", required: false, title: "Anything you’d want this platform to do?", help: "Optional. Share any feature or idea.", placeholder: "Type here…", art: "redfort" },
    { id: "city", type: "text", title: "Which city do you live in?", help: "Optional hint under the question.", placeholder: "e.g. Jaipur", art: "hawamahal",
      options: [" Delhi", "Noida", "West Bengal", "Odisha", "Jaipur", "Gurugram", "Punjab", "Chandigard", "Mumbai", "Himachal Pradesh", "Bhopal",] },
    { id: "mode", type: "choice", title: "How do you prefer to meet alumni?", options: ["Online", "On campus", "Events"], other: true },
  ]
};
/* ============ END OF EDITABLE PART ============ */

/* Monument illustrations (simple drawn silhouettes) */
const R = (x, y, c, dx, w, h) => { let d = ""; for (let i = 0; i < c; i++) d += `M${x + i * dx} ${y}h${w}v${h}h-${w}z`; return `<path d="${d}"/>`; };
const W = (x, y, c, r, dx, dy, w, h) => { let d = ""; for (let i = 0; i < c; i++) for (let j = 0; j < r; j++) d += `M${x + i * dx} ${y + j * dy}h${w}v${h}h-${w}z`; return `<path class="cut" d="${d}"/>`; };
const MON = {
  tajmahal: ["Taj Mahal, Agra", `<rect x="30" y="100" width="180" height="6"/><rect x="76" y="62" width="88" height="44"/><path d="M80 64C80 18 160 18 160 64z"/><rect x="119" y="6" width="2" height="16"/><path d="M52 78Q52 60 66 60Q80 60 80 78z"/><path d="M160 78Q160 60 174 60Q188 60 188 78z"/><rect x="34" y="52" width="8" height="54"/><path d="M34 52Q38 42 42 52z"/><rect x="198" y="52" width="8" height="54"/><path d="M198 52Q202 42 206 52z"/><path class="cut" d="M112 106V84a8 8 0 0 1 16 0v22z"/>`],
  indiagate: ["India Gate, New Delhi", `<path fill-rule="evenodd" d="M62 106V36h116v70zM106 106V66a14 14 0 0 1 28 0v40z"/><rect x="56" y="28" width="128" height="8"/><rect x="92" y="18" width="56" height="10"/>`],
  qutubminar: ["Qutub Minar, Delhi", `<path d="M106 106L111 24H129L134 106z"/><rect x="104" y="46" width="32" height="4"/><rect x="105" y="68" width="30" height="4"/><rect x="104" y="88" width="32" height="4"/><path d="M111 24Q120 6 129 24z"/><rect x="88" y="100" width="64" height="6"/>`],
  hawamahal: ["Hawa Mahal, Jaipur", `<rect x="52" y="52" width="136" height="54"/><rect x="72" y="34" width="96" height="18"/><rect x="94" y="18" width="52" height="16"/><path d="M104 18Q120 2 136 18z"/><path d="M52 52Q64 40 76 52z"/><path d="M164 52Q176 40 188 52z"/>${W(58, 58, 10, 3, 13, 15, 6, 9)}${W(78, 38, 7, 1, 13, 0, 6, 9)}${W(100, 22, 4, 1, 13, 0, 6, 8)}`],
  gateway: ["Gateway of India, Mumbai", `<path fill-rule="evenodd" d="M66 106V54h108v52zM104 106V76a16 16 0 0 1 32 0v30z"/><path d="M96 54Q120 18 144 54z"/><rect x="118" y="24" width="4" height="12"/><rect x="64" y="40" width="14" height="14"/><path d="M64 40Q71 28 78 40z"/><rect x="162" y="40" width="14" height="14"/><path d="M162 40Q169 28 176 40z"/>`],
  charminar: ["Charminar, Hyderabad", `<path fill-rule="evenodd" d="M72 106V56h96v50zM90 106V78a8 8 0 0 1 16 0v28zM134 106V78a8 8 0 0 1 16 0v28z"/><rect x="60" y="26" width="12" height="80"/><rect x="168" y="26" width="12" height="80"/><path d="M60 26Q66 10 72 26z"/><path d="M168 26Q174 10 180 26z"/><rect x="58" y="44" width="16" height="4"/><rect x="166" y="44" width="16" height="4"/><path d="M96 56Q104 42 112 56zM128 56Q136 42 144 56z"/>`],
  lotus: ["Lotus Temple, New Delhi", `<path d="M120 18Q146 60 120 102Q94 60 120 18z"/><path d="M120 102Q74 84 64 44Q104 54 120 102z"/><path d="M120 102Q166 84 176 44Q136 54 120 102z"/><path d="M120 102Q58 104 32 76Q84 70 120 102z"/><path d="M120 102Q182 104 208 76Q156 70 120 102z"/><rect x="20" y="102" width="200" height="4"/>`],
  redfort: ["Red Fort, Delhi", `<rect x="24" y="66" width="192" height="40"/>${R(24, 58, 12, 16, 8, 8)}<rect x="96" y="44" width="48" height="62"/><path d="M96 44Q103 30 110 44zM130 44Q137 30 144 44z"/><path d="M110 44Q120 24 130 44z"/><path class="cut" d="M110 106V80a10 10 0 0 1 20 0v26z"/>`]
};
const KEYS = Object.keys(MON);
function art(q, k) {
  if (q && q.image) return `<img class="art" src="${esc(q.image)}" alt="${esc(q.caption || "")}" height="140">`;
  const m = MON[q && q.art] ? q.art : KEYS[(k || 0) % KEYS.length];
  return `<div class="art"><svg viewBox="0 0 240 106" role="img" aria-label="${esc(MON[m][0])}"><circle class="sun" cx="200" cy="34" r="16"/><g class="mon">${MON[m][1]}</g></svg><span>${esc(MON[m][0])}</span></div>`;
}

const Q = SURVEY.questions, ans = {}, app = document.getElementById("app");
let i = -1, sec = "";
const esc = t => String(t == null ? "" : t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const bar = () => '<div class="bar">' + Q.map((_, k) => `<i class="${k < i ? "done" : k === i ? "now" : ""}"></i>`).join("") + "</div>";

function intro() {
  app.innerHTML = `${art({ art: SURVEY.introArt })}<h1>${esc(SURVEY.title)}</h1><p class="lead">${esc(SURVEY.description)}</p>
  <ul>${SURVEY.perks.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
  <button class="btn" id="go">${esc(SURVEY.startButton)}</button>`;
  document.getElementById("go").onclick = () => { i = 0; show(); };
}

function show() {
  const q = Q[i], a = ans[q.id] || {};
  if (q.section) sec = q.section;
  let body = "";
  if (q.type === "text") body = `<input class="in" id="f" value="${esc(a.v)}" placeholder="${esc(q.placeholder)}" autocomplete="off">`;
  if (q.type === "long") body = `<textarea class="in" id="f" placeholder="${esc(q.placeholder)}">${esc(a.v)}</textarea>`;
  if (q.type === "choice" || q.type === "multi") {
    const kind = q.type === "multi" ? "checkbox" : "radio", sel = a.v || [];
    const opts = q.options.concat(q.other ? ["Other"] : []);
    body = '<div class="opts">' + opts.map(o => `<label class="opt"><input type="${kind}" name="o" value="${esc(o)}" ${sel.includes(o) ? "checked" : ""}><span>${esc(o)}</span></label>`).join("") +
      `</div>` + (q.other ? `<input class="in other" id="oth" placeholder="Please specify" value="${esc(a.o)}" hidden>` : "");
  }
  if (q.type === "rating") {
    body = '<div class="scale">' + [1, 2, 3, 4, 5].map(n => `<label class="opt"><input type="radio" name="r" value="${n}" ${a.v == n ? "checked" : ""}>${n}</label>`).join("") +
      `</div><div class="ends"><span>${esc(q.low)}</span><span>${esc(q.high)}</span></div>`;
  }
  const last = i === Q.length - 1;
  app.innerHTML = `${bar()}${art(q, i)}<p class="sec">${esc(sec)} · ${i + 1} of ${Q.length}</p><h2>${esc(q.title)}</h2>
  ${q.help ? `<p class="help">${esc(q.help)}</p>` : ""}${body}<p class="err" id="err" role="alert"></p>
  <div class="row"><button class="back" id="back" ${i === 0 ? "hidden" : ""}>Back</button><button class="btn" id="next">${last ? "Submit answers" : "Next"}</button></div>`;
  const oth = document.getElementById("oth");
  const syncOther = () => { if (oth) oth.hidden = !app.querySelector('input[value="Other"]:checked'); };
  app.querySelectorAll(".opt input").forEach(el => el.addEventListener("change", syncOther));
  syncOther();
  const f = document.getElementById("f");
  if (f) { f.focus(); if (q.type === "text") f.addEventListener("keydown", e => { if (e.key === "Enter") next(); }); }
  document.getElementById("back").onclick = () => { save(); i--; show(); };
  document.getElementById("next").onclick = next;
}

function read() {
  const q = Q[i];
  if (q.type === "text" || q.type === "long") return { v: document.getElementById("f").value.trim() };
  if (q.type === "rating") { const c = app.querySelector("input:checked"); return { v: c ? c.value : "" }; }
  const v = [...app.querySelectorAll(".opts input:checked")].map(x => x.value);
  const o = document.getElementById("oth");
  return { v, o: o ? o.value.trim() : "" };
}
function save() { ans[Q[i].id] = read(); }

function next() {
  const q = Q[i], r = read(), err = document.getElementById("err");
  const empty = Array.isArray(r.v) ? r.v.length === 0 : r.v === "";
  if (q.required !== false && empty) { err.textContent = "Please answer this one to continue."; return; }
  if (Array.isArray(r.v) && r.v.includes("Other") && !r.o) { err.textContent = "Please tell us what “Other” is."; return; }
  ans[q.id] = r;
  if (i < Q.length - 1) { i++; show(); } else submit();
}

function flat(q) {
  const a = ans[q.id] || {}, v = a.v;
  if (Array.isArray(v)) return v.map(x => x === "Other" ? "Other: " + a.o : x).join("; ");
  return v == null ? "" : v;
}

async function submit() {
  const btn = document.getElementById("next");
  btn.disabled = true; btn.textContent = "Sending…";
  const answers = {}; Q.forEach(q => answers[q.title] = flat(q));
  const payload = { timestamp: new Date().toISOString(), answers };
  try {
    if (SURVEY.endpoint && !SURVEY.endpoint.includes("PASTE_YOUR_ID_HERE")) {
      await fetch(SURVEY.endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    } else console.log("Test mode (no endpoint set):", payload);
    app.innerHTML = `${art({ art: "tajmahal" })}<h1>${esc(SURVEY.thanksTitle)}</h1><p class="lead">${esc(SURVEY.thanksText)}</p>`;
  } catch (e) {
    btn.disabled = false; btn.textContent = "Submit answers";
    document.getElementById("err").textContent = "Couldn’t send your answers. Check your connection and try again.";
  }
}
intro();
