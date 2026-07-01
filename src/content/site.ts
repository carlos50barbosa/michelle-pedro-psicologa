/**
 * ===========================================================================
 *  CONTEÚDO DO SITE — Michelle Pedro · Psicóloga
 * ===========================================================================
 *
 *  👉  Este é o ÚNICO arquivo que você precisa editar para mudar os textos,
 *      números, links e seções do site. Não é preciso mexer no layout.
 *
 *  Dicas:
 *    • Texto entre aspas pode ser trocado livremente.
 *    • Mantenha as aspas e as vírgulas no lugar.
 *    • Para ativar/desativar a seção de depoimentos, mude
 *      `depoimentos.ativo` para true ou false.
 * ===========================================================================
 */

export const site = {
  // -------------------------------------------------------------------------
  // DADOS PRINCIPAIS
  // -------------------------------------------------------------------------
  nome: "Michelle Pedro",
  profissao: "Psicóloga",
  crp: "CRP 08/3678",
  anosExperiencia: 20,
  cidade: "Cajamar/SP",

  // Endereço do site quando publicado (usado em SEO, sitemap e JSON-LD).
  // Deve ser exatamente o domínio principal servido pelo Nginx (com www).
  url: "https://www.michellepedro.com.br",

  // -------------------------------------------------------------------------
  // CONTATO
  // -------------------------------------------------------------------------
  contato: {
    whatsappNumero: "(11) 99467-4718",
    // Número no formato internacional, somente dígitos (55 + DDD + número):
    whatsappInternacional: "5511994674718",
    // Mensagem que já vem escrita quando a pessoa abre o WhatsApp:
    whatsappMensagem:
      "Olá, Michelle! Vim pelo site e gostaria de agendar uma consulta.",
    instagramUsuario: "@psic_mi",
    instagramUrl: "https://www.instagram.com/psic_mi",
  },

  // -------------------------------------------------------------------------
  // SEO (aparece no Google e ao compartilhar o link)
  // -------------------------------------------------------------------------
  seo: {
    title:
      "Michelle Pedro | Psicóloga Online — Ansiedade, Autoestima e Relacionamentos",
    description:
      "Psicoterapia online para adolescentes e adultos. +20 anos de experiência. Cuide da sua ansiedade, autoestima e relacionamentos. Agende sua consulta.",
    keywords: [
      "psicóloga online",
      "terapia online",
      "psicoterapia",
      "ansiedade",
      "autoestima",
      "amor próprio",
      "dependência emocional",
      "relacionamentos",
      "autoconhecimento",
      "Michelle Pedro",
      "CRP 08/3678",
      "psicóloga Cajamar",
    ],
    ogImage: "/images/og-image.jpg",
  },

  // -------------------------------------------------------------------------
  // ANALYTICS / PIXEL (rastreamento)
  // -------------------------------------------------------------------------
  // Cole os IDs quando tiver. Enquanto estiverem VAZIOS ("") nada é carregado
  // e o aviso de cookies nem aparece — o site continua idêntico.
  //   • ga4:       Google Analytics 4, formato "G-XXXXXXXXXX"
  //   • metaPixel: Meta Pixel (Facebook/Instagram), só números, ex. "123456789012345"
  analytics: {
    ga4: "",
    metaPixel: "",
  },

  // Aviso de cookies (LGPD) — textos do banner de consentimento.
  cookies: {
    texto:
      "Usamos cookies de análise (Google e Meta) para entender como o site é usado e melhorar sua experiência. Você pode aceitar ou recusar.",
    aceitar: "Aceitar",
    recusar: "Recusar",
  },

  // -------------------------------------------------------------------------
  // NAVEGAÇÃO (menu do topo)
  // -------------------------------------------------------------------------
  nav: [
    { label: "Início", href: "#topo" },
    { label: "Sobre", href: "#sobre" },
    { label: "Como ajudo", href: "#especialidades" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Perguntas frequentes", href: "#faq" },
  ],

  // -------------------------------------------------------------------------
  // HERO (primeira parte da página)
  // -------------------------------------------------------------------------
  hero: {
    eyebrow: "Psicóloga · CRP 08/3678 · +20 anos de experiência",
    headline: "Você não precisa enfrentar tudo sozinho.",
    subtexto:
      "Psicoterapia online para adolescentes e adultos. Um espaço seguro e acolhedor para cuidar da sua ansiedade, autoestima e relacionamentos — no seu tempo, onde você estiver.",
    ctaPrimario: "Agendar minha consulta",
    ctaSecundario: "Conhecer meu trabalho",
    selos: [
      { icone: "Laptop", texto: "Atendimento online em todo o Brasil" },
      { icone: "Lock", texto: "Sigiloso e seguro" },
      { icone: "Brain", texto: "+20 anos de experiência" },
    ],
    imagem: "/images/michelle-hero.jpg",
    imagemAlt:
      "Michelle Pedro, psicóloga, sorrindo de forma acolhedora em foto profissional",
  },

  // -------------------------------------------------------------------------
  // SOBRE
  // -------------------------------------------------------------------------
  sobre: {
    titulo: "Prazer, sou a Michelle",
    paragrafos: [
      "Sou psicóloga há mais de 20 anos e apaixonada por acompanhar processos de transformação, autoconhecimento e desenvolvimento emocional.",
      "Ao longo dessa trajetória, tive o privilégio de acolher diferentes histórias, desafios e recomeços — sempre acreditando que ninguém precisa enfrentar tudo sozinho.",
      "Meu trabalho é oferecer um espaço seguro, sem julgamentos, onde você possa se reconhecer, se fortalecer e construir uma vida com mais equilíbrio e bem-estar.",
    ],
    destaques: [
      { icone: "Award", texto: "Psicóloga há mais de 20 anos (CRP 08/3678)" },
      {
        icone: "Heart",
        texto:
          "Especialista em autoestima, amor próprio e superação da dependência emocional",
      },
      { icone: "GraduationCap", texto: "Apaixonada por pessoas e por educação" },
    ],
    citacao:
      "Venha para essa jornada de autoconhecimento e transformação.",
    // Usando a mesma foto do topo. Para uma foto diferente aqui, troque o
    // caminho abaixo (ex.: "/images/michelle-sobre.jpg") e coloque o arquivo
    // em public/images/.
    imagem: "/images/michelle-hero.jpg",
    imagemAlt:
      "Michelle Pedro, psicóloga, em foto profissional transmitindo serenidade e confiança",
  },

  // -------------------------------------------------------------------------
  // ESPECIALIDADES (Como posso te ajudar)
  // -------------------------------------------------------------------------
  especialidades: {
    titulo: "Como posso te ajudar",
    subtitulo:
      "Cada processo é único. Estes são alguns dos temas que acompanho de perto:",
    itens: [
      {
        icone: "Wind",
        titulo: "Ansiedade",
        texto:
          "Aprender a lidar com a mente acelerada, a preocupação constante e recuperar a sensação de calma no dia a dia.",
      },
      {
        icone: "Sparkles",
        titulo: "Autoestima e amor próprio",
        texto:
          "Reconstruir a forma como você se enxerga e se valoriza, com mais segurança e gentileza consigo mesmo.",
      },
      {
        icone: "Users",
        titulo: "Relacionamentos",
        texto:
          "Compreender padrões que se repetem, estabelecer limites saudáveis e construir vínculos mais equilibrados.",
      },
      {
        icone: "Unlink",
        titulo: "Dependência emocional",
        texto:
          "Desenvolver autonomia emocional e relações mais leves, sem se perder no outro.",
      },
      {
        icone: "Scale",
        titulo: "Equilíbrio emocional",
        texto:
          "Ferramentas para entender e regular suas emoções, com mais estabilidade e presença.",
      },
      {
        icone: "Compass",
        titulo: "Autoconhecimento",
        texto:
          "Um mergulho em quem você é, suas escolhas e seus desejos — a base de toda transformação.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // PARA QUEM É
  // -------------------------------------------------------------------------
  paraQuem: {
    titulo: "Talvez seja hora de cuidar de você",
    introducao:
      "Buscar terapia não é sinal de fraqueza — é um ato de coragem e cuidado. Alguns sinais comuns:",
    sinais: [
      "Você sente ansiedade ou preocupação que não passa",
      'Tem dificuldade de se valorizar ou de dizer "não"',
      "Repete os mesmos padrões dolorosos nos relacionamentos",
      "Sente-se travado(a), cansado(a) ou desconectado(a) de si",
      "Quer se conhecer melhor e tomar decisões com mais clareza",
    ],
    cta: "Se algo aqui ressoou com você, vamos conversar.",
    imagem: "/images/michelle.jpeg",
    imagemAlt: "Michelle Pedro, psicóloga",
  },

  // -------------------------------------------------------------------------
  // COMO FUNCIONA
  // -------------------------------------------------------------------------
  comoFunciona: {
    titulo: "Como funciona o atendimento online",
    subtitulo: "Simples, do seu jeito e no seu tempo.",
    passos: [
      {
        numero: "01",
        titulo: "Primeiro contato",
        texto: "Você manda uma mensagem no WhatsApp e tira suas dúvidas.",
      },
      {
        numero: "02",
        titulo: "Agendamento",
        texto:
          "Encontramos juntos o melhor dia e horário para a sua sessão.",
      },
      {
        numero: "03",
        titulo: "Sessão online",
        texto:
          "Atendimento por vídeo, de onde você estiver, com total privacidade.",
      },
      {
        numero: "04",
        titulo: "Acompanhamento",
        texto:
          "Sessões regulares para sustentar a sua evolução ao longo do tempo.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // POR QUE TERAPIA ONLINE
  // -------------------------------------------------------------------------
  terapiaOnline: {
    titulo: "Por que terapia online",
    subtitulo:
      "Todo o cuidado e a profundidade do atendimento presencial — com mais praticidade.",
    beneficios: [
      {
        icone: "Home",
        titulo: "Comodidade",
        texto: "Sem deslocamento, do conforto da sua casa.",
      },
      {
        icone: "CalendarClock",
        titulo: "Flexibilidade",
        texto: "Horários que cabem na sua rotina.",
      },
      {
        icone: "BadgeCheck",
        titulo: "Mesma eficácia",
        texto:
          "Atendimento de qualidade, com a mesma profundidade do presencial.",
      },
      {
        icone: "MapPin",
        titulo: "Para todo o Brasil",
        texto: "Onde quer que você esteja.",
      },
      {
        icone: "ShieldCheck",
        titulo: "Privacidade",
        texto: "Sessões sigilosas e ambiente seguro.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // DEPOIMENTOS
  // -------------------------------------------------------------------------
  //  ⚠️  SUBSTITUIR por depoimentos REAIS e AUTORIZADOS por escrito.
  //  Atenção às regras do CFP: NÃO usar promessas de resultado, "cura"
  //  ou comparações "antes e depois". Para esconder a seção inteira,
  //  troque `ativo` para false.
  depoimentos: {
    ativo: true,
    titulo: "O que dizem sobre o processo",
    subtitulo:
      "Relatos de quem viveu a experiência da terapia (exemplos ilustrativos).",
    itens: [
      {
        texto:
          "As sessões me ajudaram a entender melhor o que eu sentia e a lidar com a ansiedade do dia a dia com mais leveza.",
        autor: "Depoimento ilustrativo",
      },
      {
        texto:
          "Encontrei um espaço seguro para falar sem medo de julgamento. Aos poucos, fui me reconhecendo e me valorizando mais.",
        autor: "Depoimento ilustrativo",
      },
      {
        texto:
          "A terapia online foi mais simples do que eu imaginava e me ajudou a olhar para os meus relacionamentos de outra forma.",
        autor: "Depoimento ilustrativo",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // FAQ
  // -------------------------------------------------------------------------
  faq: {
    titulo: "Perguntas frequentes",
    subtitulo: "Ainda com dúvidas? Aqui estão as respostas mais comuns.",
    itens: [
      {
        pergunta: "A terapia online funciona mesmo?",
        resposta:
          "Sim. Estudos e a prática clínica mostram que o atendimento online tem a mesma eficácia do presencial, com a vantagem da comodidade e do acesso de qualquer lugar.",
      },
      {
        pergunta: "Quanto tempo dura cada sessão?",
        resposta:
          "Em média 50 minutos, geralmente uma vez por semana — mas a frequência é definida de acordo com a sua necessidade.",
      },
      {
        pergunta: "Como funciona o sigilo?",
        resposta:
          "Tudo o que é compartilhado na terapia é confidencial e protegido pelo Código de Ética do psicólogo.",
      },
      {
        pergunta: "Você atende em qualquer cidade?",
        resposta:
          "Sim, o atendimento é online e atende todo o Brasil.",
      },
      {
        pergunta: "Como faço para começar?",
        resposta:
          "É só enviar uma mensagem no WhatsApp. Vamos conversar e agendar a sua primeira sessão.",
      },
      {
        pergunta: "Quais as formas de pagamento?",
        // ⚙️ Ajuste conforme você combinar com seus pacientes.
        resposta:
          "Combinamos os detalhes no primeiro contato pelo WhatsApp.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // CTA FINAL
  // -------------------------------------------------------------------------
  ctaFinal: {
    titulo: "Dê o primeiro passo hoje",
    subtexto:
      "Você não precisa enfrentar tudo sozinho. Estou aqui para caminhar com você.",
    botao: "Agendar minha consulta no WhatsApp",
  },

  // -------------------------------------------------------------------------
  // RODAPÉ
  // -------------------------------------------------------------------------
  rodape: {
    atendimento: "Atendimento online para todo o Brasil",
    avisoEtico:
      "Este site tem caráter informativo e não substitui atendimento psicológico individual.",
    desenvolvidoPor: "Serviços Tech",
    desenvolvidoPorUrl: "https://servicostech.com.br/",
  },
} as const;

export type Site = typeof site;
