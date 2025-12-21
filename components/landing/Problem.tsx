// ProblemSection.tsx - Ajustado para o novo i18n

"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useI18n } from "@/lib/useI18n"; // Importe o hook

export default function ProblemSection() {
  const { t } = useI18n(); // Use o hook

  // A lista de problemas agora vem do arquivo i18n
  const problems = t.problem.problemsList;

  return (
    <section className="bg-white text-neutral-900">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-semibold"
        >
          {t.problem.title} {/* Usando i18n */}
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-10 space-y-4 text-left text-lg text-neutral-700"
        >
          {problems.map((problem, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-3"
            >
              <CheckCircleIcon className="h-6 w-6 mt-0.5 text-teal-600 flex-shrink-0" />
              <span>{problem}</span>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-base text-neutral-600"
        >
          {t.problem.hook_start} {/* Usando i18n */}
          <br />
          <span className="font-semibold text-neutral-800">
            {t.problem.hook_end_bold} {/* Usando i18n */}
          </span>
        </motion.p>

      </div>
    </section>
  );
}