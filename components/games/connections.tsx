"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { shuffle } from "@/lib/utils"

interface Category {
  name: string
  color: string
  words: string[]
}

const CATEGORIES: Category[] = [
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
]

export function Connections() {
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [solvedCategories, setSolvedCategories] = useState<string[]>([])
  const [attempts, setAttempts] = useState(4)
  const [gameOver, setGameOver] = useState(false)
  const [shuffledWords, setShuffledWords] = useState<string[]>([])

  useEffect(() => {
    setShuffledWords(shuffle(CATEGORIES.flatMap((cat) => cat.words)))
  }, [])

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word))
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word])
    }
  }

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return

    const category = CATEGORIES.find((cat) => cat.words.every((word) => selectedWords.includes(word)))

    if (category && !solvedCategories.includes(category.name)) {
      setSolvedCategories([...solvedCategories, category.name])
      setSelectedWords([])
      if (solvedCategories.length + 1 === CATEGORIES.length) {
        setGameOver(true)
      }
    } else {
      setAttempts(attempts - 1)
      setSelectedWords([])
      if (attempts <= 1) {
        setGameOver(true)
      }
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm font-medium">Attempts left: {attempts}</div>
        <div className="text-sm font-medium">
          Found: {solvedCategories.length}/{CATEGORIES.length}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {shuffledWords.map((word) => {
          const isSolved = solvedCategories.some((cat) => CATEGORIES.find((c) => c.name === cat)?.words.includes(word))
          const category = CATEGORIES.find((cat) => solvedCategories.includes(cat.name) && cat.words.includes(word))

          return (
            <motion.button
              key={word}
              onClick={() => !isSolved && handleWordClick(word)}
              className={`
                p-4 text-center font-bold rounded-lg transition-all
                ${isSolved ? `${category?.color} text-white` : "bg-white hover:bg-gray-50"}
                ${selectedWords.includes(word) ? "ring-2 ring-primary" : ""}
              `}
              whileHover={!isSolved ? { scale: 1.05 } : {}}
              whileTap={!isSolved ? { scale: 0.95 } : {}}
              disabled={isSolved}
            >
              {word}
            </motion.button>
          )
        })}
      </div>

      <Button onClick={handleSubmit} className="w-full mb-6" disabled={selectedWords.length !== 4}>
        Submit
      </Button>

      <div className="space-y-2">
        {solvedCategories.map((catName) => {
          const category = CATEGORIES.find((c) => c.name === catName)
          return (
            <motion.div
              key={catName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg text-white font-medium ${category?.color}`}
            >
              {catName}: {category?.words.join(", ")}
            </motion.div>
          )
        })}
      </div>

      {gameOver && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {solvedCategories.length === CATEGORIES.length ? "Congratulations!" : "Game Over"}
          </h2>
          <p className="text-muted-foreground">
            {solvedCategories.length === CATEGORIES.length
              ? "You found all categories!"
              : `You found ${solvedCategories.length} categories`}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Play Again
          </Button>
        </motion.div>
      )}
    </div>
  )
}

