import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Especialidades() {
  const { especialidades } = site;

  return (
    <Section id="especialidades" bg="creme">
      <SectionTitle title={especialidades.titulo} subtitle={especialidades.subtitulo} />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {especialidades.itens.map((item, i) => (
          <Reveal as="li" key={item.titulo} delay={0.05 * (i % 3)}>
            <article className="group h-full rounded-2xl border border-bege bg-branco p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-dourado/40 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-verde/8 transition-colors duration-300 group-hover:bg-verde">
                <Icon
                  name={item.icone}
                  className="h-6 w-6 text-verde transition-colors duration-300 group-hover:text-creme"
                />
              </span>
              <h3 className="mt-5 text-xl text-verde">{item.titulo}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-texto-suave">
                {item.texto}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
