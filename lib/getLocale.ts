export function getLocale(): "pt-BR" | "en-US" {
  if (typeof navigator === "undefined") {
    return "pt-BR";
  }

  const language = navigator.language.toLowerCase();

  if (language.startsWith("en")) {
    return "en-US";
  }

  return "pt-BR";
}
