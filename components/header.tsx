'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Logo from '@/components/ui/logo'
import LanguageSwitcher from '@/components/ui/language-switcher'
import ThemeToggle from '@/components/ui/theme-toggle'
import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'

export default function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Adjust the condition based on your routing setup
  // For example, if your home page is at the root path in both locales
  // you can use the following condition:

  const isHome = pathname === '/' || pathname === '/en'
  // Solo forzar dark en home y sin scroll, en otras rutas usar el theme normal
  const forceDark = isHome && !scrolled ? true : undefined

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/artistas', label: t('artists') },
    { href: '/exposiciones', label: t('exhibitions') },
    { href: '/ferias', label: t('fairs') },
    { href: '/noticias', label: t('news') },
    { href: '/club-atletico-lxs-amores', label: 'C.A.L.A' },
    { href: '/residencias', label: t('residency') },
    { href: '/contacto', label: t('contact') },
  ]

  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <header
      className={`${
        isHome ? 'absolute' : 'fixed'
      } top-0 z-40 w-full transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white dark:bg-black border-b border-black/10 dark:border-white/10 backdrop-blur-sm'
          : 'bg-transparent dark' // Added 'dark' to force dark-theme appearance for children on home (unscrolled)
      }`}
    >
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='flex items-center'>
            <Logo forceDark={forceDark} key={pathname} />
          </Link>

          <div className='flex items-center'>
            {/* Desktop Navigation */}
            <motion.nav
              className='hidden md:flex items-center'
              variants={navVariants}
              initial='hidden'
              animate='visible'
            >
              {navItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-lg uppercase font-bold transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${
                      pathname === item.href || pathname === `/en${item.href}`
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'text-black dark:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className='hidden md:flex items-center ml-4 space-x-4'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            >
              <LanguageSwitcher />
              <ThemeToggle />
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className='md:hidden'>
                <Button
                  variant='ghost'
                  size='icon'
                  className={
                    forceDark
                      ? 'bg-transparent border-2 border-white'
                      : 'border-2 border-black dark:border-white'
                  }
                >
                  <Menu size={24} color={forceDark ? 'white' : undefined} />
                  <span className='sr-only'>{t('toggleMenu', 'Menu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-[300px] sm:w-[400px] border-l-2 border-black dark:border-white bg-white dark:bg-black'
              >
                <span className='sr-only'>
                  <SheetTitle>Menú principal</SheetTitle>
                </span>
                <nav className='flex flex-col space-y-0 mt-8'>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`p-4 text-xl uppercase font-bold transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${
                        pathname === item.href || pathname === `/en${item.href}`
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'text-black dark:text-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className='flex items-center p-4 space-x-4 mt-4 border-t-2 border-black dark:border-white'>
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
