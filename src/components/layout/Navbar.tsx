"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { getWhatsAppUrl, whatsappLinkProps } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do fundo quando o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerTone = scrolled
    ? "bg-creme/95 shadow-sm shadow-verde/5 backdrop-blur"
    : "bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerTone}`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo / nome */}
        <a href="#topo" className="group flex flex-col leading-none" aria-label={`${site.nome}, ${site.profissao}`}>
          <span className="font-script text-3xl text-verde transition-colors group-hover:text-verde-medio">
            {site.nome}
          </span>
          <span className="mt-0.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-dourado">
            {site.profissao} · {site.crp}
          </span>
        </a>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Navegação principal">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-texto transition-colors hover:text-verde"
            >
              {item.label}
            </a>
          ))}
          <LinkButton href={getWhatsAppUrl()} {...whatsappLinkProps} size="md">
            <WhatsAppIcon className="h-4 w-4" />
            Vamos conversar
          </LinkButton>
        </nav>

        {/* Botão do menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-verde transition-colors hover:bg-bege lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={`overflow-hidden bg-creme/98 backdrop-blur transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96 border-t border-bege" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Navegação mobile">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-texto transition-colors hover:bg-bege hover:text-verde"
            >
              {item.label}
            </a>
          ))}
          <LinkButton
            href={getWhatsAppUrl()}
            {...whatsappLinkProps}
            size="lg"
            className="mt-2"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon className="h-5 w-5" />
            Vamos conversar
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
