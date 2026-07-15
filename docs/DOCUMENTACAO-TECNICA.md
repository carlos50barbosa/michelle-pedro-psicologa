# Documentação Técnica — Site Michelle Pedro (Psicóloga)

> Referência para desenvolvedores/manutenção. Para o guia da cliente, veja
> [`GUIA-MICHELLE.md`](GUIA-MICHELLE.md).

---

## 1. Visão geral

Landing page institucional de psicóloga, focada em levar o visitante a **falar
no WhatsApp**. Site **100% estático** (sem banco de dados, sem processo Node em
produção para o site): o `next build` gera HTML/CSS/JS na pasta `out/`, e o
**Nginx** serve esses arquivos.

A edição de conteúdo pela cliente é feita por um **painel próprio, auto-hospedado**
(um pequeno app Node/Express que roda na VPS, separado do site).

| Item | Valor |
| --- | --- |
| Produção | https://www.michellepedro.com.br |
| Painel de edição | https://michellepedro.com.br/painel |
| Repositório | Git — branch `main` (URL mantida em local restrito) |
| Servidor (VPS) | AlmaLinux 9, Node 20 (compartilhada; IP mantido em local restrito) |
| SSL | Let's Encrypt (certbot), renovação automática |
| Analytics | Google Analytics 4 (`G-HH5ERVL3M1`), atrás de consentimento (LGPD) |

## 2. Stack

- **Next.js 16** (App Router) com `output: "export"` (exportação estática) + Turbopack
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens de cor/fonte em `src/app/globals.css`)
- **next/font** — Cormorant Garamond (títulos), Mulish (corpo), Sacramento (script)
- **framer-motion** (animações sutis), **lucide-react** (ícones)
- `next/image` com `images.unoptimized: true` (necessário no export estático)

> ⚠️ `next.config.ts` usa `output: "export"` e `images.unoptimized`. Recursos que
> exigem servidor Node (SSR dinâmico, rotas de API com request, ISR, otimização de
> imagem padrão) **não** funcionam.

## 3. Estrutura

```
src/
  app/          layout (fontes, SEO, JSON-LD), page, sitemap.ts, robots.ts,
                icon.svg, apple-icon.png, favicon.ico
  components/
    layout/     Navbar, Footer, WhatsAppFloat, CookieConsent, WhatsAppTracking
    sections/   Hero, Sobre, Especialidades, ParaQuem, ComoFunciona,
                TerapiaOnline, Depoimentos, FAQ, CtaFinal
    ui/         Button, Section, Reveal, Icon, etc.
  content/
    site.json   ← TODO o conteúdo editável (fonte da verdade)
    site.ts     ← apenas reexporta o site.json (import { site })
  lib/          whatsapp.ts (monta o link do wa.me)
public/images/  fotos + og-image
painel/         app do painel de edição (Node/Express) — ver seção 7
docs/           esta documentação
tina/           (legado) config do TinaCMS — NÃO usado, ver seção 11
```

### Conteúdo (`site.json`)

Todos os textos, links e caminhos de imagem ficam em `src/content/site.json`.
`site.ts` só faz `import siteData from "./site.json"; export const site = siteData;`.
Os componentes usam `import { site } from "@/content/site"`.

## 4. Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000  (use -- -p 3001 p/ outra porta)
npm run build    # gera ./out
npm run lint
```

## 5. Infraestrutura (VPS)

- **SSH:** `ssh root@IP-DA-VPS` (acesso por chave; IP em local restrito).
- **Nginx:** config do site em `/etc/nginx/conf.d/michellepedro.conf`
  (gerenciada em parte pelo certbot). Serve `/var/www/michellepedro` (o `out/`)
  e faz `proxy_pass` de `/painel` para `127.0.0.1:4000`.
- **Diretório servido:** `/var/www/michellepedro` (dono: `painel`).
- **Projeto na VPS:** `/opt/michellepedro` (clone do repo, dono: usuário de
  serviço `painel`, sem shell de login).
- **SELinux:** desativado nesta VPS.
- Domínio no registrador aponta A `@` → IP da VPS e CNAME `www` → raiz.

## 6. Deploy

O deploy é **baseado em Git**. Fluxo padrão para publicar mudanças de **código**:

```bash
# 1) local
git push

