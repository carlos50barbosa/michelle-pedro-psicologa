import Image from "next/image";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { getWhatsAppUrl, whatsappLinkProps } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function ParaQuem() {
  const { paraQuem } = site;

  return (
    <Section id="para-quem" bg="bege">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="gold-rule mx-auto" aria-hidden="true" />
          <h2 className="mt-4 text-center text-3xl text-verde sm:text-4xl">
            {paraQuem.titulo}
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-8 w-full max-w-[240px] overflow-hidden rounded-2xl shadow-xl shadow-verde/15">
            <Image
              src={paraQuem.imagem}
              alt={paraQuem.imagemAlt}
              width={1024}
              height={1280}
              sizes="240px"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base text-texto-suave sm:text-lg">
            {paraQuem.introducao}
          </p>
        </Reveal>

        <ul className="mx-auto mt-10 max-w-2xl space-y-3">
          {paraQuem.sinais.map((sinal, i) => (
            <Reveal as="li" key={sinal} delay={0.04 * i}>
              <div className="flex items-start gap-3 rounded-xl bg-branco/70 p-4 shadow-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-verde">
                  <Check className="h-4 w-4 text-creme" aria-hidden="true" />
                </span>
                <span className="text-base text-texto">{sinal}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="font-serif text-xl italic text-verde sm:text-2xl">
              {paraQuem.cta}
            </p>
            <LinkButton href={getWhatsAppUrl()} {...whatsappLinkProps} size="lg">
              <WhatsAppIcon className="h-5 w-5" />
              Vamos conversar
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
