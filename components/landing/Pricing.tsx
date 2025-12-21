// /components/landing/Pricing.tsx

"use client";

import { useI18n } from "@/lib/useI18n";
import { CheckIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
  const { t } = useI18n();
  const [isAnnual, setIsAnnual] = useState(false);

  // Dados para os planos, vindos do i18n para fácil manutenção
  const oldWay = t.pricing.old_way;
  const newWay = t.pricing.new_way;

  return (
    <section className="bg-white text-neutral-900">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-semibold"
        >
          {t.pricing.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-neutral-600"
        >
          {t.pricing.subtitle}
        </motion.p>
        
        {/* Justificativa do Toggle: Padrão de UX familiar que permite ao usuário controlar
            a visualização do preço com esforço mínimo. Reduz a carga cognitiva em comparação
            com a apresentação de 4 planos diferentes. */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <span>{t.pricing.monthly}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
          </label>
          <span className="flex items-center gap-2">
            {t.pricing.annual} <span className="text-xs font-semibold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">{t.pricing.save}</span>
          </span>
        </div>

        {/* 
          Justificativa do Layout de Contraste:
          O card da "Via Antiga" é visualmente suprimido (cinza, borda tracejada) para representar
          algo indesejável. O card do "Sessio" é destacado (borda sólida, cor primária)
          para ser a escolha óbvia e atraente. Isso guia o olho e a decisão do usuário.
        */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* O Pior Inimigo (Âncora de Preço) */}
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-left">
            <h3 className="text-lg font-semibold text-neutral-500">{oldWay.title}</h3>
            <p className="mt-4 text-4xl font-bold text-neutral-400">
              <span className="line-through">{oldWay.price}</span>
            </p>
            <ul className="mt-6 space-y-3 text-neutral-500">
              {oldWay.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  - <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* A Escolha Óbvia (Nossa Oferta) */}
          <div className="rounded-xl border-2 border-[var(--color-primary)] bg-white p-8 text-left">
            <h3 className="text-lg font-semibold text-[var(--color-primary)]">{newWay.title}</h3>
            <p className="mt-4 text-4xl font-bold text-neutral-900">
              {isAnnual ? newWay.price_year : newWay.price_month}
              <span className="text-base font-normal text-neutral-500">/{isAnnual ? 'ano' : 'mês'}</span>
            </p>
             {isAnnual && <p className="text-sm font-medium text-neutral-600">{newWay.billed_annually}</p>}
            <Link href="/signup" className="mt-6 block w-full rounded-lg bg-[var(--color-action)] px-6 py-3 text-center text-base font-medium text-white transition hover:opacity-90">
              {t.pricing.cta}
            </Link>
            <ul className="mt-6 space-y-3 text-neutral-700">
              {newWay.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckIcon className="h-5 w-5 flex-shrink-0 text-teal-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}