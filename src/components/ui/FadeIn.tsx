import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Entrada sutil (fade + slide) 100% em CSS — roda já no primeiro paint, sem
 * depender de JS/hidratação.
 *
 * Use em conteúdo ACIMA DA DOBRA (ex.: Hero/LCP). Ali o <Reveal> (framer-motion,
 * disparado por scroll) renderiza `opacity:0` inline no HTML e só revela depois
 * que o bundle de animação baixa e hidrata — no mobile isso atrasa o
 * aparecimento (parece que a imagem/texto "demora a carregar").
 *
 * Usa o utilitário `animate-fade-in` (token --animate-fade-in em globals.css),
 * que já respeita `prefers-reduced-motion`.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h1" | "ul" | "span";
}) {
  const Tag = as as ElementType;
  const classes = className ? `animate-fade-in ${className}` : "animate-fade-in";
  const style: CSSProperties | undefined =
    delay > 0 ? { animationDelay: `${delay}s` } : undefined;

  return (
    <Tag className={classes} style={style}>
      {children}
    </Tag>
  );
}
