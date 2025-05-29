"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: "es" | "en") => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center space-x-0">
      <Button
        variant={locale === "es" ? "default" : "outline"}
        size="sm"
        onClick={() => switchLanguage("es")}
        className={`border-2 border-black dark:border-white rounded-none ${
          locale === "es"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        }`}
      >
        ES
      </Button>
      <Button
        variant={locale === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => switchLanguage("en")}
        className={`border-2 border-l-0 border-black dark:border-white rounded-none ${
          locale === "en"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        }`}
      >
        EN
      </Button>
    </div>
  )
}
