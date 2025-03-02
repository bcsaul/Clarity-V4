/**
 * Core type definitions for the ClarityNews application
 */

// Story related types
export interface Story {
  id: number
  title: string
  summary: string
  imageUrl: string
  date: string
  readTime: string
  category: Category
  facts: string[]
  perspectives: Perspective[]
  markets: Market[]
  reactions: Reaction[]
}

// Category definition with associated metadata
export interface Category {
  id: CategoryId
  label: string
  icon: string
  color: string
}

// Supported category identifiers
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

// Perspective representation for multi-view stories
export interface Perspective {
  bias: BiasLevel
  color: string
  points: string[]
  source: string
  sourceUrl: string
}

// Bias level classification
export type BiasLevel = "far-left" | "left" | "center" | "right" | "far-right"

// Market prediction data
export interface Market {
  title: string
  outcomes: Outcome[]
  url: string
}

// Individual market outcome
export interface Outcome {
  name: string
  probability: number
  volume: string
}

// User reaction to stories
export interface Reaction {
  word: string
  count: number
}

// User authentication types
export interface User {
  id: string
  email: string
  name: string
  subscription: SubscriptionTier
}

export type SubscriptionTier = "free" | "premium"

// Game related types
export interface GameState {
  type: "wordle" | "connections"
  status: "active" | "completed"
  attempts: number
  score: number
}

// Stock market data types
export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  marketCap: string
}

// Sports data types
export interface TeamStanding {
  rank: number
  team: string
  wins: number
  losses: number
  percentage: number
  streak: string
}

