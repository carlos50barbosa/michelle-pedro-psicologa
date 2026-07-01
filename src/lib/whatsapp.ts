import { site } from "@/content/site";

/**
 * Monta o link do WhatsApp com a mensagem pré-preenchida.
 *
 * Use `getWhatsAppUrl()` para o texto padrão (definido em `site.ts`) ou
 * passe um texto customizado para um botão específico.
 */
export function getWhatsAppUrl(mensagem?: string): string {
  const texto = mensagem ?? site.contato.whatsappMensagem;
  const numero = site.contato.whatsappInternacional;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

/** Propriedades padrão para abrir o WhatsApp em uma nova aba com segurança. */
export const whatsappLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
