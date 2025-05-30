'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import BlockContent from '@/components/block-content'

interface ArtworkCardProps {
  artwork: any
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { language } = useLanguage()
  const getText = (field: any) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[language] || field.es || field.en || ''
  }
  const title = getText(artwork.title)
  const medium = getText(artwork.medium)
  const dimensions = artwork.dimensions
  const year = artwork.year
  const descriptionBlocks = artwork.description
    ? artwork.description[language] ||
      artwork.description.es ||
      artwork.description.en
    : null

  return (
    <div className='bg-white dark:bg-black overflow-hidden p-2'>
      <div className='relative aspect-[4/5] w-full overflow-hidden group'>
        <Image
          src={artwork.image?.url || '/placeholder.svg'}
          alt={artwork.image?.alt || title || 'Artwork image'}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='pt-2'>
        <h3 className='text-lg font-bold uppercase truncate mb-1'>
          {title || 'Untitled'}
        </h3>
        <div className='text-sm text-gray-700 dark:text-gray-300 mb-1'>
          {year && <span>{year}</span>}
          {year && medium && <span>, </span>}
          {medium && <span>{medium}</span>}
        </div>
        {dimensions && (
          <div className='text-xs text-gray-500 mb-1'>{dimensions}</div>
        )}
        {descriptionBlocks &&
          Array.isArray(descriptionBlocks) &&
          descriptionBlocks.length > 0 && (
            <div className='mt-2'>
              <BlockContent blocks={descriptionBlocks} />
            </div>
          )}
      </div>
    </div>
  )
}
