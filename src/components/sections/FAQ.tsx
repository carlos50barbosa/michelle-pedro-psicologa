"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const { faq } = site;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" bg="bege">
      <SectionTitle title={faq.titulo} subtitle={faq.subtitulo} />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faq.itens.map((item, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;
          return (
            <Reveal key={i} delay={0.03 * i}>
              <div className="overflow-hidden rounded-2xl border border-bege bg-branco shadow-sm">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bege/40"
                  >
                    <span className="text-base font-semibold text-verde sm:text-lg">
                      {item.pergunta}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-dourado transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-6 pb-5 text-[0.95rem] leading-relaxed text-texto-suave"
                >
                  {item.resposta}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
