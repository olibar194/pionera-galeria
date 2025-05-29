"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface ArtworkDisplayProps {
  artworks: any[]
}

export default function ArtworkDisplay({ artworks }: ArtworkDisplayProps) {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [columns, setColumns] = useState(3)

  // Responsive columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Distribute artworks into columns with varying heights
  const distributeArtworks = () => {
    const columnArtworks: any[][] = Array.from({ length: columns }, () => [])

    artworks.forEach((artwork, index) => {
      const columnIndex = index % columns
      columnArtworks[columnIndex].push(artwork)
    })

    return columnArtworks
  }

  const columnArtworks = distributeArtworks()

  return (
    <div ref={ref} className="w-full">
      <div className="flex flex-wrap -mx-2">
        {columnArtworks.map((column, columnIndex) => (
          <div key={columnIndex} className="px-2 w-full sm:w-1/2 lg:w-1/3">
            {column.map((artwork, index) => {
              // Random aspect ratio for each artwork
              const aspectRatio = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[16/9]", "aspect-[2/3]"][
                Math.floor(Math.random() * 5)
              ]

              // Random margin for asymmetric layout
              const marginTop = index > 0 ? ["mt-4", "mt-8", "mt-12", "mt-16"][Math.floor(Math.random() * 4)] : ""

              return (
                <motion.div
                  key={artwork._id}
                  className={`w-full ${marginTop} overflow-hidden`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.1 * (columnIndex + index) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={`/obras/${artwork._id}`}>
                    <div className={`relative ${aspectRatio} w-full overflow-hidden`}>
                      <Image
                        src={artwork.image.url || "/placeholder.svg"}
                        alt={artwork.image.alt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <motion.div
                        className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-0"
                        whileHover={{ opacity: 0.3 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="text-lg font-bold">{language === "es" ? artwork.title.es : artwork.title.en}</h3>
                      <p className="text-sm opacity-70">
                        {artwork.year}, {language === "es" ? artwork.medium.es : artwork.medium.en}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
