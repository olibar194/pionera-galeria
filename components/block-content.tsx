"use client"

interface BlockContentProps {
  blocks: any[]
}

export default function BlockContent({ blocks }: BlockContentProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null
  }

  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      {blocks.map((block, index) => {
        // Simple implementation for the dummy data structure
        if (block._type === "block") {
          return (
            <p key={index} className="mb-4">
              {block.children.map((child: any, childIndex: number) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          )
        }
        return null
      })}
    </div>
  )
}
