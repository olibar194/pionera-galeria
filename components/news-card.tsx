'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { formatDate } from '@/lib/dummy-data'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

interface NewsCardProps {
  news: any
}

export default function NewsCard({ news }: NewsCardProps) {
  const locale = useLocale() as 'es' | 'en'

  // Determine the link URL based on the news item type
  const getLinkUrl = () => {
    if (news.isExternalLink && news.externalUrl) {
      return news.externalUrl
    }

    if (news.internalLinkRef) {
      // This is simplified - in a real app, you'd need to determine the correct path
      // based on the reference type (artist, exhibition, fair)
      return `/noticias/${news.slug.current}`
    }

    return `/noticias/${news.slug.current}`
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
            src={news.mainImage.url || '/placeholder.svg'}
            alt={news.mainImage.alt}
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
            {locale === 'es' ? news.title.es : news.title.en}
          </h3>
          <p className='mt-2 text-sm line-clamp-3 text-black dark:text-white'>
            {locale === 'es' ? news.summary.es : news.summary.en}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
