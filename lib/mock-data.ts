import type { Story, Category, Region } from "@/lib/types"
import { Command, User, Landmark, Cpu, Building2, Heart, Leaf, Trophy, Popcorn } from "lucide-react"

export const categories: Category[] = [
  { id: "all", label: "All", icon: Command, color: "bg-gray-500" },
  { id: "for-you", label: "For You", icon: User, color: "bg-violet-500" },
  { id: "politics", label: "Politics", icon: Landmark, color: "bg-red-500" },
  { id: "technology", label: "Technology", icon: Cpu, color: "bg-blue-500" },
  { id: "business", label: "Business", icon: Building2, color: "bg-green-500" },
  { id: "health", label: "Health", icon: Heart, color: "bg-pink-500" },
  { id: "environment", label: "Environment", icon: Leaf, color: "bg-emerald-500" },
  { id: "sports", label: "Sports", icon: Trophy, color: "bg-orange-500" },
  { id: "entertainment", label: "Entertainment", icon: Popcorn, color: "bg-purple-500" },
]

export const stories: Story[] = [
  {
    id: 1,
    title: "New Tax Law Passed by Congress",
    summary: "Congress passed a comprehensive tax reform bill affecting both individuals and corporations.",
    teaser: "Congress passed a comprehensive tax reform bill affecting both individuals and corporations.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    date: "February 25, 2025",
    readTime: "5 min read",
    category: "politics",
    facts: [
      "Congress passed a comprehensive tax reform bill.",
      "The legislation modifies both individual and corporate tax rates.",
      "Changes include updates to tax brackets and deductions.",
    ],
    perspectives: [
      {
        bias: "Far Left",
        color: "#1A237E",
        points: [
          "The tax bill primarily benefits wealthy corporations while offering minimal relief to working families.",
          "This continues a pattern of regressive taxation that widens the wealth gap in America.",
          "The bill fails to address tax avoidance by billionaires and multinational corporations.",
        ],
        source: "The Intercept",
        sourceUrl: "https://theintercept.com",
      },
      {
        bias: "Left",
        color: "#2196F3",
        points: [
          "While the bill includes some middle-class tax relief, the largest benefits flow to corporations.",
          "The legislation lacks sufficient environmental incentives that were initially proposed.",
          "Economists project the bill may increase the federal deficit over the next decade.",
        ],
        source: "The Guardian",
        sourceUrl: "https://theguardian.com",
      },
      {
        bias: "Center",
        color: "#757575",
        points: [
          "The tax legislation modifies rates across all income brackets with varying impacts.",
          "Corporate tax changes aim to improve competitiveness while maintaining revenue.",
          "Congressional Budget Office estimates show mixed economic effects over the next five years.",
        ],
        source: "Reuters",
        sourceUrl: "https://reuters.com",
      },
      {
        bias: "Right",
        color: "#E53935",
        points: [
          "The tax reform package will stimulate economic growth through business investment incentives.",
          "Middle-class families will see meaningful tax relief through expanded deductions.",
          "Regulatory simplification in the bill reduces compliance costs for small businesses.",
        ],
        source: "The New York Post",
        sourceUrl: "https://nypost.com",
      },
      {
        bias: "Far Right",
        color: "#B71C1C",
        points: [
          "This historic tax cut will unleash American economic potential after years of stagnation.",
          "The bill rightfully reduces government's excessive taxation of hardworking Americans.",
          "Job creators will now have the freedom to expand operations and hire more workers.",
        ],
        source: "The Federalist",
        sourceUrl: "https://thefederalist.com",
      },
    ],
    markets: [
      {
        title: "Tax Policy Impact",
        outcomes: [
          {
            name: "Will the tax bill increase the deficit by 2026?",
            probability: 0.72,
            volume: "$1.2M",
          },
          {
            name: "Will corporate tax rates increase in 2025?",
            probability: 0.35,
            volume: "$850K",
          },
        ],
        url: "https://polymarket.com/event/tax-policy",
      },
    ],
    reactions: [
      { word: "Insightful", count: 45 },
      { word: "Controversial", count: 32 },
      { word: "Important", count: 28 },
      { word: "Biased", count: 21 },
      { word: "Informative", count: 19 },
    ],
  },
  {
    id: 2,
    title: "Climate Summit Concludes with New Agreements",
    summary: "World leaders reached consensus on emission reduction targets at the annual climate conference.",
    teaser: "World leaders reached consensus on emission reduction targets at the annual climate conference.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    date: "February 25, 2025",
    readTime: "4 min read",
    category: "environment",
    facts: [
      "World leaders from 195 countries attended the annual climate summit.",
      "New agreements focused on carbon emission reductions by 2030.",
      "Several major economies committed to phasing out coal power."
    ],
    perspectives: [
      {
        bias: "Left",
        color: "#2196F3",
        points: [
          "The agreements represent progress but fall short of what climate science demands.",
          "Developed nations must provide more financial support to developing countries.",
          "The transition timeline needs to be accelerated to avoid catastrophic warming."
        ],
        source: "The Guardian",
        sourceUrl: "https://theguardian.com"
      },
      {
        bias: "Center",
        color: "#757575",
        points: [
          "The summit achieved important diplomatic breakthroughs on emission targets.",
          "Implementation and verification systems will be crucial for success.",
          "Economic impacts will vary significantly by country and industry."
        ],
        source: "Reuters",
        sourceUrl: "https://reuters.com"
      },
      {
        bias: "Right",
        color: "#E53935",
        points: [
          "The agreements may harm economic growth if implemented too rapidly.",
          "Technology development, not regulation, should be the primary focus.",
          "Countries like China and India must bear more responsibility for emissions."
        ],
        source: "The Wall Street Journal",
        sourceUrl: "https://wsj.com"
      }
    ],
    reactions: [
      { word: "Hopeful", count: 38 },
      { word: "Skeptical", count: 26 },
      { word: "Important", count: 42 },
      { word: "Necessary", count: 31 }
    ]
  },
  {
    id: 3,
    title: "Tech Company Announces Revolutionary Product",
    summary: "A major technology firm unveiled a new device that promises to transform the industry.",
    teaser: "A major technology firm unveiled a new device that promises to transform the industry.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    date: "February 25, 2025",
    readTime: "3 min read",
    category: "technology",
    facts: [
      "The new product combines AI capabilities with breakthrough hardware design.",
      "Early tests show performance improvements of up to 200% over previous generations.",
      "The device will be available for consumers starting next month."
    ],
    perspectives: [
      {
        bias: "Left",
        color: "#2196F3",
        points: [
          "The company needs to address privacy concerns with its new AI features.",
          "Manufacturing should prioritize sustainability and ethical sourcing.",
          "The high price point raises concerns about digital inequality."
        ],
        source: "Wired",
        sourceUrl: "https://wired.com"
      },
      {
        bias: "Center",
        color: "#757575",
        points: [
          "The technology represents a significant advancement in consumer electronics.",
          "Market competition will likely accelerate innovation across the industry.",
          "Initial supply constraints may affect availability for several months."
        ],
        source: "CNET",
        sourceUrl: "https://cnet.com"
      },
      {
        bias: "Right",
        color: "#E53935",
        points: [
          "The company's innovation demonstrates the power of free market competition.",
          "Regulatory interference could stifle similar breakthroughs in the future.",
          "The product will create new jobs and economic opportunities."
        ],
        source: "Forbes",
        sourceUrl: "https://forbes.com"
      }
    ],
    reactions: [
      { word: "Innovative", count: 53 },
      { word: "Expensive", count: 24 },
      { word: "Game-changing", count: 38 },
      { word: "Overhyped", count: 19 }
    ]
  },
  // Add more stories here...
]

