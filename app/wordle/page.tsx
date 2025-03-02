"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6

export default function WordlePage() {
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_ATTEMPTS).fill(""))

  // Placeholder for game state - will be implemented later
  const gameState = Array(MAX_ATTEMPTS)
    .fill("")
    .map(() => Array(WORD_LENGTH).fill({ letter: "", state: "empty" }))

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-primary hover:underline group">
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to news
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-8">Wordle</h1>

          <div className="grid gap-2 mb-8">
            {Array(MAX_ATTEMPTS)
              .fill(null)
              .map((_, attemptIndex) => (
                <motion.div
                  key={attemptIndex}
                  className="grid grid-cols-5 gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: attemptIndex * 0.1 }}
                >
                  {Array(WORD_LENGTH)
                    .fill(null)
                    .map((_, letterIndex) => (
                      <div
                        key={letterIndex}
                        className="w-14 h-14 border-2 rounded flex items-center justify-center text-2xl font-bold uppercase"
                      >
                        {gameState[attemptIndex][letterIndex].letter}
                      </div>
                    ))}
                </motion.div>
              ))}
          </div>

          <div className="grid grid-cols-10 gap-2 mb-4">
            {Array.from("QWERTYUIOP").map((letter) => (
              <button
                key={letter}
                className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center font-medium hover:bg-gray-300 transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-9 gap-2 mb-4">
            {Array.from("ASDFGHJKL").map((letter) => (
              <button
                key={letter}
                className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center font-medium hover:bg-gray-300 transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from("ZXCVBNM").map((letter) => (
              <button
                key={letter}
                className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center font-medium hover:bg-gray-300 transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

