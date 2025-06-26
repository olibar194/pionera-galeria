import { client } from './client'

// Get all cala entries from Sanity
export async function getAllCala(locale = 'es') {
  const query = `*[_type == "cala"] | order(publicationDate desc) {
    _id,
    title,
    slug,
    mainImage { asset->{url}, alt },
    gallery[]{asset->{url}, alt},
    summary,
    publicationDate,
    isExternalLink,
    externalUrl,
    content
  }`
  return await client.fetch(query)
}

// Get a single cala entry by slug
export async function getCalaBySlug(slug: string, locale = 'es') {
  const query = `*[_type == "cala" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage { asset->{url}, alt },
    gallery[]{asset->{url}, alt},
    summary,
    publicationDate,
    isExternalLink,
    externalUrl,
    content
  }`
  return await client.fetch(query, { slug })
}
