"use client"

import { useTranslations } from "next-intl"
import ExhibitionCard from "@/components/exhibition-card"
import { getCurrentExhibitions, getUpcomingExhibitions, getPastExhibitions } from "@/lib/dummy-data"
import { motion } from "framer-motion"

export default function ExhibitionsPage() {
  const t = useTranslations("exhibitions")
  const currentExhibitions = getCurrentExhibitions()
  const upcomingExhibitions = getUpcomingExhibitions()
  const pastExhibitions = getPastExhibitions().slice(0, 6) // Limit to 6 for simplicity

  return (
    <div className="container mx-auto px-4 py-32">
      <motion.h1
        className="mb-12 text-5xl font-bold uppercase md:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("title")}
      </motion.h1>

      {/* Current Exhibitions */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2">
          {t("current")}
        </h2>
        <div className="brutalist-grid">
          {currentExhibitions.map((exhibition) => (
            <ExhibitionCard key={exhibition._id} exhibition={exhibition} />
          ))}
          {currentExhibitions.length === 0 && <p className="text-xl">{t("noCurrent")}</p>}
        </div>
      </motion.div>

      {/* Upcoming Exhibitions */}
      {upcomingExhibitions.length > 0 && (
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2">
            {t("upcoming")}
          </h2>
          <div className="brutalist-grid">
            {upcomingExhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition._id} exhibition={exhibition} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Past Exhibitions */}
      {pastExhibitions.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <h2 className="mb-6 text-3xl font-bold uppercase border-b-2 border-black dark:border-white pb-2">
            {t("past")}
          </h2>
          <div className="brutalist-grid">
            {pastExhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition._id} exhibition={exhibition} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
