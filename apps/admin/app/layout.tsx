import { ReactNode } from "react";
import { Metadata } from "next";
// plane imports
import { ADMIN_BASE_PATH } from "@plane/constants";
// styles
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "NWERP | Plataforma integrada para gestão e orquestração de processos de negócio",
  description:
    "Plataforma integrada para orquestração de processos de negócio, sincronização de dados ERP e gestão de fluxos operacionais em tempo real.",
  openGraph: {
    title: "NWERP | Plataforma integrada para gestão e orquestração de processos de negócio",
    description:
      "Plataforma integrada para orquestração de processos de negócio, sincronização de dados ERP e gestão de fluxos operacionais em tempo real.",
    url: "https://plane.nwerp.ai/",
  },
  keywords:
    "desenvolvimento de software, feedback do cliente, software, acelerar, gerenciamento de código, gerenciamento de releases, gerenciamento de projetos, rastreamento de itens de trabalho, agile, scrum, kanban, colaboração",
  twitter: {
    site: "@planepowers",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const ASSET_PREFIX = ADMIN_BASE_PATH;
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href={`${ASSET_PREFIX}/favicon/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${ASSET_PREFIX}/favicon/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${ASSET_PREFIX}/favicon/favicon-16x16.png`} />
        <link rel="manifest" href={`${ASSET_PREFIX}/site.webmanifest.json`} />
        <link rel="shortcut icon" href={`${ASSET_PREFIX}/favicon/favicon.ico`} />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
