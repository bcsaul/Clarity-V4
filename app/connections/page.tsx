"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Grid2X2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Example categories and words
const gameData = {
  categories: [
    { name: "Political Terms", color: "bg-yellow-500", words: ["BILL", "VOTE", "LAW", "POLL"] },
    { name: "Economic Terms", color: "bg-green-500", words: ["BOND", "STOCK", "FUND", "LOAN"] },
    { name: "Tech Companies", color: "bg-blue-500", words: ["APPLE", "META", "TESLA", "NVIDIA"] },
    { name: "News Sources", color: "bg-purple-500", words: ["CNN", "BBC", "FOX", "VICE"] },
  ],
}

export default function ConnectionsPage() {
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [solvedCategories, setSolvedCategories] = useState<string[]>([])
  const [attempts, setAttempts] = useState(4)

  const allWords = gameData.categories.flatMap((cat) => cat.words).sort(() => Math.random() - 0.5)

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word))
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word])
    }
  }

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return

    const category = gameData.categories.find((cat) => cat.words.every((word) => selectedWords.includes(word)))

    if (category && !solvedCategories.includes(category.name)) {
      setSolvedCategories([...solvedCategories, category.name])
      setSelectedWords([])
    } else {
      setAttempts(attempts - 1)
      setSelectedWords([])
    }
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

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Connections</h1>
            <div className="flex items-center gap-2">
              <Grid2X2 className="h-5 w-5" />
              <span className="font-medium">Attempts left: {attempts}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {allWords.map((word) => {
              const isSolved = solvedCategories.some((cat) =>
                gameData.categories.find((c) => c.name === cat)?.words.includes(word),
              )

              return (
                <motion.button
                  key={word}
                  onClick={() => !isSolved && handleWordClick(word)}
                  className={cn(
                    "p-4 text-center font-bold rounded-lg transition-all",
                    isSolved ? "opacity-50 cursor-not-allowed" : "hover:scale-105",
                    selectedWords.includes(word) ? "bg-primary text-white" : "bg-white",
                  )}
                  whileHover={!isSolved ? { scale: 1.05 } : {}}
                  whileTap={!isSolved ? { scale: 0.95 } : {}}
                >
                  {word}
                </motion.button>
              )
            })}
          </div>

          <Button onClick={handleSubmit} className="w-full" disabled={selectedWords.length !== 4}>
            Submit
          </Button>

          <div className="mt-6 space-y-2">
            {solvedCategories.map((catName) => {
              const category = gameData.categories.find((c) => c.name === catName)
              return (
                <div key={catName} className={cn("p-4 rounded-lg text-white font-medium", category?.color)}>
                  {catName}: {category?.words.join(", ")}
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </main>
  )
}

