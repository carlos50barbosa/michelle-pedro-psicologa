import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

export function ComoFunciona() {
  const { comoFunciona } = site;

  return (
    <Section id="como-funciona" bg="creme">
      <SectionTitle title={comoFunciona.titulo} subtitle={comoFunciona.subtitulo} />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {comoFunciona.passos.map((passo, i) => (
          <Reveal as="li" key={passo.numero} delay={0.06 * i}>
            <div className="relative h-full rounded-2xl border border-bege bg-branco p-7 shadow-sm">
              <span
                className="font-serif text-5xl font-semibold text-dourado/35"
                aria-hidden="true"
              >
                {passo.numero}
              </span>
              <h3 className="mt-2 text-xl text-verde">{passo.titulo}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-texto-suave">
                {passo.texto}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
