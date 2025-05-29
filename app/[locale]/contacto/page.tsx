"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export default function ContactPage() {
  const t = useTranslations("contact")

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-3xl">
        <motion.h1
          className="mb-12 text-5xl font-bold uppercase md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("title")}
        </motion.h1>

        <motion.div
          className="grid gap-12 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold uppercase">{t("address")}</h2>
              <p className="mt-2 text-xl">Calle de la Galería, 123</p>
              <p className="text-xl">28001 Madrid, España</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase">{t("hours")}</h2>
              <p className="mt-2 text-xl">{t("schedule.weekdays")}</p>
              <p className="text-xl">{t("schedule.sunday")}</p>
              <p className="text-xl">{t("schedule.monday")}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold uppercase">{t("phone")}</h2>
              <p className="mt-2 text-xl">
                <a href="tel:+34912345678" className="hover:underline underline-offset-4">
                  +34 91 234 56 78
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase">{t("email")}</h2>
              <p className="mt-2 text-xl">
                <a href="mailto:info@pioneragaleria.com" className="hover:underline underline-offset-4">
                  {t("emails.info")}
                </a>
              </p>
              <p className="text-xl">
                <a href="mailto:prensa@pioneragaleria.com" className="hover:underline underline-offset-4">
                  {t("emails.press")}
                </a>
              </p>
              <p className="text-xl">
                <a href="mailto:ventas@pioneragaleria.com" className="hover:underline underline-offset-4">
                  {t("emails.sales")}
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
