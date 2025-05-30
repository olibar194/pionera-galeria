'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LogoProps {
  forceDark?: boolean
}

export default function Logo({ forceDark }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className='h-10 w-48' />
  }

  const isDark = forceDark || theme === 'dark'

  return (
    <motion.div
      className='flex items-center'
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className='flex items-center'>
        <div className='relative h-10 w-10 mr-3'>
          <Image
            src={
              isDark ? '/images/logo-p-white.png' : '/images/logo-p-black.png'
            }
            alt='Pionera Logo'
            fill
            className='object-contain'
            priority
          />
        </div>
        <div className='relative h-6 w-32'>
          <Image
            src={
              isDark
                ? '/images/logo-text-white.png'
                : '/images/logo-text-black.png'
            }
            alt='Pionera'
            fill
            className='object-contain'
            priority
          />
        </div>
      </div>
    </motion.div>
  )
}
