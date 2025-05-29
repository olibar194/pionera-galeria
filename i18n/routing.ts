import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["es", "en"],

  // Used when no locale matches
  defaultLocale: "es",

  // The prefix for the default locale
  localePrefix: {
    mode: "as-needed",
  },
})
