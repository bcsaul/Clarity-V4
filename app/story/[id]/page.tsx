"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Share2, Bookmark } from "lucide-react"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SpectrumSlider } from "@/components/ui/spectrum-slider"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { WorldMap } from "@/components/ui/world-map"
import { PodcastPlayer } from "@/components/ui/podcast-player"
import { PolymarketOdds } from "@/components/ui/polymarket-odds"

interface OneWordReaction {
  word: string
  count: number
}

// Mock reactions data - replace with actual API calls
const mockReactions: OneWordReaction[] = [
  { word: "Insightful", count: 45 },
  { word: "Controversial", count: 32 },
  { word: "Important", count: 28 },
  { word: "Biased", count: 21 },
  { word: "Informative", count: 19 },
]

const mockStories = [
  {
    id: 1,
    title: "New Tax Law Passed by Congress",
    summary:
      "Congress passed a comprehensive tax reform bill affecting both individuals and corporations. The legislation includes changes to tax brackets and deductions.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    date: "February 25, 2025",
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
    regionalPerspectives: [
      {
        region: "Northeast",
        summary: "The Northeast experienced a significant increase in tax revenue.",
      },
      {
        region: "South",
        summary: "Southern states saw mixed results, with some areas benefiting more than others.",
      },
      {
        region: "Midwest",
        summary: "The Midwest saw modest tax relief for middle-class families.",
      },
      {
        region: "West",
        summary: "Western states experienced a decrease in corporate tax revenue.",
      },
    ],
  },
  {
    id: 2,
    title: "Climate Summit Concludes with New Agreements",
    summary:
      "World leaders reached consensus on emission reduction targets at the annual climate conference. The agreement includes timelines for implementation and funding mechanisms.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    date: "February 25, 2025",
    perspectives: [
      {
        bias: "Far Left",
        color: "#1A237E",
        points: [
          "The climate agreement is woefully inadequate given the existential threat we face.",
          "Corporate interests have once again watered down necessary radical action.",
          "The Global South continues to bear the consequences while wealthy nations make empty promises.",
        ],
        source: "Jacobin",
        sourceUrl: "https://jacobinmag.com",
      },
      {
        bias: "Left",
        color: "#2196F3",
        points: [
          "While the agreement shows progress, it falls short of what scientists say is necessary.",
          "More ambitious targets and enforcement mechanisms are needed to avoid catastrophe.",
          "Developed nations must increase climate financing for vulnerable countries.",
        ],
        source: "MSNBC",
        sourceUrl: "https://msnbc.com",
      },
      {
        bias: "Center",
        color: "#757575",
        points: [
          "The climate agreement represents incremental progress toward emission reduction goals.",
          "Nations agreed to review targets annually and increase transparency in reporting.",
          "Implementation challenges remain, particularly regarding financing and technology transfer.",
        ],
        source: "BBC News",
        sourceUrl: "https://bbc.com/news",
      },
      {
        bias: "Right",
        color: "#E53935",
        points: [
          "The agreement balances environmental concerns with economic realities.",
          "Market-based solutions in the deal will drive innovation better than regulations.",
          "American negotiators successfully protected key industries from unreasonable burdens.",
        ],
        source: "The Washington Times",
        sourceUrl: "https://washingtontimes.com",
      },
      {
        bias: "Far Right",
        color: "#B71C1C",
        points: [
          "This climate agreement represents another sovereignty surrender to global bureaucrats.",
          "The economic costs of these commitments will be borne by ordinary citizens through higher energy prices.",
          "Climate alarmism continues to be used to justify government expansion and control.",
        ],
        source: "The Blaze",
        sourceUrl: "https://theblaze.com",
      },
    ],
    regionalPerspectives: [
      {
        region: "Europe",
        summary: "European nations pledged significant emission reductions.",
      },
      {
        region: "Asia",
        summary: "Asian countries focused on sustainable development goals.",
      },
      {
        region: "Africa",
        summary: "African nations emphasized climate finance and adaptation measures.",
      },
      {
        region: "South America",
        summary: "South American countries highlighted the importance of biodiversity.",
      },
    ],
  },
  {
    id: 3,
    title: "Tech Company Announces Revolutionary Product",
    summary:
      "A major technology firm unveiled a new device that promises to transform the industry. The product features innovative capabilities and will be available next quarter.",
    imageUrl: "/placeholder.svg?height=300&width=600",
    date: "February 25, 2025",
    perspectives: [
      {
        bias: "Far Left",
        color: "#1A237E",
        points: [
          "The company's new product raises serious privacy concerns and expands corporate surveillance.",
          "Workers manufacturing these devices continue to face exploitative conditions.",
          "The environmental impact of producing millions of these devices is being ignored.",
        ],
        source: "CounterPunch",
        sourceUrl: "https://counterpunch.org",
      },
      {
        bias: "Left",
        color: "#2196F3",
        points: [
          "While innovative, the product raises questions about data collection and user privacy.",
          "The company should address concerns about the environmental impact of its manufacturing.",
          "Regulators should ensure the technology doesn't exacerbate digital inequality.",
        ],
        source: "The Nation",
        sourceUrl: "https://thenation.com",
      },
      {
        bias: "Center",
        color: "#757575",
        points: [
          "The new device incorporates several technological advancements not previously available to consumers.",
          "Industry analysts project significant market impact but note competition is developing similar products.",
          "The company's stock rose 3% following the announcement as investors responded positively.",
        ],
        source: "Associated Press",
        sourceUrl: "https://apnews.com",
      },
      {
        bias: "Right",
        color: "#E53935",
        points: [
          "This American innovation demonstrates our continued technological leadership globally.",
          "The product represents free market success without government intervention or subsidies.",
          "The company's growth will create jobs and economic opportunities across the supply chain.",
        ],
        source: "National Review",
        sourceUrl: "https://nationalreview.com",
      },
      {
        bias: "Far Right",
        color: "#B71C1C",
        points: [
          "This product's success proves American innovation thrives when free from excessive regulation.",
          "The mainstream media is ignoring how this company has resisted woke corporate policies.",
          "Silicon Valley finally delivers a product that doesn't censor conservative viewpoints.",
        ],
        source: "The Daily Caller",
        sourceUrl: "https://dailycaller.com",
      },
    ],
    regionalPerspectives: [
      {
        region: "California",
        summary: "California-based tech companies are leading the innovation.",
      },
      {
        region: "Texas",
        summary: "Texas is attracting tech companies with its business-friendly environment.",
      },
      {
        region: "New York",
        summary: "New York is a hub for tech startups and venture capital.",
      },
      {
        region: "Massachusetts",
        summary: "Massachusetts is home to many leading universities and research institutions.",
      },
    ],
  },
]

