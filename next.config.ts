import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera um site 100% estático em ./out no `next build`.
  // O Nginx serve esses arquivos direto, sem processo Node rodando.
  output: "export",

  // O otimizador de imagem padrão do Next precisa de um servidor Node,
  // que não existe no export estático. Servimos as imagens como estão.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
