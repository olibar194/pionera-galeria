'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import NewsCard from '@/components/news-card'
import { getAllNews } from '@/sanity/lib/news-queries'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function NewsPage() {
  const t = useTranslations('news')
  const tPages = useTranslations('pages')
  const [allNews, setAllNews] = useState<any[]>([])
  const [visibleNews, setVisibleNews] = useState(6)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllNews().then((news: any[]) => {
      setAllNews(news)
      setLoading(false)
    })
  }, [])

  const loadMore = () => {
    setVisibleNews((prev: number) => Math.min(prev + 6, allNews.length))
  }

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-32 text-center'>
        <p>Cargando...</p>
      </div>
    )
  }

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

      <motion.div
        className='brutalist-grid mb-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {allNews.slice(0, visibleNews).map((news: any) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </motion.div>

      {visibleNews < allNews.length && (
        <div className='flex justify-center'>
          <Button
            onClick={loadMore}
            className='border-2 border-black dark:border-white bg-transparent text-black dark:text-white px-8 py-6 text-lg uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
          >
            {tPages('loadMore')}
          </Button>
        </div>
      )}
    </div>
  )
}
