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
      <body className="min-h-screen bg-neutral-100 text-neutral-900 antialiased">
        <AuthListener />
        {children}
      </body>
    </html>
  );
}