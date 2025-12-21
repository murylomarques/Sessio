// Header.tsx - CORRIGIDO com a diretiva "use client"

"use client"; // <--- ESTA É A CORREÇÃO.

import { useI18n } from "@/lib/useI18n";
import Link from "next/link";

export default function Header() {
  const { t } = useI18n();

  return (
    // Justificativa: Fundo branco e borda sutil criam uma sensação de limpeza e profissionalismo,
    // essencial para um software de saúde. Não distrai da seção Hero.
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo: Cor primária para reforçar a identidade visual de confiança. */}
        <Link href="/" className="text-xl font-semibold text-[var(--color-primary)]">
          Sessio
        </Link>

        {/* 
          Justificativa da Remoção: Links de navegação foram removidos para reduzir a carga cognitiva 
          e focar 100% a atenção do usuário no CTA principal da página. A Lei de Hick comprova
          que menos opções levam a decisões mais rápidas. O objetivo é levar ao trial.
        */}
        <div className="flex items-center gap-4">
          {/* 
            Justificativa: O link de Login é essencial para usuários existentes.
            Posicioná-lo discretamente antes do CTA principal atende a esse público sem
            distrair novos usuários. É um padrão de UX reconhecido.
          */}
          <Link href="/login" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            {t.header.login}
          </Link>
          
          {/* 
            Justificativa do CTA:
            1. Cor de Ação (`--color-action`): O laranja argila se destaca no fundo branco, 
               guiando o olho do usuário para a ação mais importante (Princípio do Isolamento).
            2. Bordas Arredondadas (`rounded-lg`): Estudos de psicologia de formas indicam que 
               cantos arredondados são percebidos como mais amigáveis e menos ameaçadores, 
               o que pode aumentar a taxa de cliques em contextos de baixa confiança.
            3. Texto Específico: "Começar Teste Grátis" é mais forte que "Começar grátis". 
               Ele define a expectativa correta: é um trial, não um plano freemium eterno.
          */}
          <Link
            href="/signup"
            className="rounded-lg bg-[var(--color-action)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            {t.header.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}