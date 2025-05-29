"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  delayIncrement?: number
  staggerDelay?: number
}

export default function StaggerChildren({
  children,
  className = "",
  delayIncrement = 0.1,
  staggerDelay = 0.1,
}: StaggerChildrenProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayIncrement,
      },
    },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  )
}
