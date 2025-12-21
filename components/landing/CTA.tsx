// /components/landing/CTA.tsx

"use client";

import { useI18n } from "@/lib/useI18n";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  const { t } = useI18n();

  return (
    // Justificativa do Fundo Escuro: Cria um "fechamento" visual para a página,
    // ecoando a Hero section. Sinaliza que esta é a conclusão da sua proposta de valor.
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-semibold leading-tight sm:text-4xl"
        >
          {t.cta.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-neutral-300"
        >
          {t.cta.subtitle}
        </motion.p>

        {/* 
          Justificativa da Prova Social (Depoimento):
          Este é o elemento mais poderoso da seção. Um depoimento de um par ("outro terapeuta")
          remove a dúvida do "será que funciona para mim?". Ele valida toda a sua argumentação
          através da voz de alguém em quem o usuário confia.
          NOTA: Usaremos um placeholder alinhado com a persona (Dr. Ana) até termos depoimentos reais.
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <figure className="max-w-2xl mx-auto">
            <blockquote className="text-xl italic text-neutral-200">
              <p>"{t.cta.testimonial_text}"</p>
            </blockquote>
            <figcaption className="mt-4">
              <div className="font-semibold text-white">{t.cta.testimonial_author}</div>
              <div className="text-neutral-400">{t.cta.testimonial_role}</div>
            </figcaption>
          </figure>
        </motion.div>

        {/* 
          Justificativa do CTA e Microcopy:
          Repete o botão principal e a microcopy de remoção de risco. Após a prova social,
          a confiança do usuário está no auge. Este é o momento perfeito para pedir a ação,
          reforçando que não há barreiras (sem cartão, cancele a qualquer momento).
        */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-12"
        >
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-medium text-neutral-900 transition hover:scale-[1.03]"
          >
            {t.cta.button_text}
          </Link>
        </motion.div>

        <motion.small
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-4 block text-xs text-neutral-400"
        >
          {t.hero.microcopy} {/* Reutilizando microcopy da hero */}
        </motion.small>
      </div>
    </section>
  );
}