# 2) na VPS
cd /opt/michellepedro
sudo -u painel git checkout -- package-lock.json painel/package-lock.json   # descarta ruído do lock
sudo -u painel git pull --ff-only origin main
sudo -u painel env HOME=/opt/michellepedro bash -c 'cd /opt/michellepedro && npm run build'
sudo -u painel cp -rf /opt/michellepedro/out/. /var/www/michellepedro/
```

> **⚠️ Cuidados importantes**
> - Use **`npm install`**, **não `npm ci`**, na VPS. O `package-lock.json` foi
>   gerado no Windows e não traz deps opcionais de Linux (`@emnapi/*`), então
>   `npm ci` falha por lockfile fora de sincronia.
> - **Nunca** rode `git reset --hard` em `/opt/michellepedro`: o `site.json` de
>   lá é o **conteúdo ao vivo** editado pela cliente pelo painel. Antes de um
>   `git pull` que toque em `site.json`, confira `git status --short
>   src/content/site.json`. Commits de código não mexem no `site.json`, então o
>   `pull --ff-only` costuma ser seguro.
> - Editar o Nginx nessa VPS é **produção compartilhada** com outros sites —
>   sempre `cp` de backup + `nginx -t` antes de `systemctl reload nginx`.

## 7. Painel de edição (auto-hospedado)

App **Node/Express** em `painel/` (isolado, com seu próprio `package.json`:
`express`, `express-session`, `multer`). Roda na VPS e edita um conjunto **curado**
de campos do `site.json`, faz upload de imagens e, ao "Salvar e publicar",
reconstrói o site.

- **Serviço:** systemd `michellepedro-painel` (`ExecStart=/usr/bin/node
  /opt/michellepedro/painel/server.js`, `User=painel`).
- **Porta:** `127.0.0.1:4000` (exposta como `/painel` pelo Nginx, atrás do HTTPS).
- **Env:** `/etc/michellepedro-painel.env` (chmod 600):
  `PANEL_PASSWORD` (senha inicial), `PANEL_SESSION_SECRET`,
  `PANEL_PUBLISH_DIR=/var/www/michellepedro`, `NODE_ENV=production`,
  `PANEL_PORT=4000`.
- **Publicação:** ao salvar → grava `src/content/site.json` → `npm run build` →
  copia `out/` para `PANEL_PUBLISH_DIR`. O site fica no ar durante o build (só
  troca ao copiar).
- **Senha:** a cliente pode trocar em `/painel/senha`. A partir daí a senha fica
  em **hash (scrypt)** em `painel/.auth.json` (gitignored) e substitui a
  `PANEL_PASSWORD`.

Comandos úteis:
```bash
systemctl status michellepedro-painel
systemctl restart michellepedro-painel     # após atualizar código do painel
journalctl -u michellepedro-painel -n 50
```

## 8. SSL / Certificados

- Emitidos pelo **certbot** (Let's Encrypt). O cert do site cobre
  `michellepedro.com.br` e `www.michellepedro.com.br`.
- **Renovação automática:** `certbot-renew.timer` (systemd). Há um deploy-hook
  em `/etc/letsencrypt/renewal-hooks/deploy/` que recarrega o Nginx.
- Conferir: `certbot certificates` · `certbot renew --dry-run` (usa staging; tem
  rate limit — não abuse).

> Nota: o `curl` do Windows pode recusar o HTTPS (não conhece a raiz nova de 2026
> da Let's Encrypt). É só do curl local — navegadores confiam. Verifique com
> `openssl`/`curl -k`.

## 9. Analytics & consentimento (LGPD)

- **Configuração:** `src/content/site.json` → `analytics: { ga4, metaPixel }`.
  Vazio = nada carrega. Hoje: `ga4 = "G-HH5ERVL3M1"`, `metaPixel = ""`.
- **`CookieConsent.tsx`** (client): mostra o aviso de cookies e **só carrega**
  GA4/Pixel **após o "Aceitar"**. A escolha fica em `localStorage`
  (`mp-cookie-consent`). Recusar é discreto, porém de 1 clique (compatível LGPD).
- **`WhatsAppTracking.tsx`** (client): delegação de clique no documento; ao clicar
  em qualquer link `wa.me` dispara `gtag('event','contato_whatsapp', {...})` e
  (quando o Pixel existir) `fbq('track','Contact')`. Guardado por
  `typeof gtag/fbq === 'function'`, respeitando o consentimento.
- **Meta Pixel:** código pronto, dormente até preencher `metaPixel`. **CAPI** não
  implementada (avaliada; não priorizada para este funil).
- Para marcar conversão: no GA4, marcar `contato_whatsapp` como evento-chave.

## 10. SEO

- `layout.tsx`: metadata (title/description/keywords), Open Graph, Twitter Card,
  `metadataBase`, canonical, e **JSON-LD** (`Psychologist`/`MedicalBusiness`).
- `sitemap.ts` e `robots.ts` (estáticos, `dynamic = "force-static"`).
- `og-image.jpg` 1200×630 em `public/images/`.
- A URL canônica vem de `site.url` — se trocar o domínio, atualize lá e rebuilde.

## 11. Observações / dívidas técnicas

- **TinaCMS é legado/inativo.** O conteúdo migrou para `site.json` (bom), mas o
  painel escolhido foi o próprio (`painel/`). `tina/config.ts` + deps `tinacms`
  seguem instalados só porque `tina/config.ts` é type-checked no build. Podem ser
  removidos para enxugar (remover `tina/`, tirar `tinacms`/`@tinacms/cli` do
  `package.json`, regenerar lock).
- **Depoimentos:** os textos atuais são exemplos. Pela ética do CFP, só publicar
  depoimentos **reais e autorizados por escrito** (ou ocultar a seção com
  `depoimentos.ativo = false`).
- **Imagens:** algumas são geradas por IA (placeholder). Substituir por fotos
  reais da Michelle quando disponíveis (mesmos nomes em `public/images/`).
- **`divulgacao/`** (gitignored): PNGs de posts/stories gerados localmente
  (marketing), não fazem parte do site.

## 12. Acessos necessários para manutenção

- SSH root da VPS (chave) — deploy, Nginx, certbot, serviço do painel.
- GitHub (branch `main`) — código e conteúdo.
- Conta Google (GA4) da cliente — dados de analytics.
- Senha do painel — com a cliente (trocável em `/painel/senha`).

> 🔒 Os dados sensíveis (**IP da VPS, URL do repositório, tokens e senhas**) são
> mantidos **em local restrito, fora deste documento**.

---

_Desenvolvido por **Serviços Tech** · https://servicostech.com.br_
