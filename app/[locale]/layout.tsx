import type React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/header'
import Footer from '@/components/footer'
import PageTransition from '@/components/page-transition'
import { ThemeProvider } from '@/components/theme-provider'
import { Roboto_Condensed } from 'next/font/google'
import type { Metadata } from 'next'
import { LanguageProvider } from '@/components/language-provider'

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  weight: ['300', '400', '700'],
})

export const metadata: Metadata = {
  title: 'PIONERA GALERÍA',
  description: 'Galería de arte contemporáneo',
  generator: 'v0.dev',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Add this workaround for Next.js dev mode error
  // await Promise.resolve()

  const { locale } = params
  const messages = await getMessages({ locale })

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className={robotoCondensed.variable}
      suppressHydrationWarning
    >
      <body className='font-roboto bg-white text-black dark:bg-black dark:text-white antialiased'>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <LanguageProvider>
              <div className='flex min-h-screen flex-col'>
                <Header />
                <main className='flex-1'>
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </div>
            </LanguageProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
