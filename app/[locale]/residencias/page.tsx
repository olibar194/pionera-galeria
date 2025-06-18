import { notFound } from 'next/navigation'
import { getResidency } from '@/sanity/lib/queries'
import ResidenciasPage from '@/components/residencias-page'

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params
  if (!['es', 'en'].includes(locale)) return notFound()

  const data = await getResidency(locale)
  if (!data) return notFound()

  return <ResidenciasPage {...data} locale={locale} />
}
