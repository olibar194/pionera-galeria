import { client } from './client'

// Helper function to get localized field with fallback to es, en, or base
const localizeField = (field: string, locale: string) => {
  if (locale === 'es') {
    return `coalesce(${field}.es, ${field}.en, ${field})`
  } else if (locale === 'en') {
    return `coalesce(${field}.en, ${field}.es, ${field})`
  } else {
    return `coalesce(${field}.${locale}, ${field}.es, ${field}.en, ${field})`
  }
}

// Get exhibition highlights for homepage
export async function getExhibitionHighlights(locale = 'es') {
  const query = `*[_type == "exhibition" && dateTime(startDate) <= dateTime(now()) && dateTime(endDate) >= dateTime(now())] | order(startDate desc) [0...5] {
    _id,
    "title": ${localizeField('title', locale)},
    "subtitle": ${localizeField('subtitle', locale)},
    "imageUrl": mainImage.asset->url
  }`

  return await client.fetch(query)
}

// Get all artists
export async function getArtists(locale = 'es') {
  const query = `*[_type == "artist"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "portraitImage": portraitImage.asset->url,
    "highlightImage": highlights[0].asset->url,
    "country": ${localizeField('country', locale)},
    "city": ${localizeField('city', locale)}
  }`

  return await client.fetch(query)
}

// Get a single artist by slug
export async function getArtist(slug: string, locale = 'es') {
  const query = `*[_type == "artist" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "portraitImage": portraitImage.asset->url,
    "portfolio": portfolio.asset->url,
    "highlights": highlights[]{ 
      "url": asset->url
    },
    "videos": videos[]{
      "title": ${localizeField('title', locale)},
      "url": url,
      "thumbnail": thumbnail.asset->url
    },
    "country": ${localizeField('country', locale)},
    "city": ${localizeField('city', locale)},
    "birthYear": birthYear,
    "bio": ${localizeField('bio', locale)},
    "statement": ${localizeField('statement', locale)},
    "works": works[]->._id,
    "exhibitions": exhibitions[]-> {
      _id,
      "title": ${localizeField('title', locale)},
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      "startDate": startDate,
      "endDate": endDate
    },
    "fairs": fairs[]-> {
      _id,
      "name": ${localizeField('name', locale)},
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      "startDate": startDate,
      "endDate": endDate,
      "location": ${localizeField('location', locale)}
    }
  }`

  return await client.fetch(query, { slug })
}

// Get artworks by artist
export async function getArtistWorks(artistId: string, locale = 'es') {
  const query = `*[_type == "artwork" && references($artistId)] | order(year desc) {
    _id,
    "title": ${localizeField('title', locale)},
    "artist": {
      "_id": artist->._id,
      "name": artist->name
    },
    "year": year,
    "medium": ${localizeField('medium', locale)},
    "dimensions": dimensions,
    "imageUrl": image.asset->url,
    "description": ${localizeField('description', locale)},
    "gallery": gallery[]{ 
      "url": asset->url
    },
    "videos": videos[]{
      "title": ${localizeField('title', locale)},
      "url": url,
      "thumbnail": thumbnail.asset->url
    }
  }`

  return await client.fetch(query, { artistId })
}

// Get exhibitions (current, upcoming, or past)
export async function getExhibitions(
  status: 'current' | 'upcoming' | 'past',
  locale = 'es'
) {
  let dateFilter = ''

  if (status === 'current') {
    dateFilter =
      'dateTime(startDate) <= dateTime(now()) && dateTime(endDate) >= dateTime(now())'
  } else if (status === 'upcoming') {
    dateFilter = 'dateTime(startDate) > dateTime(now())'
  } else if (status === 'past') {
    dateFilter = 'dateTime(endDate) < dateTime(now())'
  }

  const query = `*[_type == "exhibition" && ${dateFilter}] | order(startDate ${status === 'past' ? 'desc' : 'asc'}) {
    _id,
    "title": ${localizeField('title', locale)},
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "startDate": startDate,
    "endDate": endDate,
    "artists": artists[]->{ 
      _id, 
      name 
    }
  }`

  return await client.fetch(query)
}

