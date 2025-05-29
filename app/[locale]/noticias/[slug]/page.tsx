"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { formatDate } from "@/lib/dummy-data"
import { getNewsBySlug } from "@/lib/news-data"
import { motion } from "framer-motion"
import BlockContent from "@/components/block-content"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function NewsDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [news, setNews] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof slug === "string") {
      const newsItem = getNewsBySlug(slug)

      if (newsItem) {
        setNews(newsItem)

        // If this is an external link news item, redirect to the external URL
        if (newsItem.isExternalLink && newsItem.externalUrl) {
          window.open(newsItem.externalUrl, "_blank", "noopener,noreferrer")
          router.push("/noticias")
        }

        // If this has an internal reference, we could redirect to that page
        // This is simplified - in a real app, you'd need to determine the correct path
        // based on the reference type (artist, exhibition, fair)
      }

      setLoading(false)
    }
  }, [slug, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <p>{language === "es" ? "Cargando..." : "Loading..."}</p>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <p>{language === "es" ? "Noticia no encontrada" : "News not found"}</p>
        <Link href="/noticias">
          <Button className="mt-4">{language === "es" ? "Volver a Noticias" : "Back to News"}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Button
          onClick={() => router.push("/noticias")}
          variant="ghost"
          className="mb-4 -ml-4 flex items-center text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft size={16} className="mr-2" />
          {language === "es" ? "Volver a Noticias" : "Back to News"}
        </Button>
      </motion.div>

      <div className="mx-auto max-w-4xl">
        <motion.h1
          className="mb-4 text-3xl font-bold uppercase md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {language === "es" ? news.title.es : news.title.en}
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {formatDate(news.publicationDate, language)}
        </motion.p>

        <motion.div
          className="relative mb-8 aspect-video w-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Image
            src={news.mainImage.url || "/placeholder.svg"}
            alt={news.mainImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
            priority
          />
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none dark:prose-invert"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {news.content && <BlockContent blocks={language === "es" ? news.content.es : news.content.en} />}

          {news.isExternalLink && news.externalUrl && (
            <div className="mt-8">
              <Link
                href={news.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-pionera-blue hover:underline"
              >
                {language === "es" ? "Leer artículo completo" : "Read full article"}
                <ExternalLink size={16} className="ml-2" />
              </Link>
            </div>
          )}

          {news.internalLinkRef && (
            <div className="mt-8">
              <Link
                href={`/noticias/${news.slug.current}`}
                className="inline-flex items-center text-pionera-blue hover:underline"
              >
                {language === "es" ? "Ver más información" : "View more information"}
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
