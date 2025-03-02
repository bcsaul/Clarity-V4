"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [plan, setPlan] = useState("free")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would connect to the backend in a real implementation
    console.log("Signup attempt with:", { email, password, name, plan, agreeTerms })
    // For now, just redirect to home
    window.location.href = "/"
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-primary hover:underline group">
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Create an account</h1>
            <p className="text-muted-foreground">Sign up to get started with ClarityNews</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>

            <div className="space-y-3">
              <Label>Subscription Plan</Label>
              <RadioGroup value={plan} onValueChange={setPlan} className="space-y-2">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free" className="font-normal flex-grow">
                    <span className="font-medium">Free</span>
                    <p className="text-sm text-muted-foreground">3 stories per day</p>
                  </Label>
                  <span className="text-sm font-medium">$0</span>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-3 bg-primary/5 border-primary/30">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium" className="font-normal flex-grow">
                    <span className="font-medium">Premium</span>
                    <div className="text-sm text-muted-foreground">
                      <p>• Unlimited stories</p>
                      <p>• Save articles</p>
                      <p>• Full-length podcast summaries</p>
                      <p>• Premium market insights</p>
                    </div>
                  </Label>
                  <span className="text-sm font-medium text-primary">Coming Soon</span>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                required
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

