"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown, Search, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock stock data
const allStocks = [
  { symbol: "SPY", name: "S&P 500 Index", price: 510.32, change: 1.2 },
  { symbol: "TSLA", name: "Tesla Inc", price: 202.64, change: -0.8 },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 180.49, change: 2.5 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 788.17, change: 3.1 },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 143.96, change: 0.5 },
]

function StocksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favoriteStocks")
      return saved ? JSON.parse(saved) : ["SPY", "TSLA", "AMD", "NVDA", "GOOGL"]
    }
    return ["SPY", "TSLA", "AMD", "NVDA", "GOOGL"]
  })

  useEffect(() => {
    localStorage.setItem("favoriteStocks", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  const filteredStocks = allStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-primary hover:underline group">
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to news
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Stock Tracker</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <AnimatePresence>
                {filteredStocks.map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/stocks/${stock.symbol}`}>
                      <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.preventDefault()
                                toggleFavorite(stock.symbol)
                              }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  favorites.includes(stock.symbol)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </Button>
                            <div>
                              <h3 className="font-bold">{stock.symbol}</h3>
                              <p className="text-sm text-muted-foreground">{stock.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">${stock.price.toFixed(2)}</div>
                            <div
                              className={`flex items-center gap-1 text-sm ${
                                stock.change >= 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {stock.change >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                              {stock.change > 0 ? "+" : ""}
                              {stock.change}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default StocksPage

