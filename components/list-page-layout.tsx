"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import FadeIn from "@/components/animations/fade-in"
import StaggerChildren from "@/components/animations/stagger-children"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"

interface ListPageLayoutProps {
  title: string
  description?: string
  filters?: {
    id: string
    label: string
  }[]
  children: React.ReactNode
  totalPages?: number
  currentPage?: number
}

export default function ListPageLayout({
  title,
  description,
  filters,
  children,
  totalPages = 5,
  currentPage = 1,
}: ListPageLayoutProps) {
  const { language } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<string | undefined>(filters?.[0]?.id)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <FadeIn>
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">{title}</h1>
          {description && <p className="text-text-secondary">{description}</p>}
        </div>
      </FadeIn>

      {filters && filters.length > 0 && (
        <FadeIn delay={0.1} className="mb-8">
          <div className="flex justify-center">
            <ToggleGroup type="single" value={activeFilter} onValueChange={setActiveFilter}>
              {filters.map((filter) => (
                <ToggleGroupItem
                  key={filter.id}
                  value={filter.id}
                  className="px-4 py-2 data-[state=on]:bg-pionera-blue data-[state=on]:text-gallery-white"
                >
                  {filter.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <StaggerChildren className="mb-8">{children}</StaggerChildren>
      </FadeIn>

      {totalPages > 1 && (
        <FadeIn delay={0.3}>
          <Pagination className="mt-8">
            <PaginationContent>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    className={
                      currentPage === i + 1 ? "bg-pionera-blue text-gallery-white hover:bg-pionera-blue/90" : ""
                    }
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </FadeIn>
      )}
    </div>
  )
}
