/**
 * Application constants and configuration
 */

import type { Category } from "./types"
import { Command, Landmark, Cpu, Building2, Heart, Trophy } from "lucide-react"

// Category definitions
export const CATEGORIES: Category[] = [
  {
    id: "all",
    label: "All Stories",
    icon: Command,
    color: "bg-gray-500",
  },
  {
    id: "politics",
    label: "Politics",
    icon: Landmark,
    color: "bg-red-500",
  },
  {
    id: "technology",
    label: "Technology",
    icon: Cpu,
    color: "bg-blue-500",
  },
  {
    id: "business",
    label: "Business",
    icon: Building2,
    color: "bg-green-500",
  },
  {
    id: "health",
    label: "Health",
    icon: Heart,
    color: "bg-pink-500",
  },
  {
    id: "sports",
    label: "Sports",
    icon: Trophy,
    color: "bg-orange-500",
  },
]

// App configuration
export const CONFIG = {
  app: {
    name: "ClarityNews",
    description: "News with multiple perspectives",
  },
  story: {
    maxReactions: 5,
    maxPerspectives: 3,
  },
  games: {
    wordle: {
      maxAttempts: 6,
      wordLength: 5,
    },
    connections: {
      maxAttempts: 4,
      groupSize: 4,
    },
  },
}

