'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/dummy-data'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

interface HeroCarouselProps {
  exhibitions: any[]
}

export default function HeroCarousel({ exhibitions }: HeroCarouselProps) {
  const locale = useLocale() as 'es' | 'en'
  const t = useTranslations('pages')
  const [current, setCurrent] = useState(0)
  const length = exhibitions.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [length])

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(exhibitions) || exhibitions.length <= 0) {
    return null
  }

  return (
    <section className='relative h-screen w-full overflow-hidden'>
      <div className='absolute inset-0 z-10 flex items-center justify-between px-4'>
        <Button
          onClick={prevSlide}
          variant='outline'
          size='icon'
          className='h-12 w-12 rounded-none border-2 border-white bg-black/50 text-white hover:bg-black hover:text-white dark:border-black dark:bg-white/50 dark:text-black dark:hover:bg-white dark:hover:text-black'
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          onClick={nextSlide}
          variant='outline'
          size='icon'
          className='h-12 w-12 rounded-none border-2 border-white bg-black/50 text-white hover:bg-black hover:text-white dark:border-black dark:bg-white/50 dark:text-black dark:hover:bg-white dark:hover:text-black'
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      <AnimatePresence mode='wait'>
        {exhibitions.map((exhibition, index) => {
          return (
            index === current && (
              <motion.div
                key={exhibition._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='absolute inset-0'
              >
                <div className='relative h-full w-full'>
                  <Image
                    src={exhibition.mainImage.url || '/placeholder.svg'}
                    alt={exhibition.mainImage.alt}
                    fill
                    className='object-cover'
                    priority
                    sizes='100vw'
                  />
                  <motion.div
                    className='absolute inset-0 bg-blue-600 mix-blend-multiply'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1 }}
                  />
                </div>

                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='container mx-auto px-4 text-center text-white'>
                    <motion.h1
                      className='mb-4 text-5xl font-bold uppercase md:text-7xl'
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {locale === 'es'
                        ? exhibition.title.es
                        : exhibition.title.en}
                    </motion.h1>
                    {exhibition.subtitle && (
                      <motion.p
                        className='mb-6 text-xl md:text-2xl'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        {locale === 'es'
                          ? exhibition.subtitle.es
                          : exhibition.subtitle.en}
                      </motion.p>
                    )}
                    <motion.p
                      className='mb-8 text-lg'
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      {formatDate(exhibition.startDate, locale)} -{' '}
                      {formatDate(exhibition.endDate, locale)}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      <Link href={`/exposiciones/${exhibition.slug.current}`}>
                        <Button className='h-14 border-2 border-white bg-transparent px-8 text-lg uppercase hover:bg-white hover:text-black'>
                          {t('viewExhibition')}
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>

                <div className='absolute bottom-8 left-0 right-0 flex justify-center space-x-2'>
                  {exhibitions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-3 w-12 ${i === current ? 'bg-white' : 'bg-white/50'} transition-all duration-300`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            )
          )
        })}
      </AnimatePresence>
    </section>
  )
}
