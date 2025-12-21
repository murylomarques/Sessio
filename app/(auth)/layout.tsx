// /app/(auth)/layout.tsx (NOVO ARQUIVO - antigo /signup/layout.tsx)

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-50 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}