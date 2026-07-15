"use client";

import { useEffect } from "react";

/**
 * Rastreia cliques em qualquer link do WhatsApp (wa.me) como conversão.
 *
 * Usa delegação de evento no documento, então funciona para TODOS os botões
 * "Vamos conversar" / WhatsApp sem precisar alterar cada componente.
 *
 * Só dispara se o rastreamento estiver ativo (o visitante aceitou os cookies
 * e há ID configurado) — a checagem `typeof gtag/fbq === "function"` garante
 * isso, respeitando o consentimento (LGPD).
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function WhatsAppTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.(
        'a[href*="wa.me"], a[href*="api.whatsapp"], a[href*="whatsapp.com"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;

      if (typeof window.gtag === "function") {
        window.gtag("event", "contato_whatsapp", {
          link_url: link.getAttribute("href"),
          link_text: (link.textContent || "").trim().slice(0, 60),
        });
      }
      // Preparado para quando o Meta Pixel for ativado (evento de contato).
      if (typeof window.fbq === "function") {
        window.fbq("track", "Contact");
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
