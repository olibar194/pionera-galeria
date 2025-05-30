import HeroCarousel from '@/components/hero-carousel'
import { getAllExhibitions } from '@/sanity/lib/queries'
import { parseExhibition } from '@/lib/sanity-parsers'

export default async function Home({ params }: { params: { locale: string } }) {
  const exhibitionsRaw = await getAllExhibitions(params.locale)
  const exhibitions = exhibitionsRaw.map(parseExhibition)
  return (
    <div className='pt-0'>
      <HeroCarousel exhibitions={exhibitions} />
    </div>
  )
}
