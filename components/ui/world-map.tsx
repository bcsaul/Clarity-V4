"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RegionData {
  id: string
  name: string
  path: string
  insights: {
    sentiment: "Positive" | "Neutral" | "Negative"
    summary: string
    keyPoints: string[]
    sources: Array<{
      name: string
      quote: string
    }>
  }
}

// Simplified world map SVG paths for each region
const regions: RegionData[] = [
  {
    id: "north-america",
    name: "North America",
    // Simplified path for North America
    path: "M 67 30 L 220 30 L 250 80 L 220 150 L 160 170 L 130 150 L 50 120 L 40 80 Z",
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
    // Simplified path for Europe
    path: "M 280 40 L 350 40 L 370 60 L 360 90 L 330 100 L 300 90 L 280 70 Z",
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
  {
    id: "asia",
    name: "Asia",
    // Simplified path for Asia
    path: "M 380 40 L 500 40 L 520 80 L 510 130 L 460 150 L 420 140 L 390 120 L 370 90 Z",
    insights: {
      sentiment: "Positive",
      summary: "Asia demonstrates strong economic growth and technological advancement.",
      keyPoints: ["Digital innovation leadership", "Infrastructure development", "Market modernization"],
      sources: [
        { name: "Nikkei Asia", quote: "Asian markets drive global technological innovation." },
        { name: "South China Morning Post", quote: "Regional cooperation strengthens economic ties." },
      ],
    },
  },
  {
    id: "africa",
    name: "Africa",
    // Simplified path for Africa
    path: "M 280 100 L 350 100 L 380 150 L 360 200 L 300 220 L 270 190 L 260 150 Z",
    insights: {
      sentiment: "Neutral",
      summary: "Africa focuses on sustainable development and economic diversification.",
      keyPoints: ["Resource management initiatives", "Technology adoption", "Regional integration"],
      sources: [
        { name: "African Business", quote: "Continental free trade agreement shows promise." },
        { name: "Reuters Africa", quote: "Tech startups reshape African economies." },
      ],
    },
  },
  {
    id: "south-america",
    name: "South America",
    // Simplified path for South America
    path: "M 150 180 L 200 180 L 220 220 L 200 270 L 150 290 L 120 260 L 110 220 Z",
    insights: {
      sentiment: "Neutral",
      summary: "South America adapts to global economic shifts.",
      keyPoints: ["Agricultural innovation", "Energy sector development", "Environmental protection"],
      sources: [
        { name: "Latin Finance", quote: "Regional markets show resilience." },
        { name: "Americas Quarterly", quote: "Green energy initiatives gain momentum." },
      ],
    },
  },
]

interface WorldMapProps {
  onRegionClick: (region: RegionData) => void
  selectedRegion?: string | null
  className?: string
}

export function WorldMap({ onRegionClick, selectedRegion, className }: WorldMapProps) {
  return (
    <div className={cn("relative w-full max-w-3xl mx-auto", className)}>
      <svg viewBox="0 0 600 300" className="w-full h-full" style={{ background: "var(--background)" }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {regions.map((region) => (
          <motion.path
            key={region.id}
            d={region.path}
            initial={{ opacity: 0.6 }}
            animate={{
              opacity: selectedRegion === region.id ? 1 : 0.6,
              fill: selectedRegion === region.id ? "hsl(var(--primary))" : "hsl(var(--muted))",
              filter: selectedRegion === region.id ? "url(#glow)" : "none",
            }}
            whileHover={{
              opacity: 1,
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            onClick={() => onRegionClick(region)}
            className="cursor-pointer stroke-background hover:stroke-2 transition-all"
            style={{
              transformOrigin: "center",
            }}
          />
        ))}
        {/* Region Labels */}
        {regions.map((region) => (
          <motion.text
            key={`label-${region.id}`}
            className="text-xs font-medium pointer-events-none fill-current"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              fill: selectedRegion === region.id ? "hsl(var(--primary))" : "currentColor",
            }}
            style={{
              fontSize: "12px",
              textAnchor: "middle",
            }}
          >
            <textPath href={`#${region.id}-path`} startOffset="50%" className="fill-current">
              {region.name}
            </textPath>
          </motion.text>
        ))}
      </svg>
    </div>
  )
}

