// /app/layout.tsx

import "./globals.css";
import AuthListener from "@/components/auth/AuthListener"; // Verifique se a importação está aqui.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AuthListener /> {/* Verifique se o componente está aqui. */}
        {children}
      </body>
    </html>
  );
}