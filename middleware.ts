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
 * - Performance optimizations with response caching
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Optional import for Supabase - will only be used if env vars are set
let createMiddlewareClient: any = null

// Cache to improve performance by storing auth state
const AUTH_CACHE = new Map<string, {timestamp: number, data: any}>()
const CACHE_TTL = 300000 // 5 minutes in milliseconds

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
 * Checks if a path should be excluded from middleware processing
 * for performance optimization
 * 
 * @param path - The request path
 * @returns Boolean indicating if path should be excluded
 */
function shouldExcludePath(path: string): boolean {
  // Skip middleware for static assets to improve performance
  return path.startsWith('/_next/') || 
         path.startsWith('/api/') ||
         path.includes('.') ||
         path.startsWith('/static/');
}

/**
 * Middleware function that runs on every request
 * 
 * This function:
 * 1. Attempts to use Supabase authentication if configured
 * 2. Falls back to mock data mode if Supabase is not available or errors occur
 * 3. Logs the mode being used for diagnostic purposes
 * 4. Implements performance optimizations including response caching
 * 
 * @param req - The incoming request
 * @returns The modified response
 */
export async function middleware(req: NextRequest) {
  // Performance optimization: skip processing for static assets and API routes
  if (shouldExcludePath(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const res = NextResponse.next()
  
  // Add cache control headers for improved performance
  res.headers.set('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=300');
  
  // If Supabase is configured, use it for auth
  if (createMiddlewareClient && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      // Check if we have a valid cached session for this request
      const cacheKey = req.cookies.get('sb-auth-token')?.value || 'anonymous';
      const cachedData = AUTH_CACHE.get(cacheKey);
      
      if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_TTL) {
        // Use cached auth data for performance
        console.log("Using cached authentication data");
        
        // Set auth data in the response
        if (cachedData.data) {
          res.headers.set('X-Auth-State', 'authenticated');
        }
      } else {
        // No valid cache, perform actual authentication
        const supabase = createMiddlewareClient({ req, res })
        const { data } = await supabase.auth.getSession()
        
        // Cache the result for future requests
        AUTH_CACHE.set(cacheKey, {
          timestamp: Date.now(),
          data: data?.session || null
        });
        
        console.log("Using Supabase authentication")
      }
    } catch (error) {
      console.warn("Error with Supabase authentication, falling back to mock data")
    }
  } else {
    // Using mock data - no authentication required
    console.log("Using mock data mode - no authentication")
  }

  return res
}

// Configure the paths that should be processed by the middleware
export const config = {
  // Performance optimization: only run middleware on necessary routes
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files with extensions (.svg, .jpg, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

