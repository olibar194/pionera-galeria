"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/dummy-data"
import { motion } from "framer-motion"

interface HeroSectionProps {
  exhibition: any
}

export default function HeroSection({ exhibition }: HeroSectionProps) {
  const { language } = useLanguage()

  // Variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  // Decorative shapes for visual interest
  const shapes = [
    { top: "10%", left: "5%", size: "100px", color: "impact-fuchsia", delay: 0.5 },
    { top: "70%", left: "80%", size: "150px", color: "accent-green", delay: 0.7 },
    { top: "30%", left: "90%", size: "80px", color: "pionera-blue", delay: 0.9 },
  ]

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with blend mode */}
      <div className="absolute inset-0">
        <Image
          src={exhibition.mainImage.url || "/placeholder.svg"}
          alt={exhibition.mainImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-graphic-blue mix-blend-multiply opacity-40 dark:mix-blend-hard-light dark:opacity-30" />
      </div>

      {/* Decorative shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-${shape.color} opacity-20 mix-blend-screen dark:mix-blend-lighten`}
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ delay: shape.delay, duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <div className="container relative z-10 mx-auto flex h-full items-center px-4">
        <motion.div className="max-w-2xl text-gallery-white" variants={container} initial="hidden" animate="show">
          <motion.h1 className="mb-2 font-display text-5xl font-bold md:text-6xl lg:text-7xl" variants={item}>
            {language === "es" ? exhibition.title.es : exhibition.title.en}
          </motion.h1>
          {exhibition.subtitle && (
            <motion.p className="mb-4 text-xl md:text-2xl" variants={item}>
              {language === "es" ? exhibition.subtitle.es : exhibition.subtitle.en}
            </motion.p>
          )}
          <motion.p className="mb-6 text-lg" variants={item}>
            {formatDate(exhibition.startDate, language)} - {formatDate(exhibition.endDate, language)}
          </motion.p>
          <motion.div variants={item}>
            <Link href={`/exposiciones/${exhibition.slug.current}`}>
              <Button className="bg-impact-fuchsia hover:bg-impact-fuchsia/90 text-lg px-6 py-6">
                Descubrir Exposición
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
