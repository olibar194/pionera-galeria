"use client"

import { useLanguage } from "@/components/language-provider"
import HeroCarousel from "@/components/hero-carousel"
import { exhibitions } from "@/lib/dummy-data"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="pt-0">
      <HeroCarousel exhibitions={exhibitions} />
    </div>
  )
}
