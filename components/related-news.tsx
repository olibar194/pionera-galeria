'use client'

import { useTranslations } from 'next-intl'
import NewsCard from '@/components/news-card'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { parseNews } from '@/lib/sanity-parsers'

interface RelatedNewsProps {
  news: any[]
  title?: string
}

export default function RelatedNews({ news, title }: RelatedNewsProps) {
  const t = useTranslations('news')

  if (!news || news.length === 0) {
    return null
  }

  // Only show up to 3 news items
  // Asegura que cada noticia pase por parseNews para tener la imagen correctamente generada
  const displayNews = news.slice(0, 3).map(parseNews)

  return (
    <section className='mt-16'>
      <motion.h2
        className='mb-6 text-2xl font-bold uppercase'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title || t('related')}
      </motion.h2>

      <motion.div
        className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {displayNews.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} />
        ))}
      </motion.div>

      {news.length > 3 && (
        <motion.div
          className='mt-8 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href='/noticias'>
            <Button className='border-2 border-black dark:border-white bg-transparent px-6 py-2 text-lg uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'>
              {t('title')}
            </Button>
          </Link>
        </motion.div>
      )}
    </section>
  )
}
