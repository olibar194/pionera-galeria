'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

interface Artist {
  _id: string
  name: string
  slug: string
  portraitImage?: { url?: string; alt?: string }
  highlights?: { url?: string; alt?: string }[]
  birthYear?: number
  country?: { es?: string; en?: string }
}

export default function ArtistsGrid({ artists }: { artists: Artist[] }) {
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
          <Link
            href={`/artistas/${artist.slug}`}
            key={artist._id}
            onMouseEnter={() => setHoveredArtist(artist._id)}
            onMouseLeave={() => setHoveredArtist(null)}
          >
            <motion.div
              className='relative group'
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className='overflow-hidden'>
                <div className='relative aspect-[3/4] w-full'>
                  <Image
                    src={artist.portraitImage?.url || '/placeholder.svg'}
                    alt={artist.portraitImage?.alt || artist.name}
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
                  {artist.birthYear}
                  {artist.country &&
                    ', ' +
                      (locale === 'es' ? artist.country.es : artist.country.en)}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