// Get a single exhibition by slug
export async function getExhibition(slug: string, locale = 'es') {
  const query = `*[_type == "exhibition" && slug.current == $slug][0] {
    _id,
    "title": ${localizeField('title', locale)},
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "description": ${localizeField('description', locale)},
    "startDate": startDate,
    "endDate": endDate,
    "openingHours": ${localizeField('openingHours', locale)},
    "location": ${localizeField('location', locale)},
    "curator": ${localizeField('curator', locale)},
    "gallery": gallery[]{ 
      "url": asset->url
    },
    "videos": videos[]{
      "title": ${localizeField('title', locale)},
      "url": url,
      "thumbnail": thumbnail.asset->url
    },
    "artists": artists[]->{ 
      _id, 
      name,
      "slug": slug.current,
      "portraitImage": portraitImage.asset->url
    },
    "artworks": artworks[]->._id
  }`

  return await client.fetch(query, { slug })
}

// Get artworks in an exhibition
export async function getExhibitionArtworks(
  exhibitionId: string,
  locale = 'es'
) {
  const query = `*[_type == "artwork" && references($exhibitionId)] | order(year desc) {
    _id,
    "title": ${localizeField('title', locale)},
    "artist": {
      "_id": artist->._id,
      "name": artist->name
    },
    "year": year,
    "medium": ${localizeField('medium', locale)},
    "dimensions": dimensions,
    "imageUrl": image.asset->url,
    "description": ${localizeField('description', locale)},
    "gallery": gallery[]{ 
      "url": asset->url
    },
    "videos": videos[]{
      "title": ${localizeField('title', locale)},
      "url": url,
      "thumbnail": thumbnail.asset->url
    }
  }`

  return await client.fetch(query, { exhibitionId })
}

// Get fairs (upcoming or past)
export async function getFairs(status: 'upcoming' | 'past', locale = 'es') {
  let dateFilter = ''

  if (status === 'upcoming') {
    dateFilter = 'dateTime(startDate) > dateTime(now())'
  } else if (status === 'past') {
    dateFilter = 'dateTime(endDate) < dateTime(now())'
  }

  const query = `*[_type == "fair" && ${dateFilter}] | order(startDate ${status === 'past' ? 'desc' : 'asc'}) {
    _id,
    name,
    "slug": slug.current,
    mainImage { asset, alt },
    startDate,
    endDate,
    location,
    boothNumber,
    description,
    artists[]->{
      _id,
      name,
      "slug": slug.current,
      portraitImage { asset, alt }
    },
    artworks[]->{
      _id,
      title,
      year,
      medium,
      image { asset, alt },
      artist->{ _id, name }
    },
    gallery[]{ asset, alt },
    videos[]{
      title,
      url,
      thumbnail { asset, alt }
    }
  }`

  return await client.fetch(query)
}

// Get a single fair by slug
export async function getFair(slug: string, locale = 'es') {
  const query = `*[_type == "fair" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    mainImage { asset, alt },
    startDate,
    endDate,
    location,
    boothNumber,
    description,
    artists[]->{
      _id,
      name,
      "slug": slug.current,
      portraitImage { asset, alt }
    },
    artworks[]->{
      _id,
      title,
      year,
      medium,
      image { asset, alt },
      artist->{ _id, name }
    },
    gallery[]{ asset, alt },
    videos[]{
      title,
      url,
      thumbnail { asset, alt }
    },
    "relatedNews": *[_type == 'news' && references(^._id)] | order(publicationDate desc) {
      _id,
      title,
      slug,
      mainImage { asset, alt },
      summary,
      content,
      publicationDate,
      isExternalLink,
      externalUrl,
      internalLinkRef->{ _type, slug },
      relatedArtists[]->{ _id, name, slug },
      relatedArtworks[]->{ _id, title, slug },
      relatedExhibitions[]->{ _id, title, slug },
      relatedFairs[]->{ _id, name, slug }
    }
  }`

  return await client.fetch(query, { slug })
}

