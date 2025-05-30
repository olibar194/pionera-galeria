import { getTranslations } from 'next-intl/server'
import ExhibitionCard from '@/components/exhibition-card'
import { getAllExhibitions } from '@/sanity/lib/queries'
import { parseExhibition } from '@/lib/sanity-parsers'

export default async function ExhibitionsPage({
  params,
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('exhibitions')
  // Fetch all exhibitions from Sanity
  const exhibitionsRaw = await getAllExhibitions(params.locale)
  const exhibitions: any[] = exhibitionsRaw.map(parseExhibition)

  const now = new Date()
  // Agrupar exposiciones
  const currentExhibitions = exhibitions.filter(
    (exh: any) => new Date(exh.startDate) <= now && new Date(exh.endDate) >= now
  )
  const upcomingExhibitions = exhibitions.filter(
    (exh: any) => new Date(exh.startDate) > now
  )
  const pastExhibitions = exhibitions.filter(
    (exh: any) => new Date(exh.endDate) < now
  )

  return (
    <div className='container mx-auto px-4 py-32'>
      <h1 className='mb-12 text-5xl font-bold uppercase md:text-6xl'>
        {t('title')}
      </h1>

      {/* Current Exhibitions */}
      <div className='mb-16'>
        <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
          {t('current')}
        </h2>
        <div className='brutalist-grid'>
          {currentExhibitions.map((exhibition: any) => (
            <ExhibitionCard key={exhibition._id} exhibition={exhibition} />
          ))}
          {currentExhibitions.length === 0 && (
            <p className='text-xl'>{t('noCurrent')}</p>
          )}
        </div>
      </div>

      {/* Upcoming Exhibitions */}
      {upcomingExhibitions.length > 0 && (
        <div className='mb-16'>
          <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
            {t('upcoming')}
          </h2>
          <div className='brutalist-grid'>
            {upcomingExhibitions.map((exhibition: any) => (
              <ExhibitionCard key={exhibition._id} exhibition={exhibition} />
            ))}
          </div>
        </div>
      )}

      {/* Past Exhibitions */}
      {pastExhibitions.length > 0 && (
        <div>
          <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
            {t('past')}
          </h2>
          <div className='brutalist-grid'>
            {pastExhibitions.map((exhibition: any) => (
              <ExhibitionCard key={exhibition._id} exhibition={exhibition} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
