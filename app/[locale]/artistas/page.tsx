'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { artists } from '@/lib/dummy-data'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export default function ArtistsPage() {
  const t = useTranslations('artists')
  const locale = useLocale() as 'es' | 'en'
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null)

  return (
    <div className='container mx-auto px-4 py-32'>
      <motion.h1
        className='mb-12 text-5xl font-bold uppercase md:text-6xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('title')}
      </motion.h1>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {artists.map((artist) => (
          <Link href={`/artistas/${artist.slug.current}`} key={artist._id}>
            <motion.div
              className='relative group'
              // onMouseEnter={() => setHoveredArtist(artist._id)}
              // onMouseLeave={() => setHoveredArtist(null)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className='overflow-hidden'>
                <div className='relative aspect-[3/4] w-full'>
                  <Image
                    src={artist.portraitImage.url || '/placeholder.svg'}
                    alt={artist.portraitImage.alt}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-blue-600 mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-300' />
                </div>
              </div>
              <div className='mt-4'>
                <h3 className='text-xl font-bold uppercase'>{artist.name}</h3>
                <p className='mt-1 text-sm opacity-70'>
                  {artist.birthYear},{' '}
                  {locale === 'es' ? artist.country.es : artist.country.en}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Hover Preview */}
      <AnimatePresence>
        {hoveredArtist && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className='fixed left-0 top-0 w-screen h-screen pointer-events-none z-50'
          >
            {artists
              .filter(
                (artist) =>
                  artist._id === hoveredArtist &&
                  artist.highlights &&
                  artist.highlights.length > 0
              )
              .map((artist) => (
                <div
                  key={artist._id}
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh]'
                >
                  <div className='relative w-full h-full overflow-hidden'>
                    <Image
                      src={artist.highlights[0].url || '/placeholder.svg'}
                      alt={artist.highlights[0].alt || artist.name}
                      fill
                      className='object-cover'
                      sizes='40vh'
                    />
                    <div className='absolute inset-0 bg-blue-600 mix-blend-multiply opacity-20' />
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
