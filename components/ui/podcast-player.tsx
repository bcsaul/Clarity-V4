"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PodcastOption {
  duration: number
  isPremium: boolean
  url: string
}

interface PodcastPlayerProps {
  options: PodcastOption[]
  className?: string
}

export function PodcastPlayer({ options, className }: PodcastPlayerProps) {
  const [playing, setPlaying] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  const handlePlay = (index: number) => {
    if (options[index].isPremium) {
      // Handle premium content access
      console.log("Premium content")
      return
    }

    if (playing === index) {
      setPlaying(null)
    } else {
      setPlaying(index)
      setProgress(0)
      // In a real app, this would handle actual audio playback
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Listen to Summary</CardTitle>
        <CardDescription>Choose your preferred length</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {options.map((option, index) => (
            <motion.div
              key={option.duration}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "relative p-4 rounded-lg border h-full",
                  playing === index && "border-primary bg-primary/5",
                  option.isPremium && "bg-muted/50",
                )}
              >
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <Button
                      variant={playing === index ? "default" : "outline"}
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => handlePlay(index)}
                      disabled={option.isPremium}
                    >
                      {option.isPremium ? (
                        <Lock className="h-4 w-4" />
                      ) : playing === index ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    {option.isPremium && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Premium</span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{option.duration}-Minute Summary</div>
                    <div className="text-sm text-muted-foreground">
                      {option.isPremium ? "Upgrade to access" : "Comprehensive overview"}
                    </div>
                  </div>
                </div>
                {playing === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: option.duration * 60 }}
                    onAnimationComplete={() => setPlaying(null)}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

