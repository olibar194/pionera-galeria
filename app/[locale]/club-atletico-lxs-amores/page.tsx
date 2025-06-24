import { getAllCala } from '../../../sanity/lib/cala-queries'
import BlockContent from '@/components/block-content'
import Image from 'next/image'

export default async function CalaListPage({ params }) {
  const locale = params?.locale || 'es'
  const calaEntries = await getAllCala(locale)
  const cala = calaEntries[0] // Solo uno, el más reciente o único

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

  return (
    <div className='container mx-auto px-4 py-32'>
      <h1 className='mb-4 text-3xl font-bold uppercase md:text-4xl lg:text-5xl'>
        {cala.title?.[locale] || cala.title?.es || cala.title?.en || ''}
      </h1>
      <p className='mb-8 text-lg text-text-secondary'>
        {cala.publicationDate &&
          new Date(cala.publicationDate).toLocaleDateString(locale)}
      </p>
      <div className='relative mb-8 aspect-video w-full overflow-hidden'>
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
      </div>
      <div className='prose prose-lg max-w-none dark:prose-invert'>
        {cala.content && (
          <BlockContent
            blocks={
              cala.content?.[locale] || cala.content?.es || cala.content?.en
            }
          />
        )}
      </div>
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
  )
}
