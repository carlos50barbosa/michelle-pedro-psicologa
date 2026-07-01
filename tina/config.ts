import { defineConfig } from "tinacms";

// Ícones disponíveis (devem existir em src/components/ui/Icon.tsx)
const iconOptions = [
  "Award",
  "BadgeCheck",
  "Brain",
  "CalendarClock",
  "Compass",
  "GraduationCap",
  "Heart",
  "Home",
  "Laptop",
  "Lock",
  "MapPin",
  "Scale",
  "ShieldCheck",
  "Sparkles",
  "Unlink",
  "Users",
  "Wind",
];

const iconField = {
  type: "string" as const,
  name: "icone",
  label: "Ícone",
  options: iconOptions,
};

export default defineConfig({
  branch: process.env.TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Conteúdo do site",
        path: "src/content",
        format: "json",
        match: { include: "site" },
        ui: {
          // Documento único — não permite criar/apagar.
          allowedActions: { create: false, delete: false },
        },
        fields: [
          // ---------------------------------------------------------------
          // DADOS PRINCIPAIS
          // ---------------------------------------------------------------
          { type: "string", name: "nome", label: "Nome" },
          { type: "string", name: "profissao", label: "Profissão" },
          { type: "string", name: "crp", label: "CRP" },
          { type: "number", name: "anosExperiencia", label: "Anos de experiência" },
          { type: "string", name: "cidade", label: "Cidade" },
          {
            type: "string",
            name: "url",
            label: "URL do site",
            description: "Endereço público (com www). Usado em SEO/sitemap — evite mudar.",
          },

          // ---------------------------------------------------------------
          // CONTATO
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "contato",
            label: "Contato",
            fields: [
              { type: "string", name: "whatsappNumero", label: "WhatsApp (exibido)" },
              {
                type: "string",
                name: "whatsappInternacional",
                label: "WhatsApp (internacional)",
                description: "Só dígitos: 55 + DDD + número (ex.: 5511994674718).",
              },
              {
                type: "string",
                name: "whatsappMensagem",
                label: "Mensagem inicial do WhatsApp",
                ui: { component: "textarea" },
              },
              { type: "string", name: "instagramUsuario", label: "Instagram (@usuário)" },
              { type: "string", name: "instagramUrl", label: "Instagram (link)" },
            ],
          },

          // ---------------------------------------------------------------
          // SEO
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "seo",
            label: "SEO (Google / compartilhamento)",
            fields: [
              { type: "string", name: "title", label: "Título" },
              {
                type: "string",
                name: "description",
                label: "Descrição",
                ui: { component: "textarea" },
              },
              { type: "string", name: "keywords", label: "Palavras-chave", list: true },
              { type: "image", name: "ogImage", label: "Imagem de compartilhamento" },
            ],
          },

          // ---------------------------------------------------------------
          // ANALYTICS / PIXEL
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "analytics",
            label: "Analytics / Pixel",
            description: "Deixe vazio para desativar. Nada carrega sem os IDs.",
            fields: [
              { type: "string", name: "ga4", label: "Google Analytics 4 (G-XXXX)" },
              { type: "string", name: "metaPixel", label: "Meta Pixel (só números)" },
            ],
          },

          // ---------------------------------------------------------------
          // AVISO DE COOKIES (LGPD)
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "cookies",
            label: "Aviso de cookies (LGPD)",
            fields: [
              {
                type: "string",
                name: "texto",
                label: "Texto do aviso",
                ui: { component: "textarea" },
              },
              { type: "string", name: "aceitar", label: 'Botão "Aceitar"' },
              { type: "string", name: "recusar", label: 'Botão "Recusar"' },
            ],
          },

          // ---------------------------------------------------------------
          // MENU (NAVEGAÇÃO)
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "nav",
            label: "Menu (navegação)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Texto" },
              { type: "string", name: "href", label: "Âncora/link (ex.: #sobre)" },
            ],
          },

          // ---------------------------------------------------------------
          // HERO (TOPO)
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "hero",
            label: "Topo (Hero)",
            fields: [
              { type: "string", name: "eyebrow", label: "Linha superior" },
              { type: "string", name: "headline", label: "Frase principal" },
              {
                type: "string",
                name: "subtexto",
                label: "Subtexto",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaPrimario", label: "Botão principal" },
              { type: "string", name: "ctaSecundario", label: "Botão secundário" },
              {
                type: "object",
                name: "selos",
                label: "Selos",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.texto }) },
                fields: [iconField, { type: "string", name: "texto", label: "Texto" }],
              },
              { type: "image", name: "imagem", label: "Imagem" },
              { type: "string", name: "imagemAlt", label: "Descrição da imagem (alt)" },
            ],
          },

          // ---------------------------------------------------------------
          // SOBRE
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "sobre",
            label: "Sobre",
            fields: [
              { type: "string", name: "titulo", label: "Título" },
              {
                type: "string",
                name: "paragrafos",
                label: "Parágrafos",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "destaques",
                label: "Destaques",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.texto }) },
                fields: [iconField, { type: "string", name: "texto", label: "Texto" }],
              },
              {
                type: "string",
                name: "citacao",
                label: "Citação",
                ui: { component: "textarea" },
              },
              { type: "image", name: "imagem", label: "Imagem" },
              { type: "string", name: "imagemAlt", label: "Descrição da imagem (alt)" },
            ],
          },

          // ---------------------------------------------------------------
          // ESPECIALIDADES
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "especialidades",
            label: "Como posso ajudar",
            fields: [
              { type: "string", name: "titulo", label: "Título" },
              {
                type: "string",
                name: "subtitulo",
                label: "Subtítulo",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "itens",
                label: "Itens",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.titulo }) },
                fields: [
                  iconField,
                  { type: "string", name: "titulo", label: "Título" },
                  {
                    type: "string",
                    name: "texto",
                    label: "Texto",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },

          // ---------------------------------------------------------------
          // PARA QUEM É
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "paraQuem",
            label: "Para quem é",
            fields: [
              { type: "string", name: "titulo", label: "Título" },
              {
                type: "string",
                name: "introducao",
                label: "Introdução",
                ui: { component: "textarea" },
              },
              { type: "string", name: "sinais", label: "Sinais", list: true },
              { type: "string", name: "cta", label: "Chamada final" },
              { type: "image", name: "imagem", label: "Imagem" },
              { type: "string", name: "imagemAlt", label: "Descrição da imagem (alt)" },
            ],
          },

          // ---------------------------------------------------------------
          // COMO FUNCIONA
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "comoFunciona",
            label: "Como funciona",
            fields: [
              { type: "string", name: "titulo", label: "Título" },
              { type: "string", name: "subtitulo", label: "Subtítulo" },
              {
                type: "object",
                name: "passos",
                label: "Passos",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.titulo }) },
                fields: [
                  { type: "string", name: "numero", label: "Número" },
                  { type: "string", name: "titulo", label: "Título" },
                  {
                    type: "string",
                    name: "texto",
                    label: "Texto",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },

          // ---------------------------------------------------------------
          // TERAPIA ONLINE
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "terapiaOnline",
            label: "Por que terapia online",
            fields: [
              { type: "string", name: "titulo", label: "Título" },
              {
                type: "string",
                name: "subtitulo",
                label: "Subtítulo",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "beneficios",
                label: "Benefícios",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.titulo }) },
                fields: [
                  iconField,
                  { type: "string", name: "titulo", label: "Título" },
                  {
                    type: "string",
                    name: "texto",
                    label: "Texto",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },

          // ---------------------------------------------------------------
          // DEPOIMENTOS
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "depoimentos",
            label: "Depoimentos",
            fields: [
              {
                type: "boolean",
                name: "ativo",
                label: "Mostrar a seção de depoimentos",
              },
              { type: "string", name: "titulo", label: "Título" },
              {
                type: "string",
                name: "subtitulo",
                label: "Subtítulo",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "itens",
                label: "Depoimentos",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.autor }) },
                fields: [
                  {
                    type: "string",
                    name: "texto",
                    label: "Texto",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "autor", label: "Autor" },
                ],
              },
            ],
          },

          // ---------------------------------------------------------------
          // FAQ
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "faq",
            label: "Perguntas frequentes",
            fields: [
              { type: "string", name: "titulo", label: "Título" },
              {
                type: "string",
                name: "subtitulo",
                label: "Subtítulo",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "itens",
                label: "Perguntas",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.pergunta }) },
                fields: [
                  { type: "string", name: "pergunta", label: "Pergunta" },
                  {
                    type: "string",
                    name: "resposta",
                    label: "Resposta",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },

          // ---------------------------------------------------------------
          // CHAMADA FINAL
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "ctaFinal",
            label: "Chamada final",
            fields: [
              { type: "string", name: "titulo", label: "Título" },
              {
                type: "string",
                name: "subtexto",
                label: "Subtexto",
                ui: { component: "textarea" },
              },
              { type: "string", name: "botao", label: "Botão" },
            ],
          },

          // ---------------------------------------------------------------
          // RODAPÉ
          // ---------------------------------------------------------------
          {
            type: "object",
            name: "rodape",
            label: "Rodapé",
            fields: [
              { type: "string", name: "atendimento", label: "Atendimento" },
              {
                type: "string",
                name: "avisoEtico",
                label: "Aviso ético",
                ui: { component: "textarea" },
              },
              { type: "string", name: "desenvolvidoPor", label: "Desenvolvido por" },
              { type: "string", name: "desenvolvidoPorUrl", label: "Link do desenvolvedor" },
            ],
          },
        ],
      },
    ],
  },
});
