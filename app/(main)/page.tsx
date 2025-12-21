import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/CTA"; // 1. Importar

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <Solution />
      <Pricing />
      <FinalCTA /> {/* 2. Adicionar ao final */}
    </>
  );
}