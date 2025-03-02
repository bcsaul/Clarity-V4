/**
 * Next.js Middleware for ClarityNews
 * 
 * This middleware provides flexibility between using Supabase authentication
 * or running in mock data mode. It automatically detects if Supabase environment
 * variables are available and falls back to mock data mode if they're not or
 * if there's an authentication error.
 * 
 * Key features:
 * - Conditional loading of Supabase client only when needed
 * - Automatic fallback to mock data mode
 * - Transparent operation that doesn't require code changes to switch modes
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Optional import for Supabase - will only be used if env vars are set
let createMiddlewareClient: any = null

// Dynamically import Supabase client if environment variables are set
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  try {
    // Dynamic import for Supabase
    ({ createMiddlewareClient } = require("@supabase/auth-helpers-nextjs"))
  } catch (error) {
    console.warn("Supabase auth helpers not available, using mock data mode")
  }
}

/**
 * Middleware function that runs on every request
 * 
 * This function:
 * 1. Attempts to use Supabase authentication if configured
 * 2. Falls back to mock data mode if Supabase is not available or errors occur
 * 3. Logs the mode being used for diagnostic purposes
 * 
 * @param req - The incoming request
 * @returns The modified response
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // If Supabase is configured, use it for auth
  if (createMiddlewareClient && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createMiddlewareClient({ req, res })
      await supabase.auth.getSession()
      console.log("Using Supabase authentication")
    } catch (error) {
      console.warn("Error with Supabase authentication, falling back to mock data", error)
    }
  } else {
    // Using mock data - no authentication required
    console.log("Using mock data mode - no authentication")
  }

  return res
}

