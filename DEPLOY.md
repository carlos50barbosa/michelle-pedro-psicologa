# Deploy na VPS — Michelle Pedro Psicóloga

Guia para publicar o site (export estático do Next.js) em uma VPS Linux
da família **RHEL** (AlmaLinux / Rocky / CentOS Stream), servido pelo **Nginx**,
com domínio **www.michellepedro.com.br** registrado no **registro.br** e HTTPS
gratuito (Let's Encrypt).

> **Como o site funciona:** ele é 100% estático. O `next build` gera a pasta
> `out/` com HTML/CSS/JS prontos. Não há processo Node rodando em produção — o
> Nginx apenas serve arquivos. Isso é mais rápido, mais seguro e quase não
> consome recursos da VPS.

---

## Antes de começar, tenha em mãos

- **IP público da VPS:** `82.25.77.26`.
- **Acesso SSH:** `ssh root@82.25.77.26` (login como `root`, por senha).
- **Distribuição:** AlmaLinux. Os comandos abaixo são para AlmaLinux 9 (RHEL 9).
  Como o login é `root`, os comandos vão **sem `sudo`**.
- O domínio `michellepedro.com.br` **ativo** (pago) no registro.br.

---

## Passo 1 — Apontar o domínio no registro.br (DNS)

Faça isso **primeiro**, porque o DNS leva de minutos a algumas horas para
propagar.

1. Acesse <https://registro.br>, faça login e abra o domínio
   **michellepedro.com.br**.
2. Vá em **DNS** → use os **servidores DNS do registro.br** (opção padrão,
   "Usar os servidores do Registro.br"). Você vai editar a **zona DNS**.
3. Crie/edite os registros abaixo:

   | Tipo  | Nome (host) | Valor / Destino            |
   | ----- | ----------- | -------------------------- |
   | A     | `@`         | `82.25.77.26`              |
   | CNAME | `www`       | `michellepedro.com.br.`    |

   - O `A` em `@` faz o domínio raiz apontar para a VPS.
   - O `CNAME` em `www` faz o `www` seguir o raiz. (Alternativa: um registro
     `A` em `www` também apontando para `82.25.77.26` — funciona igual.)
   - Se a VPS tiver **IPv6**, adicione também um `AAAA` em `@` com o IPv6.

4. Salve. Confira a propagação (pode demorar):

   ```bash
   # de qualquer máquina
   nslookup www.michellepedro.com.br
   nslookup michellepedro.com.br
   ```

   Os dois precisam responder com `82.25.77.26` antes de emitir o certificado SSL
   (Passo 5). Enquanto não propagar, siga os passos 2 a 4 normalmente.

---

## Passo 2 — Preparar a VPS (Nginx + firewall + SELinux)

Conecte via SSH e rode:

```bash
# 1. Atualizar o sistema
dnf update -y

# 2. Instalar o Nginx
dnf install -y nginx

# 3. Habilitar e iniciar o Nginx
systemctl enable --now nginx

# 4. Liberar HTTP e HTTPS no firewall (firewalld é padrão no RHEL)
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

# 5. (RHEL tem SELinux ativo) Permitir que o Nginx faça conexões de rede,
#    necessário para o Certbot validar e renovar o certificado.
setsebool -P httpd_can_network_connect 1
```

Teste abrindo `http://82.25.77.26` no navegador — deve aparecer a página padrão do
Nginx. (Se não abrir, o problema é firewall do provedor ou da VPS.)

---

## Passo 3 — Enviar os arquivos do site para a VPS

O site é construído **na sua máquina** (Windows) e só os arquivos prontos vão
para a VPS — assim a VPS não precisa nem ter o Node instalado.

### 3.1 — Gerar o build (na sua máquina, dentro do projeto)

```bash
npm install      # só na primeira vez
npm run build    # gera a pasta out/
```

### 3.2 — Criar a pasta do site na VPS

```bash
# na VPS
mkdir -p /var/www/michellepedro
chown -R $USER:$USER /var/www/michellepedro
```

### 3.3 — Enviar a pasta `out/` para a VPS

Escolha **uma** das opções, rodando **na sua máquina** (na raiz do projeto):

**Opção A — rsync (recomendado; pelo Git Bash no Windows):**

```bash
rsync -avz --delete out/ root@82.25.77.26:/var/www/michellepedro/
```

**Opção B — scp:**

```bash
scp -r out/* root@82.25.77.26:/var/www/michellepedro/
```

> A barra final em `out/` (no rsync) é importante: copia o **conteúdo** da
> pasta, não a pasta em si. Com `--delete`, o rsync também remove na VPS
> arquivos que você apagou localmente (mantém os dois lados idênticos).

### 3.4 — Ajustar permissões e contexto SELinux (na VPS)

```bash
# Dono correto para o Nginx servir
chown -R nginx:nginx /var/www/michellepedro

# Contexto SELinux para conteúdo web (senão dá 403 Forbidden)
semanage fcontext -a -t httpd_sys_content_t "/var/www/michellepedro(/.*)?"
restorecon -Rv /var/www/michellepedro
```

> Se o comando `semanage` não existir, instale:
> `dnf install -y policycoreutils-python-utils`

---

## Passo 4 — Configurar o Nginx (www como principal)

Crie o arquivo de configuração do site:

```bash
nano /etc/nginx/conf.d/michellepedro.conf
```

Cole o conteúdo abaixo:

```nginx
# Redireciona o domínio raiz (sem www) para o www
server {
    listen 80;
    listen [::]:80;
    server_name michellepedro.com.br;
    return 301 https://www.michellepedro.com.br$request_uri;
}

# Site principal (www)
server {
    listen 80;
    listen [::]:80;
    server_name www.michellepedro.com.br;

    root /var/www/michellepedro;
    index index.html;

    # Regra do export estático do Next.js:
    # tenta o arquivo, depois .html, depois pasta, senão 404.
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Cache longo para os assets versionados do Next (têm hash no nome)
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Página de erro do próprio site
    error_page 404 /404.html;
}
```

Valide e recarregue:

```bash
nginx -t
systemctl reload nginx
```

Agora `http://www.michellepedro.com.br` já deve mostrar o site (assim que o DNS
do Passo 1 tiver propagado).

---

## Passo 5 — Ativar o HTTPS (Let's Encrypt / Certbot)

> Só execute depois que `nslookup www.michellepedro.com.br` e
> `nslookup michellepedro.com.br` já apontarem para `82.25.77.26`.

```bash
# Instalar o Certbot (precisa do repositório EPEL no RHEL)
dnf install -y epel-release
dnf install -y certbot python3-certbot-nginx

# Emitir o certificado para os dois domínios e configurar o Nginx
certbot --nginx -d michellepedro.com.br -d www.michellepedro.com.br
```

Quando perguntar, escolha **redirecionar HTTP para HTTPS**. O Certbot ajusta o
`michellepedro.conf` sozinho, adicionando os blocos `443` e o redirecionamento.

A renovação automática já vem configurada. Para conferir:

```bash
systemctl status certbot-renew.timer   # ou: certbot.timer
certbot renew --dry-run
```

---

## Passo 6 — Verificação final

- [ ] `https://www.michellepedro.com.br` abre o site com cadeado (HTTPS).
- [ ] `http://www.michellepedro.com.br` redireciona para `https://`.
- [ ] `https://michellepedro.com.br` (sem www) redireciona para o `www`.
- [ ] `https://www.michellepedro.com.br/sitemap.xml` carrega.
- [ ] `https://www.michellepedro.com.br/robots.txt` carrega.
- [ ] As imagens e o botão de WhatsApp funcionam.

Teste extra de segurança/SEO: <https://www.ssllabs.com/ssltest/> e o
**Search Console** do Google (cadastre a propriedade e envie o sitemap).

---

## Atualizar o site depois (rotina)

Sempre que mudar o conteúdo (ex.: textos em `src/content/site.ts` ou imagens em
`public/images/`):

```bash
# na sua máquina
npm run build
rsync -avz --delete out/ root@82.25.77.26:/var/www/michellepedro/

# na VPS (só se o SELinux reclamar de arquivos novos)
restorecon -Rv /var/www/michellepedro
```

Não precisa reiniciar o Nginx para troca de conteúdo estático — os arquivos
novos já passam a ser servidos. (`systemctl reload nginx` só é necessário
se você mudar a **configuração** do Nginx.)

---

## Observações importantes

- **Trocar o domínio?** Se um dia o endereço mudar, atualize `url` em
  [`src/content/site.ts`](src/content/site.ts) **e** refaça o build — esse valor
  é usado em SEO, sitemap, robots e dados estruturados (JSON-LD).
- **Imagens:** estão como `unoptimized` (sem o otimizador do Next, que exige
  servidor). Para o site ficar leve, salve as imagens já comprimidas e no
  tamanho certo em `public/images/` antes do build.
- **Build na própria VPS (alternativa):** se preferir versionar e buildar no
  servidor, instale o Node 20+ na VPS, clone o repositório, rode
  `npm ci && npm run build` e aponte o `root` do Nginx para a pasta `out/` do
  projeto. O passo a passo acima evita isso de propósito, mantendo a VPS enxuta.
