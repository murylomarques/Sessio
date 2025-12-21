// Hero.tsx - CORRIGIDO (Sem dependência de logos)

"use client";

import { useI18n } from "@/lib/useI18n";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-28 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold leading-tight sm:text-5xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg text-neutral-300"
        >
          {t.hero.subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-10"
        >
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-medium text-neutral-900 transition hover:scale-[1.03]"
          >
            {t.hero.cta}
          </Link>
        </motion.div>

        <motion.small
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 block text-xs text-neutral-400"
        >
          {t.hero.microcopy}
        </motion.small>

        {/* 
          *** SEÇÃO CORRIGIDA ***
          Justificativa da Seção de Prova de Compatibilidade (Versão em Texto):
          Esta seção substitui os logos por "tags" de texto.
          1. Foco Visual: As tags com fundo sutil (`bg-neutral-800`) e bordas arredondadas 
             criam um bloco visual que se destaca do texto comum, atraindo a atenção.
          2. Reconhecimento Rápido: O nome do concorrente é a informação crucial.
             Apresentá-lo de forma limpa e direta serve ao mesmo propósito de reduzir
             o risco percebido, confirmando para o usuário "sim, isso é para mim".
          3. Carga Cognitiva Baixa: É uma solução que não exige que o cérebro processe
             cores ou formas de um logo, apenas o texto que ele já procura.
        */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-16"
        >
          <p className="text-sm text-neutral-400">
            {t.hero.importFrom}
          </p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
            <span className="text-sm font-medium bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full">
              SimplePractice
            </span>
            <span className="text-sm font-medium bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full">
              TherapyNotes
            </span>
            {/* Adicione outros concorrentes aqui seguindo o mesmo padrão */}
          </div>
        </motion.div>

      </div>
    </section>
  );
}