const regions = [
  {
    id: "north-america",
    name: "North America",
    insights: {
      sentiment: "Positive",
      summary: "North America saw a significant increase in economic activity.",
      keyPoints: [
        "Increased investment in renewable energy.",
        "Growth in the technology sector.",
        "Improved infrastructure.",
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
      summary: "Europe experienced moderate economic growth.",
      keyPoints: ["Increased trade with Asia.", "Challenges related to energy security.", "Stable employment rates."],
      sources: [
        { name: "Financial Times", quote: "Europe's trade with Asia is increasing." },
        { name: "Reuters", quote: "Europe is facing challenges related to energy security." },
      ],
    },
  },
  // Add more regions as needed
]

export default function StoryPage({ params }: { params: { id: string } }) {
  const storyId = Number.parseInt(params.id)
  const story = mockStories.find((s) => s.id === storyId)

  if (!story) {
    notFound()
  }

  const [sliderValue, setSliderValue] = useState(50)
  const [visiblePerspectives, setVisiblePerspectives] = useState<number[]>([0, 1, 2])
  const [oneWord, setOneWord] = useState("")
  const [reactions, setReactions] = useState(mockReactions)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  useEffect(() => {
    const totalPerspectives = story.perspectives.length
    const normalizedValue = Math.min(Math.max(sliderValue, 0), 100)
    let startIndex = Math.floor((normalizedValue / 100) * (totalPerspectives - 3))
    startIndex = Math.min(Math.max(startIndex, 0), totalPerspectives - 3)
    setVisiblePerspectives([startIndex, startIndex + 1, startIndex + 2])
  }, [sliderValue, story.perspectives.length])

  const handleOneWordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!oneWord.trim()) return

    // In a real app, this would be an API call
    const newReactions = [...reactions]
    const existingReaction = newReactions.find((r) => r.word.toLowerCase() === oneWord.toLowerCase())

    if (existingReaction) {
      existingReaction.count++
    } else {
      newReactions.push({ word: oneWord, count: 1 })
    }

    newReactions.sort((a, b) => b.count - a.count)
    setReactions(newReactions.slice(0, 5))
    setOneWord("")
  }

  const oneWordSection = (
    <motion.section className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-6">One Word Reactions</h2>

        <form onSubmit={handleOneWordSubmit} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Describe this story in one word..."
              value={oneWord}
              onChange={(e) => setOneWord(e.target.value)}
              maxLength={20}
              className="flex-1"
            />
            <Button type="submit" disabled={!oneWord.trim()}>
              Submit
            </Button>
          </div>
        </form>

        <div className="grid grid-cols-5 gap-4">
          {reactions.map((reaction, index) => (
            <motion.div
              key={reaction.word}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-2xl font-bold text-primary">{reaction.count}</span>
              <span className="text-sm text-center">{reaction.word}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )

  const podcastSection = (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <PodcastPlayer
        options={[
          { duration: 2, isPremium: false, url: "/audio/summary-2min.mp3" },
          { duration: 5, isPremium: true, url: "/audio/summary-5min.mp3" },
          { duration: 10, isPremium: true, url: "/audio/summary-10min.mp3" },
        ]}
      />
    </motion.div>
  )

  const mapSection = (
    <motion.section
      className="space-y-8 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-6">Global Impact</h2>
        <WorldMap
          selectedRegion={selectedRegion}
          onRegionClick={(region) => setSelectedRegion(region.id)}
          className="mb-6"
        />
        <AnimatePresence mode="wait">
          {selectedRegion && (
            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border rounded-lg p-6"
            >
              {regions.find((r) => r.id === selectedRegion)?.insights && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{regions.find((r) => r.id === selectedRegion)?.name}</h3>
                    <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      {regions.find((r) => r.id === selectedRegion)?.insights.sentiment}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {regions.find((r) => r.id === selectedRegion)?.insights.summary}
                  </p>
                  <div>
                    <h4 className="font-medium mb-2">Key Points:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {regions
                        .find((r) => r.id === selectedRegion)
                        ?.insights.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    {regions
                      .find((r) => r.id === selectedRegion)
                      ?.insights.sources.map((source, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{source.name}:</span>{" "}
                          <span className="text-muted-foreground">"{source.quote}"</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )

  const polymarketSection = (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
    >
      <PolymarketOdds
        markets={[
          {
            title: "2024 US Election Outcomes",
            outcomes: [
              {
                name: "Will Trump win the Republican nomination?",
                probability: 0.89,
                volume: "$2.2M",
              },
              {
                name: "Will Biden win the Democratic nomination?",
                probability: 0.82,
                volume: "$1.8M",
              },
            ],
            url: "https://polymarket.com/event/2024-election",
          },
          {
            title: "Tax Policy Changes",
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
        ]}
      />
    </motion.div>
  )

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="inline-flex items-center text-primary hover:underline group">
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to stories
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="transition-all hover:scale-105">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="transition-all hover:scale-105">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <article className="max-w-4xl mx-auto">
          <motion.header
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Politics</span>
              <span className="text-sm text-muted-foreground">{story.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{story.title}</h1>
          </motion.header>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image src={story.imageUrl || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
            </div>
          </motion.div>

          {/* Facts section */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold mb-4">The Facts</h2>
            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
              <li>Congress passed a comprehensive tax reform bill.</li>
              <li>The legislation modifies both individual and corporate tax rates.</li>
              <li>Changes include updates to tax brackets and deductions.</li>
            </ul>
          </motion.div>

          {podcastSection}
          {mapSection}

          {/* Political Perspectives section */}
          <motion.section
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-8">Political Perspectives</h2>

              <SpectrumSlider value={sliderValue} onChange={setSliderValue} className="mb-12" />

              <motion.div className="grid grid-cols-3 gap-6" layout>
                <AnimatePresence mode="wait">
                  {visiblePerspectives.map((index) => {
                    const perspective = story.perspectives[index]
                    return (
                      <motion.div
                        key={perspective.bias}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="p-4 text-white font-medium" style={{ backgroundColor: perspective.color }}>
                          {perspective.bias}
                        </div>
                        <div className="p-6 bg-white h-[calc(100%-64px)] flex flex-col">
                          <ul className="list-disc pl-5 mb-4 space-y-3 text-muted-foreground flex-grow">
                            {perspective.points.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                          <div className="text-sm pt-4 border-t">
                            Source:{" "}
                            <a
                              href={perspective.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-medium"
                            >
                              {perspective.source}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.section>

          {oneWordSection}
          {polymarketSection}

          <footer className="mt-12 text-sm text-muted-foreground border-t pt-6">
            <p>Disclaimer: Summaries are informational only. Visit the full articles for more context.</p>
            <p className="mt-2">ClarityNews presents multiple perspectives to help readers understand media bias.</p>
          </footer>
        </article>
      </motion.div>
    </main>
  )
}

