// /app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import AuthListener from "@/components/auth/AuthListener";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Sessio | EHR Essencial para Terapeutas",
    template: "%s | Sessio",
  },
  description:
    "Sessio é um EHR simples, seguro e focado em terapeutas solo. Gerencie pacientes, prontuários, agenda e pagamentos em um único lugar.",
  keywords: [
    "EHR para terapeutas",
    "prontuário eletrônico",
    "software para terapeutas",
    "agenda para terapeutas",
    "sistema para psicólogos",
    "EHR simples",
    "SaaS saúde mental",
  ],
  authors: [{ name: "Murylo Marques" }],
  creator: "Sessio",
  metadataBase: new URL("https://sessio.app"),
  openGraph: {
    title: "Sessio | EHR Essencial para Terapeutas",
    description:
      "O EHR minimalista feito para terapeutas solo. Menos complexidade, mais foco no atendimento.",
    url: "https://sessio.app",
    siteName: "Sessio",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png", // coloque em /public/icon.png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-100 text-neutral-900 antialiased">
        {/* Listener de autenticação (Supabase) */}
        <AuthListener />

        {/* Conteúdo da aplicação */}
        {children}

        {/* Toasts globais */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#1f2937", // cinza escuro profissional
              color: "#ffffff",
              fontSize: "0.875rem",
            },
          }}
        />
      </body>
    </html>
  );
}
