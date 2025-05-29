'use client'

import type React from 'react'
import { useTranslations } from 'next-intl'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  const t = useTranslations('footer')
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(
    null
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [mounted, setMounted] = useState(false) // Add mounted state

  // Avoid hydration mismatch for theme-dependent rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setIsSubmitting(false)
      setSubmitStatus('error')
      setErrorMessage(t('subscribeError'))
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <footer className='border-t-2 border-black dark:border-white bg-white dark:bg-black'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div>
            <div className='flex items-center'>
              {!mounted ? (
                // Placeholder for logo area before mount
                <div className='h-12 w-56' /> // Adjust size as needed
              ) : (
                <>
                  <div className='relative h-12 w-12 mr-3'>
                    <Image
                      src={
                        theme === 'dark'
                          ? '/images/logo-p-white.png'
                          : '/images/logo-p-black.png'
                      }
                      alt='Pionera Logo'
                      fill
                      className='object-contain'
                      priority // Consider adding priority if this is LCP
                    />
                  </div>
                  <div className='relative h-8 w-40'>
                    <Image
                      src={
                        theme === 'dark'
                          ? '/images/logo-text-white.png'
                          : '/images/logo-text-black.png'
                      }
                      alt='Pionera'
                      fill
                      className='object-contain'
                      priority // Consider adding priority if this is LCP
                    />
                  </div>
                </>
              )}
            </div>
            <div className='mt-4 flex space-x-4'>
              <a
                href='#'
                className='border-2 border-black dark:border-white p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors'
                aria-label='Instagram'
              >
                <Instagram size={24} />
              </a>
              <a
                href='#'
                className='border-2 border-black dark:border-white p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors'
                aria-label='Facebook'
              >
                <Facebook size={24} />
              </a>
              <a
                href='#'
                className='border-2 border-black dark:border-white p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors'
                aria-label='Twitter'
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-xl uppercase font-bold mb-4'>{t('contact')}</h3>
            <address className='not-italic space-y-2'>
              <p>Calle de la Galería, 123</p>
              <p>28001 Madrid, España</p>
              <p>
                <a
                  href='tel:+34912345678'
                  className='hover:underline underline-offset-4'
                >
                  +34 91 234 56 78
                </a>
              </p>
              <p>
                <a
                  href='mailto:info@pioneragaleria.com'
                  className='hover:underline underline-offset-4'
                >
                  info@pioneragaleria.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className='text-xl uppercase font-bold mb-4'>
              {t('newsletter')}
            </h3>
            <form onSubmit={handleSubscribe} className='space-y-3'>
              <Input
                type='email'
                placeholder='tu@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-transparent border-black dark:border-white placeholder:text-gray-500 dark:placeholder:text-gray-400'
                aria-label='Email para newsletter'
              />
              <Button
                type='submit'
                className='w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                disabled={isSubmitting}
              >
                {isSubmitting ? t('subscribing') : t('subscribe')}
              </Button>
              {submitStatus === 'success' && (
                <p className='text-green-600 dark:text-green-400 text-sm'>
                  {t('subscribeSuccess')}
                </p>
              )}
              {submitStatus === 'error' && (
                <p className='text-red-600 dark:text-red-400 text-sm'>
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-black/10 dark:border-white/10 text-center text-sm'>
          <p>
            &copy; {new Date().getFullYear()} PIONERA. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
