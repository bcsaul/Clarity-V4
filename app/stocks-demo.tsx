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

// Mock detailed stock data
const mockStockDetails = {
  SPY: {
    name: "S&P 500 Index",
    marketCap: "N/A",
    volume: "84.2M",
    peRatio: "N/A",
    dividend: "1.32%",
    dayRange: "507.68 - 512.35",
    yearRange: "420.75 - 515.28",
  },
  TSLA: {
    name: "Tesla Inc",
    marketCap: "643.8B",
    volume: "98.6M",
    peRatio: "52.8",
    dividend: "N/A",
    dayRange: "201.10 - 205.88",
    yearRange: "152.37 - 299.29",
  },
  AMD: {
    name: "Advanced Micro Devices",
    marketCap: "291.5B",
    volume: "65.3M",
    peRatio: "45.2",
    dividend: "N/A",
    dayRange: "178.89 - 181.35",
    yearRange: "78.43 - 184.92",
  },
  NVDA: {
    name: "NVIDIA Corporation",
    marketCap: "1.95T",
    volume: "45.8M",
    peRatio: "89.3",
    dividend: "0.05%",
    dayRange: "776.22 - 789.95",
    yearRange: "222.97 - 789.95",
  },
  GOOGL: {
    name: "Alphabet Inc",
    marketCap: "1.82T",
    volume: "28.4M",
    peRatio: "24.8",
    dividend: "N/A",
    dayRange: "142.55 - 144.45",
    yearRange: "102.21 - 144.45",
  },
}

export default function StocksDemo() {
  const [view, setView] = useState<"list" | "detail">("list")
  const [selectedSymbol, setSelectedSymbol] = useState<string>("")
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

  if (view === "detail" && selectedSymbol) {
    const stock = allStocks.find((s) => s.symbol === selectedSymbol)
    const details = mockStockDetails[selectedSymbol as keyof typeof mockStockDetails]

    if (!stock || !details) {
      return (
        <main className="min-h-screen bg-[#F5F5F5] py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <button
                onClick={() => setView("list")}
                className="inline-flex items-center text-primary hover:underline group"
              >
                <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to stocks
              </button>
            </div>
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">Stock not found</div>
              </CardContent>
            </Card>
          </div>
        </main>
      )
    }

    return (
      <main className="min-h-screen bg-[#F5F5F5] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setView("list")}
              className="inline-flex items-center text-primary hover:underline group"
            >
              <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to stocks
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-4">
                      <CardTitle>{stock.symbol}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(stock.symbol)}
                        className="h-8 w-8"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            favorites.includes(stock.symbol)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>
                    <p className="text-muted-foreground">{details.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        stock.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Market Cap</div>
                      <div className="font-medium">{details.marketCap}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Volume</div>
                      <div className="font-medium">{details.volume}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">P/E Ratio</div>
                      <div className="font-medium">{details.peRatio}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Dividend Yield</div>
                      <div className="font-medium">{details.dividend}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Day Range</div>
                      <div className="font-medium">{details.dayRange}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">52 Week Range</div>
                      <div className="font-medium">{details.yearRange}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    )
  }

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
                    <div
                      className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                      onClick={() => {
                        setSelectedSymbol(stock.symbol)
                        setView("detail")
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
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

