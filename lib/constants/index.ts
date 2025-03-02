/**
 * Application-wide constants and configuration values
 */

import type { Category } from "../types"
import * as Icons from "lucide-react"

// Category definitions with associated metadata
export const CATEGORIES: Category[] = [
  {
    id: "all",
    label: "All",
    icon: Icons.Globe,
    color: "bg-gray-500",
  },
  {
    id: "for-you",
    label: "For You",
    icon: Icons.User,
    color: "bg-violet-500",
  },
  {
    id: "politics",
    label: "Politics",
    icon: Icons.Landmark,
    color: "bg-red-500",
  },
  // ... other categories
]

// Application configuration
export const CONFIG = {
  app: {
    name: "ClarityNews",
    description: "Multi-perspective news coverage",
    version: "1.0.0",
  },
  features: {
    maxStoriesPerPage: 10,
    maxReactions: 5,
    podcastDurations: [2, 5, 10],
    gameAttempts: {
      wordle: 6,
      connections: 4,
    },
  },
  dates: {
    format: "MMMM d, yyyy",
    maxPastDays: 30,
  },
}

// API endpoints
export const API_ENDPOINTS = {
  stories: "/api/stories",
  auth: "/api/auth",
  games: "/api/games",
  stocks: "/api/stocks",
  sports: "/api/sports",
}

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  stories: 3600,
  stocks: 300,
  sports: 900,
}

