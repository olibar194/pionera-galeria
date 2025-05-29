"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

interface ArtistCardProps {
  artist: any
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { language } = useLanguage()

  return (
    <Link href={`/artistas/${artist.slug.current}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="brutalist-card bg-white dark:bg-black overflow-hidden"
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={artist.portraitImage.url || "/placeholder.svg"}
            alt={artist.portraitImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold uppercase">{artist.name}</h3>
          <p className="mt-2 text-sm">
            {artist.birthYear}, {language === "es" ? artist.country.es : artist.country.en}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
