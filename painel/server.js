/* ===========================================================================
 * Painel de edição — Michelle Pedro (auto-hospedado, sem serviço externo)
 * ---------------------------------------------------------------------------
 * Edita um conjunto curado de campos de src/content/site.json, troca imagens
 * em public/images/ e, ao "Salvar e publicar", reconstrói o site (npm run build).
 *
 * Variáveis de ambiente (defina na VPS):
 *   PANEL_PASSWORD         senha de acesso (obrigatória em produção)
 *   PANEL_SESSION_SECRET   segredo dos cookies de sessão
 *   PANEL_PORT             porta (padrão 4000)
 *   NODE_ENV=production    ativa cookie seguro (HTTPS)
 * =========================================================================== */
"use strict";

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { exec } = require("child_process");
const express = require("express");
const session = require("express-session");
const multer = require("multer");

// --------------------------------------------------------------------------
// Caminhos e configuração
// --------------------------------------------------------------------------
const ROOT = path.resolve(__dirname, "..");
const CONTENT_FILE = path.join(ROOT, "src", "content", "site.json");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const OUT_DIR = path.join(ROOT, "out");
// Se definido, após o build o conteúdo de out/ é copiado para esta pasta
// (a que o Nginx serve na VPS). Vazio = apenas builda (uso local/testes).
const PUBLISH_DIR = process.env.PANEL_PUBLISH_DIR || "";

const PORT = Number(process.env.PANEL_PORT) || 4000;
const PASSWORD = process.env.PANEL_PASSWORD || "troque-esta-senha";
const SESSION_SECRET =
  process.env.PANEL_SESSION_SECRET || crypto.randomBytes(24).toString("hex");
const IS_PROD = process.env.NODE_ENV === "production";
const BASE = "/painel";

if (IS_PROD && PASSWORD === "troque-esta-senha") {
  console.error("ERRO: defina PANEL_PASSWORD antes de rodar em produção.");
  process.exit(1);
}

// Campos editáveis (caminho no site.json + rótulo + tipo)
const FIELDS = [
  { key: "contato.whatsappNumero", label: "WhatsApp — número exibido", type: "text" },
  { key: "contato.whatsappInternacional", label: "WhatsApp — internacional (só dígitos: 55 + DDD + número)", type: "text" },
  { key: "contato.instagramUsuario", label: "Instagram — @usuário", type: "text" },
  { key: "contato.instagramUrl", label: "Instagram — link", type: "text" },
  { key: "hero.headline", label: "Topo — frase principal", type: "text" },
  { key: "hero.subtexto", label: "Topo — subtexto", type: "textarea" },
  { key: "sobre.paragrafos", label: "Sobre — parágrafos (separe cada um por uma linha em branco)", type: "paragraphs" },
  { key: "sobre.citacao", label: "Sobre — citação", type: "textarea" },
  { key: "rodape.atendimento", label: "Rodapé — texto de atendimento", type: "text" },
  { key: "hero.imagem", label: "Foto do topo", type: "image" },
  { key: "sobre.imagem", label: 'Foto da seção "Sobre"', type: "image" },
  { key: "paraQuem.imagem", label: 'Foto da seção "Para quem é"', type: "image" },
];

// --------------------------------------------------------------------------
// Helpers de conteúdo (JSON)
// --------------------------------------------------------------------------
const readContent = () => JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
const writeContent = (data) =>
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2) + "\n");

function getPath(obj, dotted) {
  return dotted.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}
function setPath(obj, dotted, value) {
  const keys = dotted.split(".");
  const last = keys.pop();
  const target = keys.reduce((o, k) => (o[k] == null ? (o[k] = {}) : o[k], o[k]), obj);
  target[last] = value;
}

// --------------------------------------------------------------------------
// Segurança
// --------------------------------------------------------------------------
function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

// Rate limit simples de login (por IP)
const attempts = new Map();
function loginBlocked(ip) {
  const a = attempts.get(ip);
  if (!a) return false;
  return a.count >= 6 && Date.now() - a.last < 10 * 60 * 1000; // 6 tentativas / 10 min
}
function noteFail(ip) {
  const a = attempts.get(ip) || { count: 0, last: 0 };
  a.count += 1;
  a.last = Date.now();
  attempts.set(ip, a);
}

// --------------------------------------------------------------------------
// Upload de imagens
// --------------------------------------------------------------------------
function sanitizeName(name) {
  return path
    .basename(String(name))
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+/, "");
}
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, IMAGES_DIR),
    filename: (req, file, cb) => cb(null, sanitizeName(file.originalname)),
  }),
  limits: { fileSize: 8 * 1024 * 1024, files: 12 },
  fileFilter: (req, file, cb) => {
    const ok = /^image\/(jpe?g|png|webp|avif|gif)$/.test(file.mimetype);
    cb(ok ? null : new Error("O arquivo enviado não é uma imagem válida."), ok);
  },
});
const uploadImages = upload.fields(
  FIELDS.filter((f) => f.type === "image").map((f) => ({ name: f.key, maxCount: 1 }))
);

