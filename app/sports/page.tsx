"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data with complete team listings
const mockStandings = {
  nba: [
    { rank: 1, team: "Boston Celtics", wins: 45, losses: 12, pct: 0.789 },
    { rank: 2, team: "Milwaukee Bucks", wins: 41, losses: 16, pct: 0.719 },
    { rank: 3, team: "Denver Nuggets", wins: 39, losses: 18, pct: 0.684 },
    { rank: 4, team: "Minnesota Timberwolves", wins: 39, losses: 18, pct: 0.684 },
    { rank: 5, team: "Cleveland Cavaliers", wins: 38, losses: 19, pct: 0.667 },
    { rank: 6, team: "Oklahoma City Thunder", wins: 37, losses: 20, pct: 0.649 },
    { rank: 7, team: "Los Angeles Clippers", wins: 36, losses: 21, pct: 0.632 },
    { rank: 8, team: "Phoenix Suns", wins: 34, losses: 24, pct: 0.586 },
    { rank: 9, team: "New Orleans Pelicans", wins: 34, losses: 24, pct: 0.586 },
    { rank: 10, team: "Sacramento Kings", wins: 32, losses: 25, pct: 0.561 },
  ],
  nfl: [
    { rank: 1, team: "San Francisco 49ers", wins: 12, losses: 5, pct: 0.706 },
    { rank: 2, team: "Baltimore Ravens", wins: 13, losses: 4, pct: 0.765 },
    { rank: 3, team: "Detroit Lions", wins: 12, losses: 5, pct: 0.706 },
    { rank: 4, team: "Dallas Cowboys", wins: 12, losses: 5, pct: 0.706 },
    { rank: 5, team: "Philadelphia Eagles", wins: 11, losses: 6, pct: 0.647 },
    { rank: 6, team: "Miami Dolphins", wins: 11, losses: 6, pct: 0.647 },
    { rank: 7, team: "Kansas City Chiefs", wins: 11, losses: 6, pct: 0.647 },
    { rank: 8, team: "Cleveland Browns", wins: 11, losses: 6, pct: 0.647 },
    { rank: 9, team: "Houston Texans", wins: 10, losses: 7, pct: 0.588 },
    { rank: 10, team: "Buffalo Bills", wins: 10, losses: 7, pct: 0.588 },
  ],
  nhl: [
    { rank: 1, team: "Boston Bruins", wins: 34, losses: 12, pct: 0.739 },
    { rank: 2, team: "Florida Panthers", wins: 35, losses: 15, pct: 0.7 },
    { rank: 3, team: "Vancouver Canucks", wins: 37, losses: 16, pct: 0.698 },
    { rank: 4, team: "New York Rangers", wins: 35, losses: 18, pct: 0.66 },
    { rank: 5, team: "Dallas Stars", wins: 33, losses: 17, pct: 0.66 },
    { rank: 6, team: "Winnipeg Jets", wins: 33, losses: 18, pct: 0.647 },
    { rank: 7, team: "Colorado Avalanche", wins: 33, losses: 19, pct: 0.635 },
    { rank: 8, team: "Edmonton Oilers", wins: 33, losses: 20, pct: 0.623 },
    { rank: 9, team: "Vegas Golden Knights", wins: 32, losses: 21, pct: 0.604 },
    { rank: 10, team: "Toronto Maple Leafs", wins: 31, losses: 19, pct: 0.62 },
  ],
}

export default function SportsPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-primary hover:underline group">
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to news
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sports Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="nba" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="nba" className="relative h-16">
                  <Image
                    src="/placeholder.svg?height=40&width=80"
                    alt="NBA Logo"
                    width={80}
                    height={40}
                    className="object-contain"
                  />
                </TabsTrigger>
                <TabsTrigger value="nfl" className="relative h-16">
                  <Image
                    src="/placeholder.svg?height=40&width=80"
                    alt="NFL Logo"
                    width={80}
                    height={40}
                    className="object-contain"
                  />
                </TabsTrigger>
                <TabsTrigger value="nhl" className="relative h-16">
                  <Image
                    src="/placeholder.svg?height=40&width=80"
                    alt="NHL Logo"
                    width={80}
                    height={40}
                    className="object-contain"
                  />
                </TabsTrigger>
              </TabsList>
              {Object.entries(mockStandings).map(([league, teams]) => (
                <TabsContent key={league} value={league}>
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 bg-gray-100 rounded-lg font-medium">
                      <span className="w-8">Rank</span>
                      <span>Team</span>
                      <span className="flex items-center gap-4">
                        <span className="w-20 text-center">Record</span>
                        <span className="w-16 text-right">PCT</span>
                      </span>
                    </div>
                    {/* Teams */}
                    {teams.map((team, index) => (
                      <motion.div
                        key={team.team}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                      >
                        <span className="w-8 font-bold">{team.rank}</span>
                        <span>{team.team}</span>
                        <span className="flex items-center gap-4">
                          <span className="w-20 text-center text-muted-foreground">
                            {team.wins}-{team.losses}
                          </span>
                          <span className="w-16 text-right font-medium">{(team.pct * 100).toFixed(1)}%</span>
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

