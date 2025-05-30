'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { motion } from 'framer-motion'
import BlockContent from '@/components/block-content'
import { getArtist, getArtistWorks } from '@/sanity/lib/queries'
import RelatedNews from '@/components/related-news'
import { getNewsByArtist } from '@/sanity/lib/news-queries'

export default function ArtistPage() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const [artist, setArtist] = useState<any>(null)
  const [artworks, setArtworks] = useState<any[]>([])
  const [relatedNews, setRelatedNews] = useState<any[]>([])

  useEffect(() => {
    if (typeof slug === 'string') {
      getArtist(slug, language).then((artistData: any) => {
        setArtist(artistData)
        if (artistData?._id) {
          getArtistWorks(artistData._id, language).then(setArtworks)
          getNewsByArtist(artistData._id, language).then(setRelatedNews)
        }
      })
    }
  }, [slug, language])

  if (!artist) {
    return (
      <div className='container mx-auto px-4 py-32 text-center'>
        <p>Cargando...</p>
      </div>
    )
  }

  // Usar la primera imagen de highlights o portraitImage para el banner
  const bannerImage =
    artist.highlights && artist.highlights.length > 0
      ? artist.highlights[0].url
      : artist.portraitImage

  return (
    <div>
      {/* Banner */}
      <div className='relative h-[60vh] min-h-[400px] w-full'>
        <Image
          src={bannerImage || '/placeholder.svg'}
          alt={artist.name}
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />
        <motion.div
          // className='absolute inset-0 bg-blue-600 mix-blend-multiply'
          className='absolute inset-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
        />
        <div className='absolute inset-0 flex items-end'>
          <div className='container mx-auto px-4 pb-12'>
            <motion.div
              className='max-w-3xl text-white'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className='text-5xl font-bold uppercase md:text-6xl'>
                {artist.name}
              </h1>
              <p className='mt-4 text-xl'>
                {artist.birthYear}
                {artist.country && ', ' + artist.country}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-12'>
        {/* Bio */}
        {artist.bio && (
          <motion.div
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className='text-3xl font-bold uppercase mb-6'>Biografía</h2>
            <div className='max-w-3xl'>
              <BlockContent blocks={artist.bio} />
            </div>
          </motion.div>
        )}

        {/* Statement */}
        {artist.statement && (
          <motion.div
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className='text-3xl font-bold uppercase mb-6'>Statement</h2>
            <div className='max-w-3xl'>
              <BlockContent blocks={artist.statement} />
            </div>
          </motion.div>
        )}

        {/* Artworks */}
        {artworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className='text-3xl font-bold uppercase mb-6'>Obras</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {artworks.map((artwork: any) => (
                <motion.div
                  key={artwork._id}
                  className='group'
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='relative aspect-square overflow-hidden'>
                    <Image
                      src={artwork.imageUrl || '/placeholder.svg'}
                      alt={artwork.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                    <div className='absolute inset-0 bg-blue-600 mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-300' />
                  </div>
                  <div className='mt-4'>
                    <h3 className='text-lg font-bold'>{artwork.title}</h3>
                    <p className='mt-1 text-sm opacity-70'>
                      {artwork.year}, {artwork.medium}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {relatedNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <RelatedNews
              news={relatedNews}
              title={
                language === 'es' ? 'Noticias sobre el artista' : 'Artist News'
              }
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
