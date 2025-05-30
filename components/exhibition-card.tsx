'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { formatDate } from '@/lib/dummy-data'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

interface ExhibitionCardProps {
  exhibition: any
}

export default function ExhibitionCard({ exhibition }: ExhibitionCardProps) {
  const locale = useLocale() as 'es' | 'en'

  return (
    <Link href={`/exposiciones/${exhibition.slug.current}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className='brutalist-card bg-white dark:bg-black overflow-hidden'
      >
        <div className='relative aspect-video w-full'>
          <Image
            src={exhibition.mainImage.url || '/placeholder.svg'}
            alt={exhibition.mainImage.alt}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='p-4'>
          <h3 className='text-xl font-bold uppercase'>{exhibition.title}</h3>
          <p className='mt-2 text-sm'>
            {formatDate(exhibition.startDate, locale)} -{' '}
            {formatDate(exhibition.endDate, locale)}
          </p>
          <p className='mt-1 text-sm'>
            {exhibition.location?.es || exhibition.location?.en || ''}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
