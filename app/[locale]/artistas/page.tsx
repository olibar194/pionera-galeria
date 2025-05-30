import ArtistsGrid from '@/components/artists-grid'
import { getArtists } from '@/sanity/lib/queries'

export default async function ArtistsPage() {
  const artists = await getArtists()
  return <ArtistsGrid artists={artists} />
}
