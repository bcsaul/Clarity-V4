/**
 * Core type definitions for ClarityNews
 */

import type { LucideIcon } from "lucide-react"

// Story Types
export interface Story {
  id: number
  title: string
  summary: string
  teaser: string
  imageUrl: string
  date: string
  readTime: string
  category: string
  facts?: string[]
  perspectives?: Perspective[]
  markets?: Market[]
  reactions?: Reaction[]
}

// Category Types
export type CategoryId =
  | "all"
  | "for-you"
  | "politics"
  | "technology"
  | "business"
  | "health"
  | "environment"
  | "sports"
  | "entertainment"

export interface Category {
  id: CategoryId
  label: string
  icon: LucideIcon
  color: string
}

// Perspective Types
export interface Perspective {
  bias: string
  color: string
  points: string[]
  source: string
  sourceUrl: string
}

// Reaction Types
export interface Reaction {
  word: string
  count: number
}

// Market Types
export interface Market {
  title: string
  outcomes: Outcome[]
  url: string
}

export interface Outcome {
  name: string
  probability: number
  volume: string
}

// Region Types
export interface Region {
  id: string
  name: string
  insights: {
    sentiment: string
    summary: string
    keyPoints: string[]
    sources: Array<{ name: string; quote: string }>
  }
}

// Game Types
export interface GameState {
  type: "wordle" | "connections"
  attempts: number
  completed: boolean
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  isPremium: boolean
}

