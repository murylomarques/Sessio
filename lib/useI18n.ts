"use client";

import { useState, useEffect } from "react";
import ptBR from "@/i18n/pt-BR";
import enUS from "@/i18n/en-US";
import { getLocale } from "./getLocale";

export function useI18n() {
  const [locale, setLocale] = useState<"pt-BR" | "en-US">("pt-BR");

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  const dictionary = locale === "en-US" ? enUS : ptBR;

  return { locale, setLocale, t: dictionary };
}
