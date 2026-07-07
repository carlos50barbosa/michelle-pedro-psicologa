"use client";

import { useEffect, useState } from "react";
import { getWhatsAppUrl, whatsappLinkProps } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * Botão flutuante do WhatsApp, fixo no canto inferior direito em todas as
 * telas. Faz um leve pulso ao carregar (apenas algumas vezes, de forma
 * discreta) e respeita `prefers-reduced-motion`.
 */
export function WhatsAppFloat() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    // O pulso para após alguns segundos para não ficar insistente.
    const timer = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={getWhatsAppUrl()}
      {...whatsappLinkProps}
      aria-label="Falar com a Michelle no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 motion-reduce:hover:scale-100 sm:bottom-6 sm:right-6"
      style={pulse ? { animation: "whatsapp-pulse 2s ease-out 3" } : undefined}
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-verde px-4 py-2 text-sm font-medium text-creme opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100 lg:block">
        Vamos conversar
      </span>
    </a>
  );
}
