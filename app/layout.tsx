import type React from 'react'
import './globals.css' // Keep global styles, they apply to the whole app

// This RootLayout will wrap app/[locale]/layout.tsx.
// Since app/[locale]/layout.tsx will render the <html> and <body> tags,
// this RootLayout should be minimal.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The ThemeProvider, font setup, and metadata will be moved to app/[locale]/layout.tsx
  // to be alongside the html tag definition where lang={locale} is set.
  return <>{children}</>
}
