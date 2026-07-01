import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { Sobre } from "@/components/sections/Sobre";
import { Especialidades } from "@/components/sections/Especialidades";
import { ParaQuem } from "@/components/sections/ParaQuem";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { TerapiaOnline } from "@/components/sections/TerapiaOnline";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { FAQ } from "@/components/sections/FAQ";
import { CtaFinal } from "@/components/sections/CtaFinal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Sobre />
        <Especialidades />
        <ParaQuem />
        <ComoFunciona />
        <TerapiaOnline />
        <Depoimentos />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
