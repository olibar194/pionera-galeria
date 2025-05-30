'use client'

import { useState } from 'react'
import Image from 'next/image'
import ArtworkLightbox from '@/components/artwork-lightbox'

interface SanityImage {
  url: string
  alt?: string
}

interface ExhibitionImageGalleryProps {
  images: SanityImage[]
}

export default function ExhibitionImageGallery({
  images,
}: ExhibitionImageGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  if (!images || images.length === 0) {
    return null // Or some placeholder if no images
  }

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {images.map((image, index) => (
          <div
            key={image.url || index} // Prefer URL as key, fallback to index
            className='cursor-pointer group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.url || '/placeholder.svg'}
              alt={image.alt || 'Gallery image'}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
            />
            <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <ArtworkLightbox
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          images={images}
          initialIndex={currentImageIndex}
          mode='gallery'
        />
      )}
    </>
  )
}
