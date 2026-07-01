import Image from "next/image";
import { Quote } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Sobre() {
  const { sobre } = site;

  return (
    <Section id="sobre" bg="bege">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Imagem estilo polaroid */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="rotate-[-3deg] rounded-sm bg-branco p-3 pb-12 shadow-xl shadow-verde/15 transition-transform duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-sm">
                <Image
                  src={sobre.imagem}
                  alt={sobre.imagemAlt}
                  width={516}
                  height={708}
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <p className="mt-4 text-center font-script text-2xl text-verde">
                {site.nome}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal>
            <span className="gold-rule" aria-hidden="true" />
            <h2 className="mt-4 text-3xl text-verde sm:text-4xl">{sobre.titulo}</h2>
          </Reveal>

          <div className="mt-6 space-y-4">
            {sobre.paragrafos.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-base leading-relaxed text-texto-suave sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Destaques */}
          <ul className="mt-8 space-y-4">
            {sobre.destaques.map((d, i) => (
              <Reveal as="li" key={d.texto} delay={0.05 * i}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-verde/10">
                    <Icon name={d.icone} className="h-5 w-5 text-verde" />
                  </span>
                  <span className="text-base text-texto">{d.texto}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Citação */}
          <Reveal delay={0.1}>
            <blockquote className="mt-8 rounded-2xl border-l-4 border-dourado bg-branco/70 p-6">
              <Quote className="h-6 w-6 text-dourado" aria-hidden="true" />
              <p className="mt-2 font-serif text-xl italic leading-snug text-verde sm:text-2xl">
                {sobre.citacao}
              </p>
              <footer className="mt-3 font-script text-2xl text-verde-medio">
                {site.nome}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
