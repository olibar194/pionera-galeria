'use client'
import { PortableText, PortableTextComponents } from '@portabletext/react'

interface BlockContentProps {
  blocks: any[]
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
}

export default function BlockContent({ blocks }: BlockContentProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null
  }
  return (
    <div className='prose prose-gray max-w-none dark:prose-invert'>
      <PortableText value={blocks} components={components} />
    </div>
  )
}
