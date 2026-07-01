# Painel de edição (auto-hospedado)

Painel simples e **sem serviços externos** para a Michelle editar textos, links
e imagens do site. Roda na própria VPS.

Ele edita um conjunto curado de campos de [`../src/content/site.json`](../src/content/site.json),
troca imagens em `../public/images/` e, ao **"Salvar e publicar"**, reconstrói o
site (`npm run build`) e — se configurado — copia o resultado para a pasta que o
Nginx serve.

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `PANEL_PASSWORD` | sim (produção) | Senha de acesso ao painel |
| `PANEL_SESSION_SECRET` | recomendada | Segredo dos cookies de sessão (string aleatória longa) |
| `PANEL_PORT` | não | Porta (padrão `4000`) |
| `PANEL_PUBLISH_DIR` | na VPS | Pasta servida pelo Nginx; recebe o `out/` após o build |
| `NODE_ENV` | na VPS | `production` (ativa cookie seguro/HTTPS) |

## Rodar localmente (teste)

```bash
cd painel
npm install
PANEL_PASSWORD=teste123 npm start
# abre em http://localhost:4000/painel
```

Sem `PANEL_PUBLISH_DIR`, o "Publicar" apenas builda (`out/`), sem copiar.

## Instalar na VPS (resumo)

Pré-requisitos: **Node 20+** e o projeto (repositório) na VPS.

1. Clonar/atualizar o repositório na VPS e instalar dependências:
   ```bash
   git clone https://github.com/carlos50barbosa/michelle-pedro-psicologa.git /opt/michellepedro
   cd /opt/michellepedro && npm ci
   cd painel && npm ci
   ```
2. Criar um serviço (`systemd`) que roda o painel com as variáveis de ambiente,
   incluindo `PANEL_PUBLISH_DIR=/var/www/michellepedro` e `NODE_ENV=production`.
3. Publicar uma vez para gerar o `out/` e popular a pasta do Nginx.
4. No Nginx, expor o painel em `/painel` via `proxy_pass` para
   `http://127.0.0.1:4000` (mesmo domínio, já com o HTTPS do Certbot).

> O passo a passo detalhado (systemd unit + bloco Nginx) é aplicado no deploy.

## Campos editáveis

Definidos em [`server.js`](server.js) (constante `FIELDS`). Fáceis de
adicionar/remover: contato (WhatsApp/Instagram), frase e subtexto do topo,
parágrafos e citação do "Sobre", texto de atendimento do rodapé e as três fotos
principais.

## Segurança

- Acesso por senha (comparação em tempo constante) + limite de tentativas.
- Cookies `httpOnly` + `sameSite=strict` (+ `secure` em produção).
- Upload aceita apenas imagens (até 8 MB), com nome de arquivo sanitizado.
- Deve ficar **sempre atrás de HTTPS** (já temos Certbot no domínio).
