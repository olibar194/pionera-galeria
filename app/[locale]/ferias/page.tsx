import { getTranslations } from 'next-intl/server'
import FairCard from '@/components/fair-card'
import { getAllFairs } from '@/sanity/lib/queries'
import { parseFair } from '@/lib/sanity-parsers'

export default async function FairsPage() {
  const t = await getTranslations('fairs')
  // Fetch all fairs from Sanity
  const fairsRaw = await getAllFairs()
  const fairs = fairsRaw.map(parseFair)

  const now = new Date()
  // Agrupar ferias
  const actualFairs = fairs.filter(
    (fair) => new Date(fair.startDate) <= now && new Date(fair.endDate) >= now
  )
  const futureFairs = fairs.filter((fair) => new Date(fair.startDate) > now)
  const pastFairs = fairs.filter((fair) => new Date(fair.endDate) < now)

  // Agrupar pasadas por año
  const pastFairsByYear = pastFairs.reduce(
    (acc: Record<string, any[]>, fair: any) => {
      const year = new Date(fair.endDate).getFullYear().toString()
      if (!acc[year]) acc[year] = []
      acc[year].push(fair)
      return acc
    },
    {}
  )
  const sortedYears = Object.keys(pastFairsByYear).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a)
  )

  return (
    <div className='container mx-auto px-4 py-32'>
      <h1 className='mb-12 text-5xl font-bold uppercase md:text-6xl'>
        {t('title')}
      </h1>
      {/* Actual Fairs */}
      {actualFairs.length > 0 && (
        <div className='mb-16'>
          <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
            {t('current')}
          </h2>
          <div className='brutalist-grid'>
            {actualFairs.map((fair: any) => (
              <FairCard key={fair._id} fair={fair} />
            ))}
          </div>
        </div>
      )}
      {/* Future Fairs */}
      {futureFairs.length > 0 && (
        <div className='mb-16'>
          <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
            {t('upcoming')}
          </h2>
          <div className='brutalist-grid'>
            {futureFairs.map((fair: any) => (
              <FairCard key={fair._id} fair={fair} />
            ))}
          </div>
        </div>
      )}
      {/* Past Fairs by Year */}
      {sortedYears.length > 0 && (
        <div>
          <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
            {t('past')}
          </h2>
          {sortedYears.map((year) => (
            <div key={year} className='mb-12'>
              <h3 className='mb-6 text-2xl font-semibold text-text-primary dark:text-text-primary-dark'>
                {year}
              </h3>
              <div className='brutalist-grid'>
                {pastFairsByYear[year].map((fair: any) => (
                  <FairCard key={fair._id} fair={fair} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
