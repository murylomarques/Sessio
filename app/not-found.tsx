import Link from "next/link";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 px-6">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl border border-neutral-200 p-10 text-center overflow-hidden">

        {/* Detalhe decorativo */}
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#8B0000]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#F5DD42]/20 blur-3xl" />

        {/* Logo / Nome */}
        <h1 className="text-4xl font-bold text-[#8B0000] tracking-tight">
          Sessio
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Plataforma inteligente de gestão
        </p>

        {/* Código do erro */}
        <div className="mt-8 text-[120px] font-black text-neutral-200 leading-none select-none">
          404
        </div>

        <h2 className="mt-4 text-2xl font-semibold text-neutral-800">
          Página não encontrada
        </h2>

        <p className="mt-2 text-neutral-600">
          Parece que você tentou acessar algo que não existe ou foi movido.
          Mas fica tranquilo — você ainda está no controle 😉
        </p>

        {/* Ações */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/app/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#8B0000] px-6 py-3 text-white font-medium hover:opacity-90 transition"
          >
            <HomeIcon className="h-5 w-5" />
            Ir para o Dashboard
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-6 py-3 text-neutral-700 hover:bg-neutral-100 transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Voltar ao início
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-neutral-400">
          © {new Date().getFullYear()} Sessio · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
