# Site da Michelle Pedro — Psicóloga 🌿

Landing page profissional para a psicóloga **Michelle Pedro**, feita para
transmitir acolhimento e levar o visitante a **agendar uma consulta pelo
WhatsApp**. É otimizada para celular e para o Google.

> Feita com Next.js + Tailwind CSS. Pronta para publicar de graça na Vercel.

---

## 📋 Índice

1. [Como rodar o site no seu computador](#-como-rodar-o-site-no-seu-computador)
2. [Onde trocar os textos](#-onde-trocar-os-textos)
3. [Onde colocar as fotos](#-onde-colocar-as-fotos)
4. [Como publicar na internet (Vercel — grátis)](#-como-publicar-na-internet-vercel--grátis)
5. [Ligar o Google Analytics / Pixel do Instagram](#-ligar-o-google-analytics--pixel-do-instagram-opcional)
6. [Regras importantes (Ética do CFP)](#️-regras-importantes-ética-do-cfp)

---

## 💻 Como rodar o site no seu computador

> Você só precisa fazer isso se quiser **ver o site antes de publicar**.
> Se quiser apenas publicar, pule para a seção da Vercel.

1. Instale o **Node.js** (versão 20 ou superior): https://nodejs.org (botão "LTS").
2. Abra o **Terminal** (ou Prompt de Comando) dentro da pasta do projeto.
3. Na primeira vez, instale o que o site precisa:
   ```bash
   npm install
   ```
4. Para ver o site funcionando:
   ```bash
   npm run dev
   ```
5. Abra o navegador em **http://localhost:3000**.
6. Para parar, volte ao Terminal e aperte `Ctrl + C`.

---

## ✏️ Onde trocar os textos

**Tudo o que é texto, número e link está em um único arquivo:**

```
src/content/site.ts
```

Abra esse arquivo em qualquer editor de texto (recomendo o
[VS Code](https://code.visualstudio.com/), gratuito). Lá dentro você encontra,
de forma organizada e com comentários:

| O que você quer mudar              | Onde procurar no arquivo   |
| ---------------------------------- | -------------------------- |
| Número do WhatsApp                 | `contato`                  |
| Mensagem que abre no WhatsApp      | `contato.whatsappMensagem` |
| Link do Instagram                  | `contato.instagramUrl`     |
| Frase principal (topo do site)     | `hero.headline`            |
| Texto "Sobre mim"                  | `sobre`                    |
| As especialidades (cards)          | `especialidades.itens`     |
| Perguntas e respostas (FAQ)        | `faq.itens`                |
| Depoimentos                        | `depoimentos`              |
| Textos do rodapé                   | `rodape`                   |

### Dicas ao editar

- **Só troque o que está entre aspas** (`"assim"`). Não apague as aspas nem as
  vírgulas.
- Para **esconder a seção de depoimentos**, mude esta linha:
  ```ts
  depoimentos: {
    ativo: true,   // troque para false para esconder a seção
  ```
- Depois de salvar, se o site estiver rodando (`npm run dev`), ele atualiza
  sozinho no navegador.

---

## 📸 Onde colocar as fotos

As fotos ficam na pasta:

```
public/images/
```

O site já vem com **imagens de exemplo (placeholders)**. Para colocar as fotos
reais da Michelle, basta **substituir os arquivos**, mantendo exatamente
**os mesmos nomes**:

| Nome do arquivo        | Onde aparece                                                   | Formato sugerido           |
| ---------------------- | -------------------------------------------------------------- | -------------------------- |
| `michelle-hero.jpg`    | Topo do site **e** seção "Sobre mim"                           | Vertical, proporção ~5:7 (ex.: 1032 x 1420 px) |
| `michelle-sobre.jpg`   | (Opcional) foto diferente para a seção "Sobre mim"             | Vertical, proporção ~5:7   |
| `og-image.jpg`         | Miniatura ao compartilhar o link (WhatsApp, Instagram, Google) | Horizontal, 1200 x 630 px  |

> Por enquanto, a seção "Sobre mim" usa a **mesma foto do topo**
> (`michelle-hero.jpg`). Se quiser uma foto diferente lá, coloque o arquivo
> `michelle-sobre.jpg` e troque o caminho em `src/content/site.ts` (há um
> comentário indicando o lugar exato, no bloco `sobre`).

> ⚠️ **Use exatamente esses nomes** (tudo em minúsculas, com `.jpg`). Assim o
> site encontra as fotos automaticamente, sem precisar mexer no código.
>
> 💡 Dica: peça à Michelle as fotos em **alta resolução**. Fotos boas fazem
> toda a diferença na sensação de profissionalismo.

---

## 🚀 Como publicar na internet (Vercel — grátis)

A forma mais fácil e gratuita de colocar o site no ar:

### Opção A — pelo site da Vercel (mais simples)

1. Crie uma conta gratuita em https://vercel.com (pode entrar com o GitHub).
2. Coloque este projeto em um repositório no [GitHub](https://github.com)
   (a Vercel tem um passo a passo guiado).
3. Na Vercel, clique em **"Add New… → Project"** e escolha o repositório.
4. Pode deixar tudo no padrão e clicar em **"Deploy"**.
5. Em poucos minutos o site estará no ar com um endereço `.vercel.app`.

### Opção B — pelo Terminal

```bash
npm install -g vercel
vercel
```
Siga as perguntas na tela (pode aceitar os padrões).

### Depois de publicar

- Para usar um **domínio próprio** (ex.: `michellepedro.com.br`), adicione-o em
  **Settings → Domains** no painel da Vercel.
- Atualize o endereço do site no arquivo `src/content/site.ts`, no campo `url:`
  — isso melhora o aparecimento no Google e nos compartilhamentos.

---

## 📊 Ligar o Google Analytics / Pixel do Instagram (opcional)

O site já vem **preparado** para esses serviços, mas eles vêm **desligados**.
Para ativar, abra o arquivo:

```
src/app/layout.tsx
```

No final dele há um bloco comentado com instruções passo a passo. Basta colar o
seu **ID do Google Analytics** (`G-XXXXXXXXXX`) ou o **ID do Pixel** e remover os
sinais de comentário. Se tiver dúvida, peça ajuda a um técnico — é rápido.

---

## ⚖️ Regras importantes (Ética do CFP)

Este site segue o **Código de Ética do Conselho Federal de Psicologia**. Ao
editar os textos, mantenha estes cuidados:

- ✅ O **CRP 08/3678** deve continuar **sempre visível**.
- 🚫 **Não** prometa cura, resultados garantidos ou prazos de "transformação".
- 🚫 **Não** use comparações "antes e depois" nem se anuncie como "a melhor".
- ✅ Os **depoimentos** devem ser **reais e autorizados por escrito**, e nunca
  garantir resultados. (Os que vêm no site são apenas exemplos — substitua ou
  desligue a seção.)
- ✅ Mantenha o aviso de que o site é **informativo** e **não substitui** o
  atendimento individual (já está no rodapé).

---

## 🧩 Para quem é técnico (resumo)

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (tokens de cor/fonte em `src/app/globals.css`)
- **next/font** (Cormorant Garamond, Mulish, Sacramento)
- **next/image** para todas as imagens
- **Framer Motion** (animações sutis, respeitando `prefers-reduced-motion`)
- **lucide-react** para ícones
- SEO completo: metadata, Open Graph, Twitter Cards, **JSON-LD** (`Psychologist`),
  `sitemap.ts` e `robots.ts`
- Conteúdo centralizado em `src/content/site.ts`

### Estrutura das pastas

```
src/
  app/          layout (fontes, SEO, JSON-LD), página, sitemap, robots
  components/
    layout/     Navbar, Footer, botão flutuante do WhatsApp
    sections/   cada bloco da página (Hero, Sobre, FAQ, etc.)
    ui/         peças reutilizáveis (botão, título, ícones, animação)
  content/      site.ts  ← TODOS os textos e links
  lib/          whatsapp.ts (monta o link do WhatsApp)
public/images/  fotos da Michelle + imagem de compartilhamento
```

### Comandos

```bash
npm run dev     # desenvolvimento (localhost:3000)
npm run build   # build de produção
npm run start   # rodar o build de produção
npm run lint    # checar o código
```