// --------------------------------------------------------------------------
// Build (publicação)
// --------------------------------------------------------------------------
let building = false;
function runBuild() {
  return new Promise((resolve, reject) => {
    exec(
      "npm run build",
      { cwd: ROOT, timeout: 180000, maxBuffer: 20 * 1024 * 1024 },
      (err, stdout, stderr) => (err ? reject(new Error(stderr || stdout || err.message)) : resolve(stdout))
    );
  });
}

// Reconstrói o site e, se PUBLISH_DIR estiver definido, copia out/ para lá.
async function publish() {
  await runBuild();
  if (PUBLISH_DIR) {
    fs.cpSync(OUT_DIR, PUBLISH_DIR, { recursive: true, force: true });
  }
}

// --------------------------------------------------------------------------
// HTML
// --------------------------------------------------------------------------
const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function layout(title, body) {
  return `<!doctype html><html lang="pt-BR"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
  :root{--verde:#2e4a3a;--verde2:#3e6b52;--dourado:#c2a04c;--creme:#f6f0e4;--bege:#ede4d3;--texto:#2a2a28}
  *{box-sizing:border-box} body{margin:0;font-family:system-ui,Segoe UI,Roboto,sans-serif;background:var(--creme);color:var(--texto)}
  header{background:var(--verde);color:var(--creme);padding:16px 20px;display:flex;justify-content:space-between;align-items:center}
  header b{font-size:18px} header a{color:var(--creme);opacity:.85;text-decoration:none;font-size:14px}
  main{max-width:820px;margin:24px auto;padding:0 16px}
  .card{background:#fff;border:1px solid #0000000f;border-radius:14px;padding:20px;margin-bottom:16px;box-shadow:0 1px 3px #2e4a3a12}
  label{display:block;font-weight:600;margin:14px 0 6px;font-size:14px}
  input[type=text],textarea{width:100%;padding:10px 12px;border:1px solid #00000022;border-radius:10px;font:inherit;background:#fff}
  textarea{min-height:90px;resize:vertical}
  .img-row{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
  .img-row img{width:96px;height:120px;object-fit:cover;border-radius:10px;border:1px solid #00000022;background:var(--bege)}
  .btn{display:inline-flex;gap:8px;align-items:center;background:var(--dourado);color:var(--verde);border:0;border-radius:999px;padding:12px 22px;font-weight:700;font-size:15px;cursor:pointer}
  .btn:hover{filter:brightness(1.05)} .btn.secondary{background:transparent;color:var(--verde);border:1px solid var(--verde)}
  .bar{position:sticky;bottom:0;background:var(--creme);padding:14px 0;display:flex;gap:12px;align-items:center;border-top:1px solid #00000014}
  .muted{color:#55534d;font-size:13px} .ok{background:#e7f2ea;border:1px solid #2e7d4f44;color:#1e6b3f;padding:12px 14px;border-radius:10px;margin-bottom:16px}
  .err{background:#fce9e6;border:1px solid #c0392b55;color:#a3271b;padding:12px 14px;border-radius:10px;margin-bottom:16px;white-space:pre-wrap}
  .login{max-width:360px;margin:12vh auto} h2{color:var(--verde);margin:0 0 4px}
</style></head><body>${body}</body></html>`;
}

function fieldHtml(field, content) {
  const value = getPath(content, field.key);
  if (field.type === "image") {
    const file = value ? path.basename(String(value)) : "";
    const preview = file ? `${BASE}/img/${esc(file)}` : "";
    return `<label>${esc(field.label)}</label>
      <div class="img-row">
        ${preview ? `<img src="${preview}" alt="">` : `<div class="muted">(sem imagem)</div>`}
        <input type="file" name="${esc(field.key)}" accept="image/*">
        <span class="muted">Atual: ${esc(value || "—")}</span>
      </div>`;
  }
  if (field.type === "paragraphs") {
    const text = Array.isArray(value) ? value.join("\n\n") : "";
    return `<label>${esc(field.label)}</label><textarea name="${esc(field.key)}" style="min-height:160px">${esc(text)}</textarea>`;
  }
  if (field.type === "textarea") {
    return `<label>${esc(field.label)}</label><textarea name="${esc(field.key)}">${esc(value)}</textarea>`;
  }
  return `<label>${esc(field.label)}</label><input type="text" name="${esc(field.key)}" value="${esc(value)}">`;
}

