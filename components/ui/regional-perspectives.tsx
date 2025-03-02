"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Source {
  name: string
  country: string
  quote: string
  url: string
}

interface RegionalPerspective {
  region: string
  color: string
  sentiment: string
  mainConcerns: string[]
  sources: Source[]
}

interface RegionalPerspectivesProps {
  perspectives: RegionalPerspective[]
}

export function RegionalPerspectives({ perspectives }: RegionalPerspectivesProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5" />
        <h2 className="text-xl font-bold">Regional Perspectives</h2>
      </div>

      {/* Region Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {perspectives.map((perspective) => (
          <Button
            key={perspective.region}
            variant="outline"
            className={`h-auto py-4 flex flex-col gap-2 transition-all ${
              selectedRegion === perspective.region ? "ring-2 ring-primary" : ""
            }`}
            style={{
              backgroundColor: selectedRegion === perspective.region ? perspective.color + "20" : undefined,
              borderColor: perspective.color,
            }}
            onClick={() => setSelectedRegion(perspective.region)}
          >
            <span className="font-semibold">{perspective.region}</span>
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: perspective.color + "40" }}>
              {perspective.sentiment}
            </span>
          </Button>
        ))}
      </div>

      {/* Region Details */}
      <AnimatePresence mode="wait">
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {perspectives
              .filter((p) => p.region === selectedRegion)
              .map((perspective) => (
                <Card key={perspective.region}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{perspective.region}</span>
                      <span
                        className="text-sm px-3 py-1 rounded-full"
                        style={{ backgroundColor: perspective.color + "20" }}
                      >
                        {perspective.sentiment}
                      </span>
                    </CardTitle>
                    <CardDescription>Key regional concerns and perspectives</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    {/* Main Concerns */}
                    <div>
                      <h3 className="font-semibold mb-3">Main Concerns</h3>
                      <ul className="grid gap-2">
                        {perspective.mainConcerns.map((concern, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Regional Sources */}
                    <div>
                      <h3 className="font-semibold mb-3">Regional Coverage</h3>
                      <div className="grid gap-4">
                        {perspective.sources.map((source) => (
                          <a
                            key={source.name}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{source.name}</span>
                              <span className="text-xs text-muted-foreground">{source.country}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">"{source.quote}"</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

