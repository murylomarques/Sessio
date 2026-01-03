// /app/layout.tsx

import "./globals.css";
import AuthListener from "@/components/auth/AuthListener"; // Verifique se a importação está aqui.
import { Toaster } from 'react-hot-toast'; // 1. Importar

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-100 text-neutral-900 antialiased">
        <AuthListener />
        {children}
        <Toaster // 2. Adicionar o componente aqui
          position="bottom-right" // Posição na tela
          toastOptions={{
            duration: 5000, // Duração de 5 segundos
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}