export const regions: Region[] = [
  {
    id: "north-america",
    name: "North America",
    insights: {
      sentiment: "Positive",
      summary: "North America saw a significant increase in economic activity.",
      keyPoints: [
        "Increased investment in renewable energy",
        "Growth in the technology sector",
        "Improved infrastructure",
      ],
      sources: [
        { name: "Bloomberg", quote: "North America is leading the way in renewable energy investment." },
        { name: "The Wall Street Journal", quote: "The technology sector is booming in North America." },
      ],
    },
  },
  {
    id: "europe",
    name: "Europe",
    insights: {
      sentiment: "Neutral",
      summary: "Europe maintains steady economic progress with focus on sustainability.",
      keyPoints: ["Renewable energy transition", "Digital market expansion", "Social policy reforms"],
      sources: [
        { name: "Financial Times", quote: "European markets show resilience amid global changes." },
        { name: "The Economist", quote: "EU leads in sustainable policy implementation." },
      ],
    },
  },
  // Add more regions...
]

export const gameData = {
  wordle: {
    words: ["CLEAR", "MEDIA", "TRUTH", "STORY", "FACTS", "NEWS"],
  },
  connections: {
    categories: [
      {
        name: "Political Terms",
        color: "bg-yellow-500",
        words: ["BILL", "VOTE", "LAW", "POLL"],
      },
      {
        name: "Economic Terms",
        color: "bg-green-500",
        words: ["BOND", "STOCK", "FUND", "LOAN"],
      },
      {
        name: "Tech Companies",
        color: "bg-blue-500",
        words: ["APPLE", "META", "TESLA", "NVIDIA"],
      },
      {
        name: "News Sources",
        color: "bg-purple-500",
        words: ["CNN", "BBC", "FOX", "VICE"],
      },
    ],
  },
}

