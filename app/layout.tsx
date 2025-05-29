import type React from 'react'
import './globals.css' // Keep global styles, they apply to the whole app
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Roboto_Condensed } from 'next/font/google'

// This RootLayout will wrap app/[locale]/layout.tsx.
// Since app/[locale]/layout.tsx will render the <html> and <body> tags,
// this RootLayout should be minimal.

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  weight: ['300', '400', '700'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The ThemeProvider, font setup, and metadata will be moved to app/[locale]/layout.tsx
  // to be alongside the html tag definition where lang={locale} is set.

  // Fetch messages for the default locale or a fallback.
  // Note: This assumes 'es' is your default/fallback. Adjust if necessary.
  // Or, consider how you want to handle the root page's language context if it's truly locale-agnostic
  // before a locale is determined by the middleware.
  // For now, we'll fetch 'es' messages as a sensible default.
  const messages = await getMessages({ locale: 'es' })

  return (
    <html
      lang='es'
      className={robotoCondensed.variable}
      suppressHydrationWarning
    >
      <body className='font-roboto bg-white text-black dark:bg-black dark:text-white antialiased'>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <LanguageProvider>{children}</LanguageProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
