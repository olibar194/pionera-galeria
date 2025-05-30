import { notFound } from 'next/navigation'
import { getFair } from '@/sanity/lib/queries'
import {
  parseFair,
  parseArtist,
  parseArtwork,
  getBlockContentByLocale,
  formatFairDateRange,
} from '@/lib/sanity-parsers'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import BlockContent from '@/components/block-content'
import RelatedNews from '@/components/related-news'
import ArtworkCard from '@/components/artwork-card'
import ArtworksByArtist from '@/components/artworks-by-artist'

export default async function FairPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const t = await getTranslations('fairs')
  const fairRaw = await getFair(params.slug, params.locale)
  if (!fairRaw)
    return (
      <div className='container mx-auto px-4 py-32 text-center'>
        <p>{t('notFound') || 'Feria no encontrada'}</p>
      </div>
    )
  const fair = parseFair(fairRaw)
  // Artistas y artworks ya vienen anidados en la query
  const artists = (fair.artists || []).map(parseArtist)
  const artworksByArtist: Record<string, any[]> = {}
  if (fair.artworks && Array.isArray(fair.artworks)) {
    fair.artworks.map(parseArtwork).forEach((artwork: any) => {
      const artistId = artwork.artist?._id
      if (!artistId) return
      if (!artworksByArtist[artistId]) artworksByArtist[artistId] = []
      artworksByArtist[artistId].push(artwork)
    })
  }
  console.log('artworksByArtist', artworksByArtist)

  // Noticias relacionadas
  const relatedNews = fair.relatedNews || []
  return (
    <div>
      {/* Banner */}
      <div className='relative h-[60vh] min-h-[400px] w-full'>
        <Image
          src={fair.mainImage.url || '/placeholder.svg'}
          alt={fair.mainImage.alt}
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />
        <div className='absolute inset-0 flex items-end'>
          <div className='container mx-auto px-4 pb-12'>
            <div className='max-w-3xl text-white'>
              <h1 className='text-5xl font-bold uppercase md:text-6xl'>
                {fair.name?.es || fair.name?.en || fair.name}
              </h1>
              <p className='mt-4 text-xl'>
                {formatFairDateRange(
                  fair.startDate,
                  fair.endDate,
                  params.locale
                )}
              </p>
              <p className='mt-2 text-lg'>
                {(fair.location?.es || fair.location?.en || fair.location) +
                  (fair.boothNumber ? ` | ${fair.boothNumber}` : '')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto px-4 py-12'>
        {/* Description */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold uppercase mb-6'>
            {t('description') || 'Descripción'}
          </h2>
          <div className='max-w-3xl'>
            <BlockContent
              blocks={getBlockContentByLocale(fair.description, params.locale)}
            />
          </div>
        </div>
        {/* Artworks by Artist */}
        <ArtworksByArtist
          artists={artists}
          artworks={fair.artworks || []}
          noArtworksText={t('noArtworks', {
            fallback: 'No hay obras disponibles para este artista.',
          })}
        />
        {relatedNews.length > 0 && (
          <div className='mt-16'>
            <RelatedNews news={relatedNews} title={t('newsTitle')} />
          </div>
        )}
      </div>
    </div>
  )
}
