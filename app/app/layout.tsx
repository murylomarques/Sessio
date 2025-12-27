// /app/app/layout.tsx

import Link from "next/link";
import { ChartBarIcon, UsersIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Justificativa: Este layout cria a estrutura visual principal para a área logada.
// A sidebar à esquerda fornece uma navegação consistente e previsível (reduz a carga cognitiva),
// enquanto a área de conteúdo à direita renderiza a página específica que o usuário está visitando.
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Função de logout como uma Server Action aninhada
  const signOut = async () => {
    "use server";
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };
  
  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Sidebar de Navegação */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-neutral-200">
        <div className="flex flex-col h-full">
          {/* Logo/Header da Sidebar */}
          <div className="h-16 flex items-center justify-center border-b border-neutral-200">
            <h1 className="text-xl font-semibold text-[var(--color-primary)]">Sessio</h1>
          </div>
          
          {/* Itens de Navegação Principais */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link href="/app/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-100">
              <ChartBarIcon className="h-6 w-6" />
              Dashboard
            </Link>
            <Link href="/app/patients" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-100">
              <UsersIcon className="h-6 w-6" />
              Pacientes
            </Link>
            <Link href="/app/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-100">
              <Cog6ToothIcon className="h-6 w-6" />
              Configurações
            </Link>
          </nav>

          {/* Seção Inferior (Usuário e Logout) */}
          <div className="px-4 py-4 border-t border-neutral-200">
            <p className="text-sm font-medium text-neutral-800 truncate">{user?.email}</p>
            <form action={signOut}>
              <button 
                type="submit"
                className="w-full mt-2 flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal da Página */}
      <main className="flex-1 overflow-y-auto bg-neutral-100">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}