// Get artworks in a fair
export async function getFairArtworks(fairId: string, locale = 'es') {
  const query = `*[_type == "artwork" && references($fairId)] | order(year desc) {
    _id,
    "title": ${localizeField('title', locale)},
    "artist": {
      "_id": artist->._id,
      "name": artist->name
    },
    "year": year,
    "medium": ${localizeField('medium', locale)},
    "dimensions": dimensions,
    "imageUrl": image.asset->url,
    "description": ${localizeField('description', locale)},
    "gallery": gallery[]{ 
      "url": asset->url
    },
    "videos": videos[]{
      "title": ${localizeField('title', locale)},
      "url": url,
      "thumbnail": thumbnail.asset->url
    }
  }`

  return await client.fetch(query, { fairId })
}

// Get all dossiers
export async function getDossiers(locale = 'es') {
  const query = `*[_type == "dossier"] | order(_createdAt desc) {
    _id,
    "title": ${localizeField('title', locale)},
    "slug": slug.current,
    "mainImage": mainImage.asset->url
  }`

  return await client.fetch(query)
}

// Get a specific dossier by slug
export async function getDossier(slug: string, locale = 'es') {
  const query = `*[_type == "dossier" && slug.current == $slug][0] {
    _id,
    "title": ${localizeField('title', locale)},
    "mainImage": mainImage.asset->url,
    "content": ${localizeField('content', locale)},
    "gallery": gallery[]{ 
      "url": asset->url
    },
    "videos": videos[]{
      "title": ${localizeField('title', locale)},
      "url": url,
      "thumbnail": thumbnail.asset->url
    }
  }`

  return await client.fetch(query, { slug })
}

// Get news (optionally filtered by related entity)
type NewsFilter = {
  relatedFairId?: string
  relatedExhibitionId?: string
  relatedArtistId?: string
}

export async function getNews(locale = 'es', filterObj: NewsFilter = {}) {
  let filter = '*[_type == "news"'
  if (filterObj.relatedFairId)
    filter += ` && references('${filterObj.relatedFairId}')`
  if (filterObj.relatedExhibitionId)
    filter += ` && references('${filterObj.relatedExhibitionId}')`
  if (filterObj.relatedArtistId)
    filter += ` && references('${filterObj.relatedArtistId}')`
  filter += '] | order(publicationDate desc)'

  const query = `${filter} {
    _id,
    title,
    slug,
    mainImage { asset, alt },
    summary,
    content,
    publicationDate,
    isExternalLink,
    externalUrl,
    internalLinkRef->{ _type, slug },
    relatedArtists[]->{ _id, name, slug },
    relatedArtworks[]->{ _id, title, slug },
    relatedExhibitions[]->{ _id, title, slug },
    relatedFairs[]->{ _id, name, slug }
  }`

  return await client.fetch(query)
}

// Get all exhibitions for homepage carousel
export async function getAllExhibitions(locale = 'es') {
  const query = `*[_type == "exhibition"] | order(startDate desc) {
    _id,
    "title": ${localizeField('title', locale)},
    "subtitle": ${localizeField('subtitle', locale)},
    "slug": slug.current,
    mainImage,
    startDate,
    endDate,
    "location": {
      "es": location.es,
      "en": location.en
    },
    artists[]->{ _id, name, "slug": slug.current, portraitImage },
    "description": ${localizeField('description', locale)}
  }`
  return await client.fetch(query)
}

// Get all fairs
export async function getAllFairs(locale = 'es') {
  const query = `*[_type == "fair"] | order(startDate desc) {
    _id,
    "name": {
      "es": name.es,
      "en": name.en
    },
    "slug": slug.current,
    mainImage, // <--- return the full image object
    startDate,
    endDate,
    "location": {
      "es": location.es,
      "en": location.en
    },
    boothNumber,
    description,
    artists[]->{
      _id,
      name,
      "slug": slug.current,
      "portraitImage": {
        "url": portraitImage.asset->url,
        "alt": portraitImage.alt
      }
    },
    artworks[]->{
      _id,
      title,
      year,
      medium,
      "image": {
        "url": image.asset->url,
        "alt": image.alt
      },
      artist->{ _id, name }
    },
    gallery[]{
      "url": asset->url,
      alt
    },
    videos[]{
      title,
      url,
      "thumbnail": {
        "url": thumbnail.asset->url,
        "alt": thumbnail.alt
      }
    }
  }`
  return await client.fetch(query)
}
