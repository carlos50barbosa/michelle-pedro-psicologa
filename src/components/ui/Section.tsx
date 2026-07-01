import type { ReactNode } from "react";

/**
 * Wrapper de seção com espaçamento vertical generoso e container centralizado.
 * Use `bg` para alternar o fundo entre as seções (creme / bege / branco).
 */
export function Section({
  id,
  children,
  bg = "creme",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  bg?: "creme" | "bege" | "branco" | "verde";
  className?: string;
}) {
  const backgrounds = {
    creme: "bg-creme",
    bege: "bg-bege",
    branco: "bg-branco",
    verde: "bg-verde",
  } as const;

  return (
    <section
      id={id}
      className={`${backgrounds[bg]} py-16 sm:py-20 md:py-28 scroll-mt-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
