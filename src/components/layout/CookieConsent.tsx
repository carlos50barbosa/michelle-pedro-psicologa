"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { site } from "@/content/site";

/**
 * Consentimento de cookies (LGPD) + carregamento condicional de rastreamento.
 *
 * - Google Analytics e Meta Pixel só são carregados DEPOIS que o visitante
 *   clica em "Aceitar". A escolha fica salva no navegador (localStorage).
 * - Se os IDs em `site.analytics` estiverem vazios, este componente não
 *   renderiza nada (nem banner, nem scripts).
 */

const STORAGE_KEY = "mp-cookie-consent"; // "accepted" | "rejected"

type Consent = "accepted" | "rejected" | null;

export function CookieConsent() {
  const { ga4, metaPixel } = site.analytics;
  const hasAnalytics = Boolean(ga4 || metaPixel);

  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "rejected") setConsent(saved);
    } catch {
      /* localStorage indisponível — segue mostrando o banner */
    }
    setReady(true);
  }, []);

  function choose(value: Exclude<Consent, null>) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignora falha de escrita */
    }
    setConsent(value);
  }

  // Recurso dormente enquanto não houver IDs configurados.
  if (!hasAnalytics) return null;
  // Evita "piscar" o banner antes de ler a escolha salva (SSR/hidratação).
  if (!ready) return null;

  return (
    <>
      {consent === "accepted" && (
        <>
          {ga4 && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');`}
              </Script>
            </>
          )}
          {metaPixel && (
            <Script id="meta-pixel-init" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');`}
            </Script>
          )}
        </>
      )}

      {consent === null && (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-dourado/30 bg-verde/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="max-w-2xl text-sm leading-relaxed text-creme/90">
              {site.cookies.texto}
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="rounded-full border border-creme/30 px-5 py-2 text-sm font-semibold text-creme transition-colors hover:bg-creme/10"
              >
                {site.cookies.recusar}
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-full bg-dourado px-5 py-2 text-sm font-semibold text-verde shadow-md transition-all hover:-translate-y-0.5 hover:bg-dourado-claro"
              >
                {site.cookies.aceitar}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
