'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { getArtistById } from '@/lib/dummy-data'
import { motion } from 'framer-motion'

interface ArtworkCardProps {
  artwork: any
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { language } = useLanguage()
  const artist = getArtistById(artwork.artist)

  return (
    <Link href={`/obras/${artwork._id}`}>
      <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
        <Card className='overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md'>
          <div className='relative aspect-square w-full overflow-hidden'>
            <Image
              src={artwork.image.url || '/placeholder.svg'}
              alt={artwork.image.alt}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <CardContent className='p-4'>
            <h3 className='text-lg font-medium'>
              {language === 'es' ? artwork.title.es : artwork.title.en}
            </h3>
            <p className='text-sm text-text-secondary'>
              {artist?.name}, {artwork.year}
            </p>
            <p className='text-xs text-text-secondary'>
              {language === 'es' ? artwork.medium.es : artwork.medium.en}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