function editPage(content, msg) {
  const groups = {
    "Contato e links": ["contato.whatsappNumero", "contato.whatsappInternacional", "contato.instagramUsuario", "contato.instagramUrl"],
    "Textos": ["hero.headline", "hero.subtexto", "sobre.paragrafos", "sobre.citacao", "rodape.atendimento"],
    "Imagens": ["hero.imagem", "sobre.imagem", "paraQuem.imagem"],
  };
  const cards = Object.entries(groups)
    .map(([titulo, keys]) => {
      const inner = keys
        .map((k) => fieldHtml(FIELDS.find((f) => f.key === k), content))
        .join("");
      return `<div class="card"><h2>${esc(titulo)}</h2>${inner}</div>`;
    })
    .join("");
  const banner = msg ? (msg.ok ? `<div class="ok">${esc(msg.ok)}</div>` : `<div class="err">${esc(msg.err)}</div>`) : "";
  return layout(
    "Painel — Michelle Pedro",
    `<header><b>Painel do site</b><a href="${BASE}/sair">Sair</a></header>
     <main>
       ${banner}
       <form method="post" action="${BASE}/salvar" enctype="multipart/form-data">
         ${cards}
         <div class="bar">
           <button class="btn" type="submit">Salvar e publicar</button>
           <span class="muted">A publicação leva até ~30 segundos.</span>
         </div>
       </form>
     </main>`
  );
}

function loginPage(error) {
  return layout(
    "Entrar — Painel",
    `<main class="login"><div class="card">
       <h2>Painel do site</h2>
       <p class="muted">Entre para editar o conteúdo.</p>
       ${error ? `<div class="err">${esc(error)}</div>` : ""}
       <form method="post" action="${BASE}/login">
         <label>Senha</label>
         <input type="password" name="senha" autofocus style="width:100%;padding:10px 12px;border:1px solid #00000022;border-radius:10px;font:inherit">
         <div style="margin-top:16px"><button class="btn" type="submit">Entrar</button></div>
       </form>
     </div></main>`
  );
}

// --------------------------------------------------------------------------
// App
// --------------------------------------------------------------------------
const app = express();
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    name: "painel.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "strict", secure: IS_PROD, maxAge: 8 * 60 * 60 * 1000 },
  })
);

const requireAuth = (req, res, next) =>
  req.session && req.session.authed ? next() : res.redirect(`${BASE}/login`);

// Prévia das imagens (públicas de qualquer forma)
app.use(`${BASE}/img`, express.static(IMAGES_DIR));

app.get(`${BASE}/login`, (req, res) => res.send(loginPage(null)));

app.post(`${BASE}/login`, (req, res) => {
  const ip = req.ip || "?";
  if (loginBlocked(ip)) return res.status(429).send(loginPage("Muitas tentativas. Aguarde alguns minutos."));
  if (safeEqual(req.body.senha || "", PASSWORD)) {
    attempts.delete(ip);
    req.session.authed = true;
    return res.redirect(BASE);
  }
  noteFail(ip);
  return res.status(401).send(loginPage("Senha incorreta."));
});

app.get(`${BASE}/sair`, (req, res) => req.session.destroy(() => res.redirect(`${BASE}/login`)));

app.get(BASE, requireAuth, (req, res) => res.send(editPage(readContent(), null)));

app.post(`${BASE}/salvar`, requireAuth, (req, res) => {
  uploadImages(req, res, async (uploadErr) => {
    if (uploadErr) return res.status(400).send(editPage(readContent(), { err: "Erro no envio: " + uploadErr.message }));
    if (building) return res.status(409).send(editPage(readContent(), { err: "Uma publicação já está em andamento. Aguarde." }));
    building = true;
    try {
      const content = readContent();
      // Campos de texto
      for (const field of FIELDS) {
        if (field.type === "image") continue;
        const raw = req.body[field.key];
        if (raw == null) continue;
        if (field.type === "paragraphs") {
          const list = String(raw).split(/\r?\n\s*\r?\n/).map((s) => s.trim()).filter(Boolean);
          setPath(content, field.key, list);
        } else {
          setPath(content, field.key, String(raw).trim());
        }
      }
      // Imagens enviadas
      const files = req.files || {};
      for (const field of FIELDS) {
        if (field.type !== "image") continue;
        const f = files[field.key] && files[field.key][0];
        if (f) setPath(content, field.key, "/images/" + f.filename);
      }
      writeContent(content);
      await publish();
      building = false;
      return res.send(editPage(readContent(), { ok: "Publicado com sucesso! O site já está atualizado." }));
    } catch (e) {
      building = false;
      return res.status(500).send(editPage(readContent(), { err: "Falha ao publicar:\n" + (e.message || e) }));
    }
  });
});

app.get("/", (req, res) => res.redirect(BASE));

app.listen(PORT, () => console.log(`Painel rodando em http://localhost:${PORT}${BASE}`));
