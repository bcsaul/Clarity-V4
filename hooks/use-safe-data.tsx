"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

/**
 * Status states for data fetching
 */
type Status = "idle" | "loading" | "success" | "error"

/**
 * Result of the useSafeData hook
 */
interface UseSafeDataResult<T> {
  data: T | null
  status: Status
  error: Error | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  retry: () => void
}

/**
 * Custom hook for safer data fetching with proper error handling
 * 
 * @param fetchFn - Function that returns the data or Promise
 * @param dependencies - Array of dependencies to trigger refetch
 * @param initialData - Optional initial data
 * @returns Object containing data, status, and error information
 */
export function useSafeData<T>(
  fetchFn: () => T | Promise<T>,
  dependencies: any[] = [],
  initialData: T | null = null
): UseSafeDataResult<T> {
  const [data, setData] = useState<T | null>(initialData)
  const [status, setStatus] = useState<Status>(initialData ? "success" : "idle")
  const [error, setError] = useState<Error | null>(null)
  
  // Function to fetch data with error handling
  const fetchData = async () => {
    setStatus("loading")
    setError(null)
    
    try {
      const result = await Promise.resolve(fetchFn())
      setData(result)
      setStatus("success")
    } catch (err) {
      console.error("Error fetching data:", err)
      setStatus("error")
      setError(err instanceof Error ? err : new Error(String(err)))
    }
  }
  
  // Retry function to attempt fetching again
  const retry = () => {
    fetchData()
  }
  
  // Effect to fetch data when dependencies change
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
  
  return {
    data,
    status,
    error,
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
    retry
  }
}

/**
 * Component to display during data loading
 */
export function LoadingFallback({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-8 text-muted-foreground">
      <div className="animate-pulse">{message}</div>
    </div>
  )
}

/**
 * Component to display during data loading errors
 */
export function ErrorFallback({ 
  error, 
  retry,
  message = "Failed to load data"
}: { 
  error: Error | null
  retry: () => void
  message?: string 
}) {
  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 my-4">
      <h3 className="font-medium text-destructive">{message}</h3>
      {error && <p className="text-sm mt-1 mb-3">{error.message}</p>}
      <Button onClick={retry} size="sm" variant="outline" className="mt-2">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  )
} 