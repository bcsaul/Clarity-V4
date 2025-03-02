"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6

// Mock word list - in production this would be a larger dictionary
const WORDS = ["CLEAR", "MEDIA", "TRUTH", "STORY", "FACTS", "NEWS"]

interface LetterState {
  letter: string
  state: "correct" | "present" | "absent" | "empty"
}

export function Wordle() {
  const [answer] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)])
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState<LetterState[][]>(
    Array(MAX_ATTEMPTS)
      .fill([])
      .map(() => Array(WORD_LENGTH).fill({ letter: "", state: "empty" })),
  )
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return

      if (e.key === "Enter") {
        if (currentGuess.length !== WORD_LENGTH) return

        const newGuesses = [...guesses]
        const guessStates: LetterState[] = currentGuess.split("").map((letter, i) => {
          if (letter === answer[i]) {
            return { letter, state: "correct" }
          }
          if (answer.includes(letter)) {
            return { letter, state: "present" }
          }
          return { letter, state: "absent" }
        })

        newGuesses[currentAttempt] = guessStates
        setGuesses(newGuesses)

        if (currentGuess === answer) {
          setWon(true)
          setGameOver(true)
        } else if (currentAttempt === MAX_ATTEMPTS - 1) {
          setGameOver(true)
        } else {
          setCurrentAttempt(currentAttempt + 1)
        }
        setCurrentGuess("")
      } else if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1))
      } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => (prev + e.key).toUpperCase())
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [answer, currentAttempt, currentGuess, gameOver, guesses])

  const handleLetterClick = (letter: string) => {
    if (gameOver || currentGuess.length >= WORD_LENGTH) return
    setCurrentGuess((prev) => (prev + letter).toUpperCase())
  }

  return (
    <div className="w-full max-w-lg mx-auto">
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
                .map((_, letterIndex) => {
                  const letter =
                    attemptIndex === currentAttempt
                      ? currentGuess[letterIndex] || ""
                      : guesses[attemptIndex][letterIndex].letter

                  const state = attemptIndex === currentAttempt ? "empty" : guesses[attemptIndex][letterIndex].state

                  return (
                    <div
                      key={letterIndex}
                      className={`
                    w-14 h-14 border-2 rounded flex items-center justify-center text-2xl font-bold uppercase
                    ${state === "correct" ? "bg-green-500 text-white border-green-500" : ""}
                    ${state === "present" ? "bg-yellow-500 text-white border-yellow-500" : ""}
                    ${state === "absent" ? "bg-gray-500 text-white border-gray-500" : ""}
                  `}
                    >
                      {letter}
                    </div>
                  )
                })}
            </motion.div>
          ))}
      </div>

      <div className="space-y-2">
        {[
          ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
          ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
          ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
        ].map((row, i) => (
          <div key={i} className="flex justify-center gap-1">
            {row.map((key) => (
              <Button
                key={key}
                onClick={() => {
                  if (key === "Enter") {
                    const event = new KeyboardEvent("keydown", { key: "Enter" })
                    window.dispatchEvent(event)
                  } else if (key === "⌫") {
                    const event = new KeyboardEvent("keydown", { key: "Backspace" })
                    window.dispatchEvent(event)
                  } else {
                    handleLetterClick(key)
                  }
                }}
                className={`
                  ${key === "Enter" ? "w-16" : "w-10"} 
                  h-14 font-bold
                `}
              >
                {key}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {gameOver && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{won ? "Congratulations!" : "Game Over"}</h2>
          <p className="text-muted-foreground">{won ? "You found the word!" : `The word was ${answer}`}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Play Again
          </Button>
        </motion.div>
      )}
    </div>
  )
}

