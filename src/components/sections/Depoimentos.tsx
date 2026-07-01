import { Quote } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

/**
 * ⚠️ ATENÇÃO (Código de Ética do CFP):
 * Substituir os textos abaixo por depoimentos REAIS e AUTORIZADOS por escrito.
 * NÃO usar promessas/garantias de resultado, "cura" nem comparações
 * "antes e depois". Mantenha os relatos sóbrios e verdadeiros.
 *
 * Para esconder a seção inteira, defina `depoimentos.ativo = false` em
 * `src/content/site.ts`.
 */
export function Depoimentos() {
  const { depoimentos } = site;

  if (!depoimentos.ativo) return null;

  return (
    <Section id="depoimentos" bg="creme">
      <SectionTitle title={depoimentos.titulo} subtitle={depoimentos.subtitulo} />

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {depoimentos.itens.map((dep, i) => (
          <Reveal as="li" key={i} delay={0.06 * i}>
            <figure className="flex h-full flex-col rounded-2xl border border-bege bg-branco p-7 shadow-sm">
              <Quote className="h-8 w-8 text-dourado/60" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-texto">
                “{dep.texto}”
              </blockquote>
              <figcaption className="mt-5 border-t border-bege pt-4 text-sm font-medium text-texto-suave">
                {dep.autor}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
