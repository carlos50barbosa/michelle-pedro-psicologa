import { site } from "@/content/site";
import { getWhatsAppUrl, whatsappLinkProps } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function CtaFinal() {
  const { ctaFinal } = site;

  return (
    <section id="agendar" className="relative overflow-hidden bg-verde">
      {/* Detalhes decorativos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full bg-verde-medio/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-dourado/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 md:py-28">
        <Reveal>
          <span className="gold-rule mx-auto" aria-hidden="true" />
          <h2 className="mt-5 text-3xl text-creme sm:text-4xl md:text-5xl">
            {ctaFinal.titulo}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-creme/85 sm:text-lg">
            {ctaFinal.subtexto}
          </p>
          <div className="mt-9 flex justify-center">
            <LinkButton href={getWhatsAppUrl()} {...whatsappLinkProps} variant="white" size="lg">
              <WhatsAppIcon className="h-5 w-5" />
              {ctaFinal.botao}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
