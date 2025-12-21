// /components/layout/Footer.tsx

"use client";

import { useI18n } from "@/lib/useI18n";
import Link from "next/link";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Coluna 1: Marca e Missão */}
          {/* Justificativa: Reforça a identidade da marca e a proposta de valor central
              uma última vez. É o resumo da sua promessa. */}
          <div className="text-neutral-600">
            <h3 className="text-xl font-semibold text-[var(--color-primary)]">
              Sessio
            </h3>
            <p className="mt-2 text-sm">
              {t.footer.tagline}
            </p>
          </div>

          {/* Coluna 2: Produto */}
          {/* Justificativa: Agrupa os links que descrevem a solução. Para o usuário que
              quer reler uma parte específica do argumento de venda. */}
          <div>
            <h4 className="font-semibold text-neutral-800">{t.footer.product_title}</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/#preco" className="text-sm text-neutral-600 hover:text-neutral-900">{t.footer.pricing}</Link></li>
              <li><Link href="/#solucao" className="text-sm text-neutral-600 hover:text-neutral-900">{t.footer.how_it_works}</Link></li>
            </ul>
          </div>
          
          {/* Coluna 3: Empresa */}
          {/* Justificativa: Humaniza a marca. "Contato" é um sinal de confiança
              importante. Mostra que há pessoas reais por trás do produto. */}
          <div>
            <h4 className="font-semibold text-neutral-800">{t.footer.company_title}</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/sobre" className="text-sm text-neutral-600 hover:text-neutral-900">{t.footer.about}</Link></li>
              <li><Link href="/contato" className="text-sm text-neutral-600 hover:text-neutral-900">{t.footer.contact}</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Legal */}
          {/* Justificativa: A base da confiança. Para um EHR, a ausência desses links
              é um sinal de alarme que mataria a conversão. Eles precisam ser claros e acessíveis. */}
          <div>
            <h4 className="font-semibold text-neutral-800">{t.footer.legal_title}</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/termos" className="text-sm text-neutral-600 hover:text-neutral-900">{t.footer.terms}</Link></li>
              <li><Link href="/privacidade" className="text-sm text-neutral-600 hover:text-neutral-900">{t.footer.privacy}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-neutral-200 pt-8 text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Sessio. {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}