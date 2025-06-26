'use client'

import { useEffect, useState } from 'react'
import { getAllCala } from '../../../sanity/lib/cala-queries'
import BlockContent from '@/components/block-content'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import ExhibitionImageGallery from '@/components/exhibition-image-gallery'

interface Cala {
  title: { [key: string]: string }
  publicationDate: string
  mainImage: {
    asset?: { url: string }
    url?: string
    alt?: string
  }
  content: { [key: string]: any }
  videos: {
    thumbnail?: { asset?: { url: string } }
    title?: string
    url?: string
  }[]
  gallery?: { asset?: { url: string }; alt?: string }[]
}

export default function CalaListPage() {
  const params = useParams() as { locale?: string }
  const locale = params?.locale || 'es'
  const [cala, setCala] = useState<Cala | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calaEntries = await getAllCala(locale)
        setCala(calaEntries[0])
      } catch (error) {
        setCala(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [locale])

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-32 text-center'>
        <p>{locale === 'es' ? 'Cargando...' : 'Loading...'}</p>
      </div>
    )
  }

  if (!cala) {
    return (
      <div className='container mx-auto px-4 py-32 text-center'>
        <p>
          {locale === 'es'
            ? 'No hay información disponible.'
            : 'No information available.'}
        </p>
      </div>
    )
  }

  // Gallery images for lightbox
  const galleryImages: { url: string; alt?: string }[] =
    cala?.gallery?.map((img: any) => ({
      url: img.asset?.url,
      alt: img.alt,
    })) || []

  return (
    <div className='container mx-auto px-4 py-32'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8'
      >
        {/* Botón de volver, solo si lo necesitas en CALA */}
      </motion.div>
      <div className='mx-auto max-w-4xl'>
        <motion.h1
          className='mb-4 text-3xl font-bold uppercase md:text-4xl lg:text-5xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {cala.title?.[locale] || cala.title?.es || cala.title?.en || ''}
        </motion.h1>
        <motion.p
          className='mb-8 text-lg text-text-secondary'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {cala.publicationDate &&
            new Date(cala.publicationDate).toLocaleDateString(locale)}
        </motion.p>
        <motion.div
          className='relative mb-8 aspect-video w-full overflow-hidden'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Image
            src={
              cala.mainImage?.asset?.url ||
              cala.mainImage?.url ||
              '/placeholder.svg'
            }
            alt={cala.mainImage?.alt || ''}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px'
            priority
          />
        </motion.div>
        <motion.div
          className='prose prose-lg max-w-none dark:prose-invert mb-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {cala.content && (
            <BlockContent
              blocks={
                cala.content?.[locale] || cala.content?.es || cala.content?.en
              }
            />
          )}
        </motion.div>
        {/* Gallery Section */}
        {galleryImages.length > 0 && (
          <div className='mb-16'>
            <h2 className='text-3xl font-bold uppercase mb-6'>Galería</h2>
            <ExhibitionImageGallery images={galleryImages} />
          </div>
        )}
        {/* Videos */}
        {Array.isArray(cala.videos) && cala.videos.length > 0 && (
          <div className='mt-12'>
            <h2 className='text-2xl font-bold mb-4'>Videos</h2>
            <div className='grid gap-8 md:grid-cols-2'>
              {cala.videos.map((video: any, idx: number) => (
                <div key={idx} className='border rounded-lg overflow-hidden'>
                  {video.thumbnail && (
                    <Image
                      src={video.thumbnail.asset?.url || '/placeholder.svg'}
                      alt={video.title || ''}
                      width={480}
                      height={270}
                      className='w-full h-60 object-cover'
                    />
                  )}
                  <div className='p-4'>
                    <h3 className='font-bold mb-2'>{video.title}</h3>
                    {video.url && (
                      <a
                        href={video.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-pionera-blue hover:underline'
                      >
                        {locale === 'es' ? 'Ver video' : 'Watch video'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
