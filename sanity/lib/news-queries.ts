import { client } from './client'

// Get all news from Sanity
export async function getAllNews(locale = 'es') {
  const query = `*[_type == "news"] | order(publicationDate desc) {
    _id,
    title,
    slug,
    mainImage { asset->{url}, alt },
    summary,
    publicationDate,
    isExternalLink,
    externalUrl,
    internalLinkRef->{ _type, slug },
    content,
    relatedArtists[]->{ _id, name, slug },
    relatedArtworks[]->{ _id, title, slug },
    relatedExhibitions[]->{ _id, title, slug },
    relatedFairs[]->{ _id, name, slug }
  }`
  return await client.fetch(query)
}

// Get a single news item by slug
export async function getNewsBySlug(slug: string, locale = 'es') {
  const query = `*[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage { asset->{url}, alt },
    summary,
    publicationDate,
    isExternalLink,
    externalUrl,
    internalLinkRef->{ _type, slug },
    content,
    relatedArtists[]->{ _id, name, slug },
    relatedArtworks[]->{ _id, title, slug },
    relatedExhibitions[]->{ _id, title, slug },
    relatedFairs[]->{ _id, name, slug }
  }`
  return await client.fetch(query, { slug })
}
