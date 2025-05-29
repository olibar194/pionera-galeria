"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion } from "framer-motion"

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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer overflow-hidden rounded-md"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-square">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt || "Gallery image"}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl border-none bg-black/90 p-0 text-white">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {selectedImage !== null && (
            <div className="relative flex h-[80vh] items-center justify-center">
              <button
                onClick={goToPrevious}
                className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="relative h-full w-full">
                <Image
                  src={images[selectedImage].url || "/placeholder.svg"}
                  alt={images[selectedImage].alt || "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <button
                onClick={goToNext}
                className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
                aria-label="Next image"
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
