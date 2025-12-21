// /components/landing/Solution.tsx

"use client";

import { useI18n } from "@/lib/useI18n";
import { motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CheckBadgeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function Solution() {
  const { t } = useI18n();

  const steps = [
    {
      icon: ArrowDownTrayIcon,
      title: t.solution.step1_title,
      description: t.solution.step1_desc,
    },
    {
      icon: ArrowUpTrayIcon,
      title: t.solution.step2_title,
      description: t.solution.step2_desc,
    },
    {
      icon: CheckBadgeIcon,
      title: t.solution.step3_title,
      description: t.solution.step3_desc,
    },
  ];

  return (
    // Justificativa: Fundo de cor suave (Paper White) para diferenciar da seção de problema
    // e criar uma sensação de alívio e clareza.
    <section className="bg-[var(--color-bg)] text-neutral-900">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-semibold"
        >
          {t.solution.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-neutral-600"
        >
          {t.solution.subtitle}
        </motion.p>

        {/* 
          Justificativa do Layout de 3 Colunas:
          Visualmente reforça a simplicidade do processo. É escaneável e fácil de digerir.
          A animação escalonada (stagger) guia o olho do usuário de um passo ao outro,
          contando a história da migração de forma fluida.
        */}
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <step.icon className="h-6 w-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-neutral-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 
          Justificativa da Seção de Segurança:
          Ataca a objeção oculta: "Ok, é fácil, mas é seguro?".
          Usa o ícone de cadeado, um símbolo universal de segurança, para criar confiança
          imediata. Mencionar a criptografia posiciona o Sessio como tecnicamente superior
          e mais preocupado com a privacidade do que a concorrência.
        */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 rounded-xl bg-white p-6 text-center shadow-sm"
        >
          <div className="flex w-full flex-col items-center">
            <LockClosedIcon className="h-6 w-6 text-[var(--color-action)]" />
            <h4 className="mt-2 font-semibold text-neutral-800">
              {t.solution.security_title}
            </h4>
            <p className="mt-1 max-w-md text-sm text-neutral-600">
              {t.solution.security_desc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}