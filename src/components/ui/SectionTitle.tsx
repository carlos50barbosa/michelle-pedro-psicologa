import { Reveal } from "./Reveal";

/**
 * Título de seção padronizado: pequena linha dourada + título serifado +
 * subtítulo opcional. Mantém o ritmo visual consistente em toda a página.
 */
export function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignment} gap-4`}>
      <span
        className={`gold-rule ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      <h2
        className={`text-3xl sm:text-4xl md:text-[2.75rem] leading-tight ${
          light ? "text-creme" : "text-verde"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-base sm:text-lg ${
            light ? "text-creme/80" : "text-texto-suave"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
