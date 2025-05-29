"use client"
import { useTranslations } from "next-intl"
import StaggerItem from "@/components/animations/stagger-item"
import FairCard from "@/components/fair-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { fairs, getUpcomingFairs } from "@/lib/dummy-data"

export default function FairsPage() {
  const t = useTranslations("fairs")
  const upcomingFairs = getUpcomingFairs()
  const pastFairs = fairs.filter((fair) => !upcomingFairs.includes(fair))

  // Group past fairs by year
  const pastFairsByYear = pastFairs.reduce((acc: Record<string, any[]>, fair) => {
    const year = new Date(fair.endDate).getFullYear().toString()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(fair)
    return acc
  }, {})

  // Sort years in descending order
  const sortedYears = Object.keys(pastFairsByYear).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Upcoming Fairs */}
      {upcomingFairs.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-text-primary">{t("upcoming")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {upcomingFairs.map((fair) => (
              <StaggerItem key={fair._id}>
                <FairCard fair={fair} />
              </StaggerItem>
            ))}
          </div>
        </section>
      )}

      {/* Past Fairs */}
      {sortedYears.length > 0 && (
        <section>
          <h2 className="mb-8 text-3xl font-bold text-text-primary">{t("past")}</h2>

          {/* Show the most recent year's fairs directly */}
          {sortedYears.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-6 text-xl font-semibold text-text-primary">{sortedYears[0]}</h3>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {pastFairsByYear[sortedYears[0]].map((fair) => (
                  <StaggerItem key={fair._id}>
                    <FairCard fair={fair} />
                  </StaggerItem>
                ))}
              </div>
            </div>
          )}

          {/* Rest of the years in accordion */}
          {sortedYears.length > 1 && (
            <Accordion type="single" collapsible className="w-full">
              {sortedYears.slice(1).map((year) => (
                <AccordionItem key={year} value={year}>
                  <AccordionTrigger className="text-xl font-semibold text-text-primary">{year}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3">
                      {pastFairsByYear[year].map((fair) => (
                        <StaggerItem key={fair._id}>
                          <FairCard fair={fair} />
                        </StaggerItem>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>
      )}
    </div>
  )
}
