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
  const name = fair.name?.[locale] || fair.name?.es || fair.name?.en || ''
  const location =
    fair.location?.[locale] || fair.location?.es || fair.location?.en || ''
  const booth = fair.boothNumber
  const slug = typeof fair.slug === 'string' ? fair.slug : fair.slug?.current
  const mainImageUrl = fair.mainImage?.url || '/placeholder.svg'
  const mainImageAlt = fair.mainImage?.alt || ''

  return (
    <Link href={`/ferias/${slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className='brutalist-card bg-white dark:bg-black overflow-hidden'
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
          <h3 className='text-xl font-bold uppercase'>{name}</h3>
          <p className='mt-2 text-sm'>
            {formatDate(fair.startDate, locale)} -{' '}
            {formatDate(fair.endDate, locale)}
          </p>
          <p className='mt-1 text-sm flex items-center gap-2'>
            {location}
            {booth && (
              <span className='ml-2 text-xs font-semibold border px-2 py-1 rounded'>
                {locale === 'es' ? 'Stand' : 'Booth'} {booth}
              </span>
            )}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
