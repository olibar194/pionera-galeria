'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { client } from '@/sanity/lib/client' // Assuming you have a Sanity client instance
import BlockContent from './block-content' // Assuming you have a BlockContent component
import { useLanguage } from './language-provider' // Assuming language context

// Types
interface SanityImage {
  url: string
  alt?: string
}

interface ArtworkDetails {
  _id: string
  title?: { es?: string; en?: string } | string
  artistName?: string
  year?: string
  medium?: { es?: string; en?: string } | string
  dimensions?: string
  description?: any // PortableText/BlockContent
  imageUrls?: string[]
  imageAlts?: string[]
  price?: number
  availability?: string
  // For gallery mode, we might just have a simple image array
  images?: SanityImage[]
}

interface ArtworkLightboxProps {
  isOpen: boolean
  onClose: () => void
  images?: SanityImage[] // For Gallery Mode
  artworkId?: string // For Artwork Detail Mode
  initialIndex?: number
  mode: 'gallery' | 'artwork' // Added mode prop
}

const artworkQuery = `
*[_type == "artwork" && _id == $artworkId][0] {
  _id,
  title,
  "artistName": artist->name,
  year,
  medium,
  dimensions,
  description,
  "imageUrls": images[].asset->url,
  "imageAlts": images[].alt,
  price,
  availability,
  "images": images[]{asset->{url}, alt}
}
`

export default function ArtworkLightbox({
  isOpen,
  onClose,
  images: initialImages,
  artworkId,
  initialIndex = 0,
  mode,
}: ArtworkLightboxProps) {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [artwork, setArtwork] = useState<ArtworkDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentImages: SanityImage[] = artwork?.images || initialImages || []

  const handleClose = useCallback(() => {
    onClose()
    // Reset state if needed, e.g., if artwork details shouldn't persist
    // setTimeout(() => {
    //   setArtwork(null)
    //   setError(null)
    //   setCurrentIndex(0)
    // }, 300) // Delay to allow animation
  }, [onClose])

  useEffect(() => {
    if (artworkId && isOpen) {
      const fetchArtwork = async () => {
        setIsLoading(true)
        setError(null)
        try {
          const data: ArtworkDetails = await client.fetch(artworkQuery, {
            artworkId,
          })
          if (data) {
            setArtwork(data)
            setCurrentIndex(0) // Reset to first image of the artwork
          } else {
            setError('Artwork not found.')
          }
        } catch (err) {
          console.error('Failed to fetch artwork:', err)
          setError('Failed to load artwork details.')
        }
        setIsLoading(false)
      }
      fetchArtwork()
    } else if (initialImages && isOpen) {
      // Gallery mode, artwork is null, images are from props
      setArtwork(null) // Ensure artwork details are cleared if switching modes
      setCurrentIndex(initialIndex)
    }

    if (!isOpen) {
      // Optional: Clear artwork details when closed to ensure fresh load or save memory
      // setArtwork(null);
      // setError(null);
    }
  }, [artworkId, isOpen, initialImages, initialIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
      if (currentImages.length > 1) {
        if (event.key === 'ArrowLeft') {
          goToPrevious()
        } else if (event.key === 'ArrowRight') {
          goToNext()
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose, currentImages])

  const goToPrevious = () => {
    if (currentImages.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
      )
    }
  }

  const goToNext = () => {
    if (currentImages.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
      )
    }
  }

  const currentImage = currentImages[currentIndex]
  // const isArtworkMode = !!artworkId && !!artwork; // Mode is now explicit
  const isArtworkMode = mode === 'artwork' && !!artwork

  const getLocalizedText = (field: any, lang: 'es' | 'en'): string => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[lang] || field.es || field.en || ''
  }

  if (!isOpen) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80'
          onClick={handleClose} // Close on overlay click
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='relative flex flex-col w-full h-full max-w-6xl max-h-[95vh] bg-white shadow-2xl overflow-hidden'
            onClick={(e) => e.stopPropagation()} // Prevent close on content click
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className='absolute top-4 right-4 z-50 p-2 text-gray-700 hover:text-black bg-white/50 hover:bg-white/80 rounded-full transition-colors'
              aria-label='Close lightbox'
            >
              <X size={28} />
            </button>

            {/* Image Display Area */}
            <div
              className={`relative flex-1 flex items-center justify-center ${isArtworkMode ? 'md:w-2/3' : 'w-full'} h-full p-4 md:p-8 bg-gray-100`}
            >
              {isLoading && (
                <p className='text-center text-lg'>Loading artwork...</p>
              )}
              {error && (
                <p className='text-center text-red-500 text-lg'>{error}</p>
              )}
              {!isLoading && !error && currentImage && (
                <Image
                  src={currentImage.url}
                  alt={
                    currentImage.alt ||
                    (isArtworkMode
                      ? getLocalizedText(artwork?.title, language)
                      : 'Gallery image')
                  }
                  fill
                  className='object-contain'
                  priority
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'
                />
              )}
              {!isLoading && !error && !currentImage && !artworkId && (
                <p className='text-center text-lg'>No image to display.</p>
              )}

              {/* Navigation Arrows */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors'
                    aria-label='Previous image'
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={goToNext}
                    className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors'
                    aria-label='Next image'
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>

            {/* Artwork Details Panel (Only in Artwork Mode) */}
            {isArtworkMode && artwork && (
              <div className='md:w-1/3 w-full h-full overflow-y-auto p-6 bg-white border-l border-gray-200'>
                <h2 className='text-2xl font-bold mb-1'>
                  {getLocalizedText(artwork.title, language)}
                </h2>
                {artwork.artistName && (
                  <p className='text-lg text-gray-700 mb-3'>
                    {artwork.artistName}
                  </p>
                )}

                <div className='space-y-2 text-sm text-gray-600'>
                  {artwork.year && (
                    <p>
                      <span className='font-semibold'>Year:</span>{' '}
                      {artwork.year}
                    </p>
                  )}
                  {artwork.medium && (
                    <p>
                      <span className='font-semibold'>Medium:</span>{' '}
                      {getLocalizedText(artwork.medium, language)}
                    </p>
                  )}
                  {artwork.dimensions && (
                    <p>
                      <span className='font-semibold'>Dimensions:</span>{' '}
                      {artwork.dimensions}
                    </p>
                  )}
                  {artwork.price && (
                    <p className='mt-2 text-lg font-semibold text-gray-800'>
                      Price: {artwork.price} USD
                    </p>
                  )}{' '}
                  {/* Example, adapt currency/formatting */}
                  {artwork.availability && (
                    <p className='mt-1 text-sm font-medium'>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${artwork.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {artwork.availability}
                      </span>
                    </p>
                  )}
                </div>

                {artwork.description && (
                  <div className='mt-4 prose prose-sm max-w-none'>
                    <h4 className='font-semibold text-gray-700 mb-1'>
                      Description
                    </h4>
                    <BlockContent
                      blocks={
                        artwork.description[language] ||
                        artwork.description.es ||
                        artwork.description
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
