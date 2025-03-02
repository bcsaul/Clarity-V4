"use client"

/**
 * Custom React hooks for the ClarityNews application
 */

import { useState, useEffect, useCallback } from "react"
import { safeJsonParse } from "../utils"

/**
 * Hook for managing local storage state
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue

    const item = window.localStorage.getItem(key)
    return item ? safeJsonParse(item, initialValue) : initialValue
  })

  // Update localStorage when value changes
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      setStoredValue(value)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    },
    [key],
  )

  return [storedValue, setValue] as const
}

/**
 * Hook for managing window size
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}

/**
 * Hook for managing async data fetching
 */
export function useAsync<T>(asyncFn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<{
    data?: T
    error?: Error
    loading: boolean
  }>({
    loading: true,
  })

  useEffect(() => {
    let mounted = true

    asyncFn()
      .then((data) => {
        if (mounted) {
          setState({ data, loading: false })
        }
      })
      .catch((error) => {
        if (mounted) {
          setState({ error, loading: false })
        }
      })

    return () => {
      mounted = false
    }
  }, [asyncFn, ...deps]) // Added asyncFn to dependencies

  return state
}

/**
 * Hook for managing keyboard shortcuts
 */
export function useKeyPress(targetKey: string, callback: () => void) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [targetKey, callback])
}

