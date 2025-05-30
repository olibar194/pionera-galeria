import { urlFor } from '@/sanity/lib/image'

// Helper para parsear imágenes de Sanity a formato { url, alt }
export function parseSanityImage(image: any): { url: string; alt: string } {
  if (!image || !image.asset) return { url: '/placeholder.svg', alt: '' }
  return {
    url: urlFor(image).url(),
    alt: image.alt || '',
  }
}

// Helper para obtener block content de description según locale
export function getBlockContentByLocale(description: any, locale: string) {
  if (!description) return []
  if (
    typeof description === 'object' &&
    (description[locale] || description['es'])
  ) {
    return description[locale] || description['es']
  }
  return description
}

// Helper para parsear ferias
export function parseFair(fair: any) {
  return {
    ...fair,
    mainImage: parseSanityImage(fair.mainImage),
    artworks: (fair.artworks || []).map(parseArtwork),
    // Puedes agregar aquí otros campos normalizados si hace falta
  }
}

// Helper para parsear exposiciones
export function parseExhibition(exh: any) {
  return {
    ...exh,
    slug: typeof exh.slug === 'string' ? exh.slug : exh.slug?.current || '',
    mainImage: parseSanityImage(exh.mainImage),
    gallery: (exh.gallery || []).map(parseSanityImage),
    videos: (exh.videos || []).map((video: any) => ({
      ...video,
      thumbnail: parseSanityImage(video.thumbnail),
    })),
    // Otros campos si es necesario
  }
}

// Helper para parsear artistas
export function parseArtist(artist: any) {
  return {
    ...artist,
    portraitImage: parseSanityImage(artist.portraitImage),
    // Otros campos si es necesario
  }
}

// Helper para parsear artworks (obras) y devolver imagen principal
export function parseArtwork(artwork: any) {
  return {
    ...artwork,
    image: parseSanityImage(artwork.image),
    // Otros campos si es necesario
  }
}

// Helper para formatear fechas en español e inglés
export function formatFairDateRange(
  start: string,
  end: string,
  locale: string
) {
  const opts: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const startDate = new Date(start)
  const endDate = new Date(end)
  const formatter = new Intl.DateTimeFormat(locale, opts)
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`
}

// Helper para parsear noticias de Sanity
export function parseNews(news: any) {
  return {
    ...news,
    mainImage: parseSanityImage(news.mainImage),
  }
}
