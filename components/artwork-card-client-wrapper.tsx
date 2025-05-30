'use client'

import { useState } from 'react'
import Image from 'next/image'
import ArtworkLightbox from '@/components/artwork-lightbox'
import { motion } from 'framer-motion'
import { useLanguage } from './language-provider' // Assuming you might need language for title/medium

// Define a type for the artwork prop
interface Artwork {
  _id: string
  title?: { es?: string; en?: string } | string
  image?: {
    url: string
    alt?: string
  }
  year?: string
  medium?: { es?: string; en?: string } | string
  // Add any other fields you expect for an artwork card
}

interface ArtworkCardClientWrapperProps {
  artwork: Artwork
}

export default function ArtworkCardClientWrapper({
  artwork,
}: ArtworkCardClientWrapperProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const { language } = useLanguage()

  const openLightbox = () => {
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const getLocalizedText = (field: any, lang: 'es' | 'en'): string => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[lang] || field.es || field.en || ''
  }

  const displayTitle = getLocalizedText(artwork.title, language)
  const displayMedium = getLocalizedText(artwork.medium, language)

  return (
    <>
      <motion.div
        className='group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white'
        onClick={openLightbox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
      >
        <div className='relative aspect-[4/5] overflow-hidden'>
          <Image
            src={artwork.image?.url || '/placeholder.svg'}
            alt={artwork.image?.alt || displayTitle || 'Artwork image'}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute inset-0 bg-black mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-300' />
        </div>
        <div className='p-4'>
          <h3 className='text-lg font-bold truncate group-hover:text-blue-600 transition-colors'>
            {displayTitle || 'Untitled'}
          </h3>
          {(artwork.year || displayMedium) && (
            <p className='mt-1 text-sm text-gray-600 truncate'>
              {artwork.year}
              {artwork.year && displayMedium ? ', ' : ''}
              {displayMedium}
            </p>
          )}
        </div>
      </motion.div>

      {isLightboxOpen && (
        <ArtworkLightbox
          artworkId={artwork._id}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          mode='artwork'
        />
      )}
    </>
  )
}
