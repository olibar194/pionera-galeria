'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { formatDate } from '@/lib/dummy-data'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { urlFor } from '@/sanity/lib/image'

interface NewsCardProps {
  news: any
}

export default function NewsCard({ news }: NewsCardProps) {
  const locale = useLocale() as 'es' | 'en'

  // Usar siempre urlFor para mainImage de Sanity
  let mainImageUrl = ''
  if (news.mainImage?.asset) {
    mainImageUrl = urlFor(news.mainImage).url()
  } else if (news.mainImage?.url) {
    mainImageUrl = news.mainImage.url
  } else {
    mainImageUrl = '/placeholder.svg'
  }
  const mainImageAlt = news.mainImage?.alt || ''

  // Adaptación para slug: puede ser string o {current}
  const slug = typeof news.slug === 'string' ? news.slug : news.slug?.current

  // Adaptación para links internos: si hay internalLinkRef, construir ruta según el tipo
  const getLinkUrl = () => {
    if (news.isExternalLink && news.externalUrl) {
      return news.externalUrl
    }
    if (
      news.internalLinkRef &&
      news.internalLinkRef._type &&
      news.internalLinkRef.slug
    ) {
      const refType = news.internalLinkRef._type
      const refSlug =
        typeof news.internalLinkRef.slug === 'string'
          ? news.internalLinkRef.slug
          : news.internalLinkRef.slug.current
      if (refType === 'artist') return `/artistas/${refSlug}`
      if (refType === 'exhibition') return `/exposiciones/${refSlug}`
      if (refType === 'fair') return `/ferias/${refSlug}`
    }
    return `/noticias/${slug}`
  }

  const isExternal = news.isExternalLink && news.externalUrl

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className='brutalist-card bg-white dark:bg-black overflow-hidden'
    >
      <Link
        href={getLinkUrl()}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : ''}
      >
        <div className='relative aspect-video w-full'>
          <Image
            src={mainImageUrl}
            alt={mainImageAlt}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='p-4'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-sm text-text-secondary'>
              {formatDate(news.publicationDate, locale)}
            </p>
            {isExternal && (
              <ExternalLink size={16} className='text-text-secondary' />
            )}
          </div>
          <h3 className='text-xl font-bold uppercase text-black dark:text-white'>
            {news.title?.[locale] || news.title?.es || news.title?.en || ''}
          </h3>
          <p className='mt-2 text-sm line-clamp-3 text-black dark:text-white'>
            {news.summary?.[locale] ||
              news.summary?.es ||
              news.summary?.en ||
              ''}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
