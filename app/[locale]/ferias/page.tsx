import { getTranslations } from 'next-intl/server'
import FairCard from '@/components/fair-card'
import { getFairs } from '@/sanity/lib/queries'
import { parseFair } from '@/lib/sanity-parsers'

export default async function FairsPage() {
  const t = await getTranslations('fairs')
  // Fetch fairs from Sanity y normaliza
  const [upcomingFairsRaw, pastFairsRaw] = await Promise.all([
    getFairs('upcoming'),
    getFairs('past'),
  ])
  const upcomingFairs = upcomingFairsRaw.map(parseFair)
  const pastFairs = pastFairsRaw.map(parseFair)

  // Group past fairs by year
  const pastFairsByYear = pastFairs.reduce(
    (acc: Record<string, any[]>, fair: any) => {
      const year = new Date(fair.endDate).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(fair)
      return acc
    },
    {}
  )

  // Sort years in descending order
  const sortedYears = Object.keys(pastFairsByYear).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a)
  )

  return (
    <div className='container mx-auto px-4 py-32'>
      <h1 className='mb-12 text-5xl font-bold uppercase md:text-6xl'>
        {t('title')}
      </h1>
      {/* Upcoming Fairs */}
      {upcomingFairs.length > 0 && (
        <div className='mb-16'>
          <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
            {t('upcoming')}
          </h2>
          <div className='brutalist-grid'>
            {upcomingFairs.map((fair: any) => (
              <FairCard key={fair._id} fair={fair} />
            ))}
          </div>
        </div>
      )}
      {/* Past Fairs */}
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
