import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { getWhatsAppUrl, whatsappLinkProps } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FadeIn } from "@/components/ui/FadeIn";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Hero() {
  const { hero } = site;

  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-creme pt-28 pb-16 sm:pt-32 md:pt-36 md:pb-24"
    >
      {/* Detalhes decorativos suaves de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-bege/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-azul/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2 md:gap-10">
        {/* Texto — entrada via CSS (FadeIn), não gated por JS, para o conteúdo
            above-the-fold aparecer já no primeiro paint no mobile. */}
        <div className="order-2 md:order-1">
          <FadeIn as="p" className="text-xs font-semibold uppercase tracking-[0.18em] text-dourado sm:text-sm">
            {hero.eyebrow}
          </FadeIn>

          <FadeIn as="h1" delay={0.05} className="mt-4 text-4xl leading-[1.1] text-verde sm:text-5xl md:text-6xl">
            {hero.headline}
          </FadeIn>

          <FadeIn as="p" delay={0.1} className="mt-6 max-w-xl text-base leading-relaxed text-texto-suave sm:text-lg">
            {hero.subtexto}
          </FadeIn>

          <FadeIn delay={0.15} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href={getWhatsAppUrl()} {...whatsappLinkProps} size="lg">
              <WhatsAppIcon className="h-5 w-5" />
              {hero.ctaPrimario}
            </LinkButton>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-verde transition-colors hover:text-verde-medio"
            >
              {hero.ctaSecundario}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </FadeIn>

          {/* Selos de confiança */}
          <FadeIn as="ul" delay={0.2} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {hero.selos.map((selo) => (
              <li
                key={selo.texto}
                className="inline-flex items-center gap-2 text-sm text-texto-suave"
              >
                <Icon name={selo.icone} className="h-4 w-4 text-verde-medio" />
                {selo.texto}
              </li>
            ))}
          </FadeIn>
        </div>

        {/* Imagem (LCP no mobile) — renderizada visível de imediato, sem fade,
            para o maior elemento pintar assim que os bytes chegam (já tem
            priority/preload). O fundo creme da foto integra com a seção. */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-full max-w-sm md:max-w-md">
            <Image
              src={hero.imagem}
              alt={hero.imagemAlt}
              width={516}
              height={708}
              priority
              sizes="(max-width: 768px) 90vw, 40vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
