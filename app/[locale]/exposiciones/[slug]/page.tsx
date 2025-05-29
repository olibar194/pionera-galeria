"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import BlockContent from "@/components/block-content"
import { getExhibitionBySlug, getArtistById, getArtworkById, formatDate } from "@/lib/dummy-data"
import { getNewsByExhibition } from "@/lib/news-data"
import RelatedNews from "@/components/related-news"

export default function ExhibitionPage() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const [exhibition, setExhibition] = useState<any>(null)
  const [artists, setArtists] = useState<any[]>([])
  const [artworksByArtist, setArtworksByArtist] = useState<Record<string, any[]>>({})
  const [relatedNews, setRelatedNews] = useState<any[]>([])

  useEffect(() => {
    if (typeof slug === "string") {
      const exhibitionData = getExhibitionBySlug(slug)
      if (exhibitionData) {
        setExhibition(exhibitionData)

        // Get artists data
        const artistsData = exhibitionData.artists.map((artistId: string) => getArtistById(artistId)).filter(Boolean)
        setArtists(artistsData)

        // Group artworks by artist
        const artworksByArtistMap: Record<string, any[]> = {}
        exhibitionData.artists.forEach((artistId: string) => {
          artworksByArtistMap[artistId] = []
        })

        exhibitionData.artworks.forEach((artworkId: string) => {
          const artwork = getArtworkById(artworkId)
          if (artwork) {
            const artistId = artwork.artist
            if (artworksByArtistMap[artistId]) {
              artworksByArtistMap[artistId].push(artwork)
            }
          }
        })

        setArtworksByArtist(artworksByArtistMap)

        // Get related news
        setRelatedNews(getNewsByExhibition(exhibitionData._id))
      }
    }
  }, [slug])

  if (!exhibition) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src={exhibition.mainImage.url || "/placeholder.svg"}
          alt={exhibition.mainImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <motion.div
          className="absolute inset-0 bg-blue-600 mix-blend-multiply"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              className="max-w-3xl text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold uppercase md:text-6xl">
                {language === "es" ? exhibition.title.es : exhibition.title.en}
              </h1>
              {exhibition.subtitle && (
                <p className="mt-2 text-xl md:text-2xl">
                  {language === "es" ? exhibition.subtitle.es : exhibition.subtitle.en}
                </p>
              )}
              <p className="mt-4 text-xl">
                {formatDate(exhibition.startDate, language)} - {formatDate(exhibition.endDate, language)}
              </p>
              <p className="mt-2 text-lg">
                {language === "es" ? exhibition.location.es : exhibition.location.en} | Curador: {exhibition.curator}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Description */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold uppercase mb-6">Descripción</h2>
          <div className="max-w-3xl">
            <BlockContent blocks={language === "es" ? exhibition.description.es : exhibition.description.en} />
          </div>
        </motion.div>

        {/* Artworks by Artist */}
        {artists.map((artist) => (
          <motion.div
            key={artist._id}
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold uppercase mb-6">{artist.name}</h2>
            {artworksByArtist[artist._id] && artworksByArtist[artist._id].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artworksByArtist[artist._id].map((artwork) => (
                  <motion.div key={artwork._id} className="group" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={artwork.image.url || "/placeholder.svg"}
                        alt={artwork.image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-bold">{language === "es" ? artwork.title.es : artwork.title.en}</h3>
                      <p className="mt-1 text-sm opacity-70">
                        {artwork.year}, {language === "es" ? artwork.medium.es : artwork.medium.en}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p>No hay obras disponibles para este artista.</p>
            )}
          </motion.div>
        ))}
        {relatedNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <RelatedNews
              news={relatedNews}
              title={language === "es" ? "Noticias sobre la exposición" : "Exhibition News"}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
