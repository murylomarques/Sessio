// /app/(app)/layout.tsx

// Justificativa: Este é o layout principal da aplicação logada.
// Ele estabelece a estrutura persistente (como uma futura sidebar de navegação)
// e a área de conteúdo principal. Para o MVP, é focado em fornecer um
// container limpo para as funcionalidades centrais.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Futuramente, uma sidebar de navegação entraria aqui */}
      <main className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}