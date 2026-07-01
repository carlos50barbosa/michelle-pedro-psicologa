import {
  Award,
  BadgeCheck,
  Brain,
  CalendarClock,
  Compass,
  GraduationCap,
  Heart,
  Home,
  Laptop,
  Lock,
  MapPin,
  Scale,
  ShieldCheck,
  Sparkles,
  Unlink,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";

/**
 * Mapa de ícones usados no `site.ts`. Para usar um novo ícone, importe-o do
 * lucide-react acima e adicione uma entrada aqui com o mesmo nome usado no
 * conteúdo. Veja a lista completa em https://lucide.dev/icons
 */
const icons = {
  Award,
  BadgeCheck,
  Brain,
  CalendarClock,
  Compass,
  GraduationCap,
  Heart,
  Home,
  Laptop,
  Lock,
  MapPin,
  Scale,
  ShieldCheck,
  Sparkles,
  Unlink,
  Users,
  Wind,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const LucideComp = icons[name as IconName];
  if (!LucideComp) return null;
  return <LucideComp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
