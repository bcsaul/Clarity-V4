import type React from "react"
/**
 * Root layout component for ClarityNews
 * Optimized for performance with:
 * - Font display optimization
 * - Preloading of critical assets
 * - Theme provider for consistent UI
 */

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Optimize font loading with display: swap
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Helvetica Neue', 'Arial', 'sans-serif']
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "ClarityNews",
  description: "News with multiple perspectives and balanced coverage",
  generator: 'v0.dev',
  applicationName: 'ClarityNews',
  keywords: ['news', 'journalism', 'balanced', 'perspectives', 'politics', 'current events'],
  authors: [{ name: 'ClarityNews Team' }],
  openGraph: {
    title: 'ClarityNews',
    description: 'News with multiple perspectives and balanced coverage',
    url: 'https://clarity-news.vercel.app/',
    siteName: 'ClarityNews',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClarityNews',
    description: 'News with multiple perspectives and balanced coverage',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'