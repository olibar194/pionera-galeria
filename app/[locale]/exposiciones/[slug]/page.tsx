import { getExhibition } from '@/sanity/lib/queries'
import {
  parseExhibition,
  parseArtist,
  parseArtwork,
} from '@/lib/sanity-parsers'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import BlockContent from '@/components/block-content'
import RelatedNews from '@/components/related-news'
import ExhibitionImageGallery from '@/components/exhibition-image-gallery' // New gallery component
import ArtworkCard from '@/components/artwork-card'
import { formatDate } from '@/lib/dummy-data'

// Define a type for Sanity image objects
interface SanityImageObject {
  url: string
  alt?: string
}

// Define a type for Artwork items displayed on this page
interface ArtworkPageItem {
  _id: string
  title?: string
  image?: SanityImageObject
  year?: string
  medium?: string
  artist?: { _id: string; name?: string } // Assuming artist is populated like this
}

// Define a type for Artist items
interface ArtistPageItem {
  _id: string
  name?: string
}

export default async function ExhibitionPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const t = await getTranslations('exhibitions')
  const exhibitionRaw = await getExhibition(params.slug, params.locale)
  if (!exhibitionRaw) return notFound()

  const exhibition = parseExhibition(exhibitionRaw)
  const artists: ArtistPageItem[] = (exhibition.artists || []).map(parseArtist)
  const artworks: ArtworkPageItem[] = (exhibition.artworks || []).map(
    parseArtwork
  )

  const artworksByArtist: Record<string, ArtworkPageItem[]> = {}
  artists.forEach((artist) => {
    artworksByArtist[artist._id] = []
  })
  artworks.forEach((artwork) => {
    const artistId = artwork.artist?._id
    if (artistId && artworksByArtist[artistId]) {
      artworksByArtist[artistId].push(artwork)
    }
  })

  const relatedNews = exhibition.relatedNews || []
  const locale =
    params.locale === 'es' || params.locale === 'en' ? params.locale : 'es'

  const galleryImagesForLightbox: SanityImageObject[] =
    exhibition.gallery?.map((img: any) => ({
      url: img.url,
      alt: img.alt,
    })) || []

  return (
    <div>
      {/* Banner Section */}
      <div className='relative h-[60vh] min-h-[400px] w-full'>
        <Image
          src={exhibition.mainImage.url || '/placeholder.svg'}
          alt={exhibition.mainImage.alt}
          fill
          className='object-cover'
          priority
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-blue-600 mix-blend-multiply opacity-40' />
        <div className='absolute inset-0 flex items-end'>
          <div className='container mx-auto px-4 pb-12'>
            <div className='max-w-3xl text-white'>
              <h1 className='text-5xl font-bold uppercase md:text-6xl'>
                {exhibition.title}
              </h1>
              {exhibition.subtitle && (
                <p className='mt-2 text-xl md:text-2xl italic font-light'>
                  {exhibition.subtitle}
                </p>
              )}
              {artists.length > 0 && (
                <div className='mt-4 flex flex-wrap gap-4 items-center'>
                  {artists.map((artist) => (
                    <span
                      key={artist._id}
                      className='text-lg md:text-xl font-semibold tracking-wide uppercase bg-white/20 px-3 py-1 rounded shadow-sm backdrop-blur'
                    >
                      {artist.name}
                    </span>
                  ))}
                </div>
              )}
              <p className='mt-4 text-xl'>
                {formatDate(exhibition.startDate, locale)} -{' '}
                {formatDate(exhibition.endDate, locale)}
              </p>
              <p className='mt-2 text-lg'>
                {exhibition.location}{' '}
                {exhibition.curator &&
                  `| ${t('curator')}: ${exhibition.curator}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='container mx-auto px-4 py-12'>
        {/* Description Section */}
        {exhibition.description && (
          <div className='mb-16'>
            <h2 className='text-3xl font-bold uppercase mb-6'>
              {t('description')}
            </h2>
            <div className='max-w-3xl'>
              <BlockContent blocks={exhibition.description} />
            </div>
          </div>
        )}

        {/* Gallery Section - Uses ExhibitionImageGallery (Client Component) */}
        {galleryImagesForLightbox.length > 0 && (
          <div className='mb-16'>
            <h2 className='text-3xl font-bold uppercase mb-6'>
              {t('gallery')}
            </h2>
            <ExhibitionImageGallery images={galleryImagesForLightbox} />
          </div>
        )}

        {/* Videos Section */}
        {exhibition.videos && exhibition.videos.length > 0 && (
          <div className='mb-16'>
            <h2 className='text-3xl font-bold uppercase mb-6'>{t('videos')}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {exhibition.videos.map((video: any, i: number) => (
                <div key={i} className='mb-4 group'>
                  <a
                    href={video.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block'
                  >
                    <div className='relative aspect-video overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300'>
                      <Image
                        src={video.thumbnail || '/placeholder.svg'}
                        alt={video.title || 'Video thumbnail'}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                      <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 flex items-center justify-center'>
                        <svg
                          className='w-12 h-12 text-white opacity-75'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm_73-8l-5 4V7l5 4z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className='mt-2 font-bold text-center group-hover:text-blue-600 transition-colors'>
                      {video.title}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Artworks by Artist Section */}
        {artists.map((artist) => (
          <div key={artist._id} className='mb-16'>
            <h2 className='text-3xl font-bold uppercase mb-6'>{artist.name}</h2>
            {artworksByArtist[artist._id] &&
            artworksByArtist[artist._id].length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {artworksByArtist[artist._id].map(
                  (artwork: ArtworkPageItem) => (
                    <ArtworkCard key={artwork._id} artwork={artwork} />
                  )
                )}
              </div>
            ) : (
              <p>{t('noArtworks')}</p>
            )}
          </div>
        ))}

        {/* Related News Section */}
        {relatedNews.length > 0 && (
          <div className='mt-16'>
            <RelatedNews news={relatedNews} title={t('newsTitle')} />
          </div>
        )}
      </div>
    </div>
  )
}
