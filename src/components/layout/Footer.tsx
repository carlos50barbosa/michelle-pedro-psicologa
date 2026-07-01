import { site } from "@/content/site";
import { getWhatsAppUrl, whatsappLinkProps } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-verde text-creme">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        {/* Identidade */}
        <div>
          <p className="font-script text-3xl text-creme">{site.nome}</p>
          <p className="mt-1 text-sm uppercase tracking-[0.16em] text-dourado-claro">
            {site.profissao} · {site.crp}
          </p>
          <p className="mt-4 max-w-xs text-sm text-creme/75">
            {site.rodape.atendimento}
          </p>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-lg text-creme">Contato</h3>
          <span className="gold-rule mt-3 mb-4 block" aria-hidden="true" />
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={getWhatsAppUrl()}
                {...whatsappLinkProps}
                className="inline-flex items-center gap-2 text-creme/85 transition-colors hover:text-creme"
              >
                <WhatsAppIcon className="h-4 w-4 text-dourado-claro" />
                WhatsApp {site.contato.whatsappNumero}
              </a>
            </li>
            <li>
              <a
                href={site.contato.instagramUrl}
                {...whatsappLinkProps}
                className="inline-flex items-center gap-2 text-creme/85 transition-colors hover:text-creme"
              >
                <InstagramIcon className="h-4 w-4 text-dourado-claro" />
                Instagram {site.contato.instagramUsuario}
              </a>
            </li>
          </ul>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-lg text-creme">Navegação</h3>
          <span className="gold-rule mt-3 mb-4 block" aria-hidden="true" />
          <ul className="flex flex-col gap-3 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-creme/85 transition-colors hover:text-creme"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rodapé legal */}
      <div className="border-t border-creme/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-center text-xs text-creme/65 sm:px-8">
          <p className="mx-auto max-w-2xl">{site.rodape.avisoEtico}</p>
          <p>
            © {ano} {site.nome}. Todos os direitos reservados.
          </p>
          <p className="text-creme/45">
            Desenvolvido por:{" "}
            <a
              href={site.rodape.desenvolvidoPorUrl}
              {...whatsappLinkProps}
              className="underline-offset-2 transition-colors hover:text-creme hover:underline"
            >
              {site.rodape.desenvolvidoPor}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
