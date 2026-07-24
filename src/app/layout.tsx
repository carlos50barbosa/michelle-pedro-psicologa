import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish, Sacramento } from "next/font/google";
import { site } from "@/content/site";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { WhatsAppTracking } from "@/components/layout/WhatsAppTracking";
import "./globals.css";

/* ---------------------------------------------------------------------------
   FONTES (next/font — carregamento otimizado, sem flash)
   - Títulos: Cormorant Garamond (serifada, elegante)
   - Corpo:   Mulish (leve e acolhedora)
   - Detalhe: Sacramento (cursiva, usada com parcimônia no nome)
--------------------------------------------------------------------------- */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* ---------------------------------------------------------------------------
   METADATA / SEO (App Router)
--------------------------------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.nome }],
  creator: site.nome,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: `${site.nome} · ${site.profissao}`,
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: site.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.nome} — ${site.profissao} (${site.crp})`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "gnbxA4DorKWniTNa0FCSo4MkzR1EjWlbwzYTfnReN4M",
    other: {
      "facebook-domain-verification": "ucsf99j2p9zmzc8r0dsc7lkszraaoj",
    },
  },
};

/* ---------------------------------------------------------------------------
   JSON-LD — dados estruturados (schema Psychologist / MedicalBusiness)
--------------------------------------------------------------------------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Psychologist", "MedicalBusiness"],
  name: site.nome,
  description: site.seo.description,
  url: site.url,
  image: `${site.url}${site.seo.ogImage}`,
  telephone: `+${site.contato.whatsappInternacional}`,
  priceRange: "$$",
  medicalSpecialty: "Psychiatric",
  knowsLanguage: "pt-BR",
  identifier: {
    "@type": "PropertyValue",
    name: "CRP",
    value: site.crp,
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  availableService: site.especialidades.itens.map((item) => ({
    "@type": "MedicalTherapy",
    name: item.titulo,
    description: item.texto,
  })),
  sameAs: [site.contato.instagramUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${mulish.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-creme text-texto">
        {children}

        {/* Dados estruturados para o Google (rich results) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/*
          Aviso de cookies (LGPD) + Google Analytics + Meta Pixel.
          O rastreamento só carrega após o "Aceitar" e apenas se os IDs
          estiverem preenchidos em `src/content/site.ts` (bloco `analytics`).
        */}
        <CookieConsent />
        <WhatsAppTracking />
      </body>
    </html>
  );
}
