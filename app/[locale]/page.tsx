'use client'

import HeroCarousel from '@/components/hero-carousel'
import { exhibitions } from '@/lib/dummy-data'

export default function Home() {
  return (
    <div className='pt-0'>
      <HeroCarousel exhibitions={exhibitions} />
    </div>
  )
}
