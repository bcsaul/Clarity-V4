"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpectrumSliderProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const biasPositions = [
  { position: 0, color: "#2196F3", label: "Left" },
  { position: 50, color: "#757575", label: "Center" },
  { position: 100, color: "#E53935", label: "Right" },
]

export function SpectrumSlider({ value, onChange, className }: SpectrumSliderProps) {
  const constraintsRef = React.useRef<HTMLDivElement>(null)

  // Calculate the gradient for the spectrum background
  const gradientStops = [
    `${biasPositions[0].color} 0%`,
    `${biasPositions[0].color} 33%`,
    `${biasPositions[1].color} 50%`,
    `${biasPositions[2].color} 67%`,
    `${biasPositions[2].color} 100%`,
  ].join(", ")

  // Get the current bias label based on value
  const getCurrentBias = (value: number) => {
    if (value <= 33) return "Left"
    if (value <= 67) return "Center"
    return "Right"
  }

  // Get color for the current position
  const getCurrentColor = (value: number) => {
    if (value <= 33) return biasPositions[0].color
    if (value <= 67) return biasPositions[1].color
    return biasPositions[2].color
  }

  // Handle click on the spectrum bar
  const handleSpectrumClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = constraintsRef.current?.getBoundingClientRect()
    if (!bounds) return

    const clickX = e.clientX - bounds.left
    const newValue = Math.max(0, Math.min(100, (clickX / bounds.width) * 100))
    onChange(newValue)
  }

  return (
    <div className={cn("relative w-full pt-8 pb-12", className)}>
      {/* Current value indicator */}
      <motion.div
        className="absolute top-0 left-0 w-full text-center text-sm font-medium"
        initial={false}
        animate={{
          color: getCurrentColor(value),
        }}
      >
        {getCurrentBias(value)}
      </motion.div>

      {/* Spectrum bar */}
      <div ref={constraintsRef} className="h-4 rounded-full cursor-pointer relative" onClick={handleSpectrumClick}>
        {/* Background gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(to right, ${gradientStops})`,
          }}
        />

        {/* Handle */}
        <motion.div
          className="absolute top-1/2"
          style={{
            left: `${value}%`,
          }}
          animate={{
            left: `${value}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <motion.div
            className="w-6 h-6 -ml-3 -mt-3 rounded-full shadow-lg border-2 border-white cursor-grab active:cursor-grabbing transition-all hover:scale-110"
            style={{
              backgroundColor: getCurrentColor(value),
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between text-sm font-medium">
        {biasPositions.map(({ label, position, color }) => (
          <motion.button
            key={label}
            onClick={() => onChange(position)}
            className={cn(
              "transform -translate-x-1/2 transition-colors hover:font-bold focus:outline-none",
              Math.abs(value - position) < 33 ? "opacity-100" : "opacity-50",
            )}
            style={{
              left: `${position}%`,
              color: Math.abs(value - position) < 33 ? color : undefined,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

