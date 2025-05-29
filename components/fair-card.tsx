"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDate } from "@/lib/dummy-data"
import { motion } from "framer-motion"
import { Link } from "@/i18n/navigation"

interface FairCardProps {
  fair: any
}

export default function FairCard({ fair }: FairCardProps) {
  const locale = useLocale() as "es" | "en"

  return (
    <Link href={`/ferias/${fair.slug.current}`}>
      <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={fair.mainImage.url || "/placeholder.svg"}
              alt={fair.mainImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-display text-lg font-medium">{locale === "es" ? fair.name.es : fair.name.en}</h3>
            <p className="mt-2 text-xs text-text-secondary">
              {formatDate(fair.startDate, locale)} - {formatDate(fair.endDate, locale)}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <p className="text-xs text-text-secondary">{locale === "es" ? fair.location.es : fair.location.en}</p>
            <p className="ml-auto text-xs font-medium text-pionera-blue">{fair.boothNumber}</p>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
