export function getLocale() {
  if (typeof navigator === "undefined") return "pt-BR";

  const lang = navigator.language;

  if (lang.startsWith("en")) return "en-US";
  return "pt-BR";
}
