'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { motion, useInView } from 'framer-motion'
import ArtworkLightbox from '@/components/artwork-lightbox'

interface ArtworkDisplayProps {
  artworks: any[] // TODO: Define a more specific type for artwork
}

export default function ArtworkDisplay({ artworks }: ArtworkDisplayProps) {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [columns, setColumns] = useState(3)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(
    null
  )

  const openLightbox = (artworkId: string) => {
    setSelectedArtworkId(artworkId)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedArtworkId(null)
  }

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
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    <div ref={ref} className='w-full'>
      <div className='flex flex-wrap -mx-2'>
        {columnArtworks.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className='px-2 w-full sm:w-1/2 lg:w-1/3 flex flex-col'
          >
            {column.map((artwork, index) => {
              const aspectRatioClasses = [
                'aspect-[3/4]',
                'aspect-square',
                'aspect-[4/3]',
                'aspect-[16/9]',
                'aspect-[2/3]',
              ]
              const aspectRatio =
                aspectRatioClasses[
                  Math.floor(Math.random() * aspectRatioClasses.length)
                ]
              const marginTop =
                index > 0
                  ? ['mt-4', 'mt-8', 'mt-12', 'mt-16'][
                      Math.floor(Math.random() * 4)
                    ]
                  : ''

              return (
                <motion.div
                  key={artwork._id}
                  className={`w-full ${marginTop} overflow-hidden`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * (columnIndex + index),
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    onClick={() => openLightbox(artwork._id)}
                    className='cursor-pointer'
                  >
                    <div
                      className={`relative ${aspectRatio} w-full overflow-hidden group`}
                    >
                      <Image
                        src={artwork.image?.url || '/placeholder.svg'}
                        alt={artwork.image?.alt || 'Artwork image'}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      />
                      <motion.div
                        className='absolute inset-0 bg-blue-600 mix-blend-multiply opacity-0 group-hover:opacity-30'
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {/* Text details (title, artist, year) removed as they are in the lightbox */}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
      {isLightboxOpen && selectedArtworkId && (
        <ArtworkLightbox
          artworkId={selectedArtworkId}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          mode='artwork' // Explicitly set mode to artwork
        />
      )}
    </div>
  )
}
