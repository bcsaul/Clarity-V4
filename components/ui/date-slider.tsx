"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { format, subDays, isToday } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DateSliderProps {
  value: Date
  onChange: (date: Date) => void
  className?: string
  maxDays?: number
}

export function DateSlider({ value, onChange, className, maxDays = 30 }: DateSliderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const constraintsRef = React.useRef<HTMLDivElement>(null)

  // Generate dates for the slider
  const dates = React.useMemo(() => {
    const result = []
    for (let i = maxDays - 1; i >= 0; i--) {
      result.push(subDays(new Date(), i))
    }
    return result
  }, [maxDays])

  // Find the current date index
  const currentIndex = dates.findIndex((date) => date.toDateString() === value.toDateString())

  return (
    <div className={cn("relative w-full py-6", className)}>
      <div className="flex items-center gap-4 mb-4">
        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">{isToday(value) ? "Today's Stories" : format(value, "MMMM d, yyyy")}</h2>
      </div>

      <div ref={constraintsRef} className="relative h-12 bg-background border rounded-lg overflow-hidden">
        {/* Date markers */}
        <div className="absolute inset-0 flex">
          {dates.map((date, index) => (
            <div
              key={date.toISOString()}
              className={cn(
                "flex-1 border-r last:border-r-0 cursor-pointer transition-colors hover:bg-muted/50",
                currentIndex === index && "bg-primary/10",
              )}
              onClick={() => onChange(date)}
            >
              <div className="h-full flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">{format(date, "MMM")}</span>
                <span className={cn("text-sm font-medium", currentIndex === index && "text-primary")}>
                  {format(date, "d")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Current date indicator */}
        <motion.div
          className="absolute top-0 h-1 bg-primary"
          initial={false}
          animate={{
            left: `${(currentIndex / (maxDays - 1)) * 100}%`,
            width: `${100 / maxDays}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  )
}

