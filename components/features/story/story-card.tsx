"use client"

/**
 * Story card component for displaying story previews
 */

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CATEGORIES } from "@/lib/constants"
import type { Story } from "@/lib/types"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useState } from "react"

interface StoryCardProps {
  story: Story
}

/**
 * StoryCardContent component - The actual card content
 * Separated so we can wrap it with ErrorBoundary
 */
function StoryCardContent({ story }: StoryCardProps) {
  // State to track image loading errors
  const [imageError, setImageError] = useState(false)
  
  // Find category details
  const category = CATEGORIES.find((c) => c.id === story.category.toLowerCase())

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Link href={`/story/${story.id}`}>
        <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
          <CardContent className="p-0">
            {/* Image with fallback and performance optimizations */}
            <div className="relative h-48 w-full">
              <Image
                src={imageError ? "/placeholder.svg" : (story.imageUrl || "/placeholder.svg")}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-t-lg"
                onError={() => setImageError(true)}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Category and Date */}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs text-white ${category?.color || "bg-gray-500"}`}>
                  {category?.label || story.category || "General"}
                </span>
                <span className="text-sm text-muted-foreground">{story.readTime || "Unknown"}</span>
              </div>

              {/* Title and Summary */}
              <div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">{story.title || "Untitled Story"}</h2>
                <p className="text-muted-foreground line-clamp-2">{story.summary || "No summary available"}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-muted-foreground">{story.date || "No date"}</span>
                <span className="flex items-center text-primary">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

/**
 * StoryCard component wrapped with ErrorBoundary for resilience
 */
function StoryCard({ story }: StoryCardProps) {
  // Custom fallback UI specific to story cards
  const fallback = (
    <Card className="h-full bg-muted/50">
      <CardContent className="p-4 flex flex-col items-center justify-center h-48">
        <p className="text-muted-foreground text-sm">Failed to load story</p>
      </CardContent>
    </Card>
  )

  return (
    <ErrorBoundary fallback={fallback} componentName="StoryCard">
      <StoryCardContent story={story} />
    </ErrorBoundary>
  )
}

// Export both named and default export for compatibility
export { StoryCard }
export default StoryCard

