// Componente reutilizable para mostrar obras agrupadas por artista en ferias y exposiciones
import ArtworkCard from './artwork-card'

interface Artist {
  _id: string
  name?: string
}

interface Artwork {
  _id: string
  title?: string
  image?: { url: string; alt?: string }
  year?: string
  medium?: string
  dimensions?: string
  description?: any
  artist?: { _id: string; name?: string }
}

interface ArtworksByArtistProps {
  artists: Artist[]
  artworks: Artwork[]
  noArtworksText: string
}

export default function ArtworksByArtist({ artists, artworks, noArtworksText }: ArtworksByArtistProps) {
  // Agrupar artworks por artista
  const artworksByArtist: Record<string, Artwork[]> = {}
  artists.forEach((artist) => {
    artworksByArtist[artist._id] = []
  })
  artworks.forEach((artwork) => {
    const artistId = artwork.artist?._id
    if (artistId && artworksByArtist[artistId]) {
      artworksByArtist[artistId].push(artwork)
    }
  })

  return (
    <>
      {artists.map((artist) => (
        <div key={artist._id} className='mb-16'>
          <h2 className='text-3xl font-bold uppercase mb-6'>{artist.name}</h2>
          {artworksByArtist[artist._id] && artworksByArtist[artist._id].length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {artworksByArtist[artist._id].map((artwork) => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
            </div>
          ) : (
            <p>{noArtworksText}</p>
          )}
        </div>
      ))}
    </>
  )
}
