import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-verde text-creme shadow-md shadow-verde/20 hover:bg-verde-medio hover:-translate-y-0.5 hover:shadow-lg",
  secondary:
    "border border-verde/30 bg-branco text-verde hover:border-verde hover:bg-bege",
  ghost: "text-verde hover:text-verde-medio underline-offset-4 hover:underline",
  white:
    "bg-creme text-verde shadow-md hover:bg-branco hover:-translate-y-0.5 hover:shadow-lg",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Botão em formato de link (`<a>`). Por padrão usado para abrir o WhatsApp.
 */
export function LinkButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
