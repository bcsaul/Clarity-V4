"use client"
import Link from "next/link"
import { ArrowLeft, Grid2X2, AlignJustify } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Connections } from "@/components/games/connections"
import { Wordle } from "@/components/games/wordle"

export default function GamesPage() {
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
            <CardTitle>Daily Games</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="connections" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="connections" className="relative">
                  <div className="flex items-center gap-2">
                    <Grid2X2 className="h-4 w-4" />
                    <span>Connections</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="wordle" className="relative">
                  <div className="flex items-center gap-2">
                    <AlignJustify className="h-4 w-4" />
                    <span>Wordle</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="connections" className="mt-4">
                <Connections />
              </TabsContent>
              <TabsContent value="wordle" className="mt-4">
                <Wordle />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

