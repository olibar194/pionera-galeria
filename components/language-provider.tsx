"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  // Simple translations for UI elements
  const translations = {
    es: {
      "nav.artists": "Artistas",
      "nav.exhibitions": "Exposiciones",
      "nav.fairs": "Ferias",
      "nav.news": "Noticias",
      "nav.contact": "Contacto",
      "footer.rights": "Todos los derechos reservados",
    },
    en: {
      "nav.artists": "Artists",
      "nav.exhibitions": "Exhibitions",
      "nav.fairs": "Fairs",
      "nav.news": "News",
      "nav.contact": "Contact",
      "footer.rights": "All rights reserved",
    },
  }

  // Simple translation function
  const t = (key: string, fallback = ""): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || fallback
  }

  // Store language preference in localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
