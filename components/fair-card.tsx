'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { formatDate } from '@/lib/dummy-data'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

interface FairCardProps {
  fair: any
}

export default function FairCard({ fair }: FairCardProps) {
  const locale = useLocale() as 'es' | 'en'

  return (
    <Link href={`/ferias/${fair.slug.current}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className='brutalist-card bg-white dark:bg-black overflow-hidden'
      >
        <div className='relative aspect-video w-full'>
          <Image
            src={fair.mainImage.url || '/placeholder.svg'}
            alt={fair.mainImage.alt}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
        <div className='p-4'>
          <h3 className='text-xl font-bold uppercase'>
            {locale === 'es' ? fair.name.es : fair.name.en}
          </h3>
          <p className='mt-2 text-sm'>
            {formatDate(fair.startDate, locale)} -{' '}
            {formatDate(fair.endDate, locale)}
          </p>
          <p className='mt-1 text-sm'>
            {locale === 'es' ? fair.location.es : fair.location.en}
          </p>
          {fair.boothNumber && (
            <p className='mt-1 text-sm font-semibold'>
              {locale === 'es' ? 'Stand:' : 'Booth:'} {fair.boothNumber}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