export const podcastOptions = [
  { duration: 2, isPremium: false, url: "/audio/summary-2min.mp3" },
  { duration: 5, isPremium: true, url: "/audio/summary-5min.mp3" },
  { duration: 10, isPremium: true, url: "/audio/summary-10min.mp3" },
]

export const stockData = {
  indices: [
    { symbol: "SPY", name: "S&P 500 Index", price: 510.32, change: 1.2 },
    { symbol: "QQQ", name: "Nasdaq 100", price: 438.27, change: 1.5 },
    { symbol: "DIA", name: "Dow Jones", price: 386.64, change: 0.8 },
  ],
  popular: [
    { symbol: "TSLA", name: "Tesla Inc", price: 202.64, change: -0.8 },
    { symbol: "AAPL", name: "Apple Inc", price: 182.52, change: 0.6 },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 788.17, change: 3.1 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 401.81, change: 1.2 },
    { symbol: "GOOGL", name: "Alphabet Inc", price: 143.96, change: 0.5 },
  ],
}

export const sportsData = {
  nba: [
    { rank: 1, team: "Boston Celtics", wins: 45, losses: 12, pct: 0.789 },
    { rank: 2, team: "Milwaukee Bucks", wins: 41, losses: 16, pct: 0.719 },
    // Add more teams...
  ],
  nfl: [
    { rank: 1, team: "San Francisco 49ers", wins: 12, losses: 5, pct: 0.706 },
    { rank: 2, team: "Baltimore Ravens", wins: 13, losses: 4, pct: 0.765 },
    // Add more teams...
  ],
  nhl: [
    { rank: 1, team: "Boston Bruins", wins: 34, losses: 12, pct: 0.739 },
    { rank: 2, team: "Florida Panthers", wins: 35, losses: 15, pct: 0.7 },
    // Add more teams...
  ],
}

/**
 * Simulates a delay with a Promise that resolves after a given time
 * @param ms - Milliseconds to delay
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retrieves mock stories with optional delay and error simulation
 * 
 * @param options - Configuration options
 * @returns Promise that resolves to an array of stories
 */
export async function getMockStories(options: {
  shouldDelay?: boolean;
  delayMs?: number;
  shouldError?: boolean;
  errorMessage?: string;
} = {}): Promise<Story[]> {
  const {
    shouldDelay = false,
    delayMs = 1000,
    shouldError = false,
    errorMessage = "Failed to fetch stories"
  } = options

  // Simulate network delay
  if (shouldDelay) {
    await delay(delayMs)
  }

  // Simulate error
  if (shouldError) {
    throw new Error(errorMessage)
  }

  // Return stories data
  return stories
}

