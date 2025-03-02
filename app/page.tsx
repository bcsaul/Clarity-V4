/**
 * Home page component displaying story feed
 */

"use client"

import { useState, useCallback, useMemo, lazy, Suspense } from "react"
import Link from "next/link"
import { CATEGORIES } from "@/lib/constants"
import type { CategoryId, Story } from "@/lib/types"
import { CategoryFilter } from "@/components/features/story/category-filter"
import { SearchInput } from "@/components/ui/search-input"
import { DollarSign, Trophy, Grid2X2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DateNavigation } from "@/components/ui/date-navigation"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useSafeData, LoadingFallback, ErrorFallback } from "@/hooks/use-safe-data"
import { getMockStories } from "@/lib/mock-data"
import { MemoryCache } from "@/lib/utils/performance"

// Performance optimization: Use a cached version of data fetching
const getCachedStories = () => {
  const cacheKey = 'mock-stories';
  const cachedStories = MemoryCache.get<Story[]>(cacheKey);
  
  if (cachedStories) {
    return Promise.resolve(cachedStories);
  }
  
  return getMockStories().then(stories => {
    MemoryCache.set(cacheKey, stories, 60000); // Cache for 1 minute
    return stories;
  });
};

// Lazy load the StoryCard component to improve initial page load
const StoryCard = lazy(() => import("@/components/features/story/story-card").then(mod => ({ 
  default: mod.StoryCard 
})))

/**
 * Home page component with error handling and optimized rendering
 */
export default function HomePage() {
  // State for category and search filters
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date())

  // Fetch stories with error handling using the cached version
  const { 
    data: stories, 
    isLoading, 
    isError, 
    error, 
    retry 
  } = useSafeData<Story[]>(
    getCachedStories,
    [] // No dependencies, only fetch once
  )

  // Memoized filter function to prevent unnecessary re-calculation
  const filterStories = useCallback((story: Story) => {
    const matchesCategory = selectedCategory === "all" || story.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }, [selectedCategory, searchQuery])

  // Apply filters with memoization to prevent re-filtering on every render
  const filteredStories = useMemo(() => {
    return stories?.filter(filterStories) || []
  }, [stories, filterStories])

  // Render different states
  let content
  if (isLoading) {
    content = <LoadingFallback message="Loading stories..." />
  } else if (isError) {
    content = <ErrorFallback error={error} retry={retry} message="Failed to load stories" />
  } else if (filteredStories.length === 0) {
    content = (
      <div className="text-center p-8 bg-muted/30 rounded-lg">
        <h3 className="font-medium mb-2">No stories found</h3>
        <p className="text-muted-foreground text-sm">
          Try adjusting your filters or search criteria
        </p>
      </div>
    )
  } else {
    content = (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStories.map((story) => (
          <Suspense key={story.id} fallback={<div className="h-80 bg-muted/30 animate-pulse rounded-lg"></div>}>
            <StoryCard story={story} />
          </Suspense>
        ))}
      </div>
    )
  }

  // Memoize the header to prevent unnecessary re-renders
  const header = useMemo(() => (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-1" /> {/* Spacer */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">ClarityNews</h1>
        </Link>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="transition-all hover:scale-105">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="transition-all hover:scale-105">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  ), []);

  // Memoize the quick access buttons to prevent unnecessary re-renders
  const quickAccessButtons = useMemo(() => (
    <div className="fixed top-20 right-4 flex flex-col gap-2 z-40">
      <Link href="/games">
        <Button variant="outline" size="lg" className="w-12 h-12 bg-white hover:bg-white/90 shadow-md">
          <Grid2X2 className="h-6 w-6 text-primary" />
          <span className="sr-only">Games</span>
        </Button>
      </Link>
      <Link href="/stocks">
        <Button variant="outline" size="lg" className="w-12 h-12 bg-white hover:bg-white/90 shadow-md">
          <DollarSign className="h-6 w-6 text-green-600" />
          <span className="sr-only">Stocks</span>
        </Button>
      </Link>
      <Link href="/sports">
        <Button variant="outline" size="lg" className="w-12 h-12 bg-white hover:bg-white/90 shadow-md">
          <Trophy className="h-6 w-6 text-orange-500" />
          <span className="sr-only">Sports</span>
        </Button>
      </Link>
    </div>
  ), []);

  // Memoize the filters to prevent unnecessary re-renders
  const filters = useMemo(() => (
    <div className="mb-8 space-y-4">
      <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search stories..." />
      <CategoryFilter categories={CATEGORIES} selected={selectedCategory} onSelect={setSelectedCategory} />
      <DateNavigation date={currentDate} onDateChange={setCurrentDate} />
    </div>
  ), [searchQuery, selectedCategory, currentDate, setSearchQuery, setSelectedCategory, setCurrentDate]);

  return (
    <ErrorBoundary componentName="HomePage">
      <main className="min-h-screen bg-background py-8">
        {header}
        {quickAccessButtons}

        <div className="container mx-auto px-4 py-4">
          {/* Filters */}
          {filters}

          {/* Stories Grid with different states */}
          {content}
        </div>
      </main>
    </ErrorBoundary>
  )
}

