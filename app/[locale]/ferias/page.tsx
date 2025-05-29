'use client'
import { useTranslations } from 'next-intl'
import FairCard from '@/components/fair-card'
import { fairs, getUpcomingFairs } from '@/lib/dummy-data'
import { motion } from 'framer-motion'

export default function FairsPage() {
  const t = useTranslations('fairs')
  const upcomingFairs = getUpcomingFairs()
  const pastFairs = fairs.filter((fair) => !upcomingFairs.includes(fair))

  // Group past fairs by year
  const pastFairsByYear = pastFairs.reduce(
    (acc: Record<string, any[]>, fair) => {
      const year = new Date(fair.endDate).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(fair)
      return acc
    },
    {}
  )

  // Sort years in descending order!
  const sortedYears = Object.keys(pastFairsByYear).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a)
  )

  return (
    <div className='container mx-auto px-4 py-32'>
      <motion.h1
        className='mb-12 text-5xl font-bold uppercase md:text-6xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('title')}
      </motion.h1>

      {/* Upcoming Fairs */}
      {upcomingFairs.length > 0 && (
        <motion.div
          className='mb-16'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
            {t('upcoming')}
          </h2>
          <div className='brutalist-grid'>
            {upcomingFairs.map((fair) => (
              <FairCard key={fair._id} fair={fair} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Past Fairs */}
      {sortedYears.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className='mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2'>
            {t('past')}
          </h2>
          {sortedYears.map((year) => (
            <div key={year} className='mb-12'>
              <h3 className='mb-6 text-2xl font-semibold text-text-primary dark:text-text-primary-dark'>
                {year}
              </h3>
              <div className='brutalist-grid'>
                {pastFairsByYear[year].map((fair) => (
                  <FairCard key={fair._id} fair={fair} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
