import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function TerapiaOnline() {
  const { terapiaOnline } = site;

  return (
    <Section id="terapia-online" bg="bege">
      <SectionTitle title={terapiaOnline.titulo} subtitle={terapiaOnline.subtitulo} />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {terapiaOnline.beneficios.map((b, i) => (
          <Reveal as="li" key={b.titulo} delay={0.05 * (i % 3)}>
            <article className="flex h-full items-start gap-4 rounded-2xl bg-branco p-6 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dourado/15">
                <Icon name={b.icone} className="h-5 w-5 text-dourado" />
              </span>
              <div>
                <h3 className="text-lg text-verde">{b.titulo}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-texto-suave">
                  {b.texto}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
