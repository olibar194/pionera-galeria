'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface ImageGalleryProps {
  images: any[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % images.length)
  }

  return (
    <div>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className='cursor-pointer overflow-hidden rounded-md'
            onClick={() => openLightbox(index)}
          >
            <div className='relative aspect-square'>
              <Image
                src={image.url || '/placeholder.svg'}
                alt={image.alt || 'Gallery image'}
                fill
                className='object-cover transition-transform duration-300 hover:scale-110'
                sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className='fixed inset-0 z-50 flex w-full h-full items-center justify-center bg-white/90 backdrop-blur-sm p-0 border-none shadow-xl'>
          <button
            onClick={closeLightbox}
            className='absolute right-8 top-8 z-50 flex h-12 w-12 items-center justify-center rounded-none bg-transparent text-black hover:bg-black/10 transition-colors'
            aria-label='Close'
          >
            <X size={24} />
          </button>

          {selectedImage !== null && (
            <div className='relative flex w-full h-full items-center justify-center'>
              <button
                onClick={goToPrevious}
                className='absolute left-8 z-10 flex h-12 w-12 items-center justify-center rounded-none bg-transparent text-black hover:bg-black/10 transition-colors'
                aria-label='Previous image'
              >
                <ChevronLeft size={24} />
              </button>

              <div className='relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center'>
                <Image
                  src={images[selectedImage].url || '/placeholder.svg'}
                  alt={images[selectedImage].alt || 'Gallery image'}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                  className='object-contain mx-auto'
                  width={1200}
                  height={900}
                  priority
                />
              </div>

              <button
                onClick={goToNext}
                className='absolute right-8 z-10 flex h-12 w-12 items-center justify-center rounded-none bg-transparent text-black hover:bg-black/10 transition-colors'
                aria-label='Next image'
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
