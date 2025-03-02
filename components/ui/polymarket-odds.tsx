"use client"

import { motion } from "framer-motion"
import { TrendingUp, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Market {
  title: string
  outcomes: Array<{
    name: string
    probability: number
    volume: string
  }>
  url: string
}

interface PolymarketOddsProps {
  markets: Market[]
}

export function PolymarketOdds({ markets }: PolymarketOddsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Prediction Markets
        </CardTitle>
        <CardDescription>Current Polymarket odds for related events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {markets.map((market, index) => (
            <motion.div
              key={market.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={market.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 group">
                    {market.title}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </div>
                <div className="space-y-3">
                  {market.outcomes.map((outcome) => (
                    <div key={outcome.name} className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{outcome.name}</span>
                        <span className="text-2xl font-bold">{(outcome.probability * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Volume: {outcome.volume}</div>
                    </div>
                  ))}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

