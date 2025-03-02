# ClarityNews Development Guide

This guide provides detailed technical information for developers working on the ClarityNews project. It covers the implementation details, architecture decisions, and configuration options.

## Middleware Implementation

The application uses Next.js middleware (`middleware.ts`) to handle authentication and determine whether to use real Supabase data or mock data. This approach provides flexibility during development and testing.

### How it works:

```typescript
// middleware.ts
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
```

This middleware:
1. Conditionally imports Supabase auth helpers only if the environment variables are set
2. Checks if Supabase is available before attempting to use it
3. Falls back to mock data mode if Supabase is not available or encounters an error
4. Logs the mode being used (Supabase authentication or mock data)

## Path Aliases Configuration

Path aliases in Next.js allow you to use shortcuts like `@/lib/constants` to import files from anywhere in your codebase. This is configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

This configuration maps `@/` to the root directory, so `@/lib/constants` corresponds to `./lib/constants.ts`.

## Mock Data Implementation

The mock data is implemented in `lib/mock-data.ts` and includes sample data for:
- News stories
- User profiles
- Games (Wordle, Connections)
- Stocks
- Sports scores

### Example of accessing mock data:

```typescript
import { MOCK_STORIES } from "@/lib/mock-data"

// Use mock data in a component
const HomePageComponent = () => {
  const stories = MOCK_STORIES
  
  return (
    <div>
      {stories.map(story => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  )
}
```

## Key Dependencies

The application has several important dependencies:

1. **UI and Animation**:
   - `framer-motion`: Used for animations in components like `StoryCard`
   - `next-themes`: Enables light/dark theme switching
   - `shadcn/ui`: UI component library built on Radix UI
   - `tailwindcss`: For styling

2. **Data Management**:
   - `@supabase/auth-helpers-nextjs`: For authentication (optional)
   - `zod`: For data validation

3. **Frontend Framework**:
   - `next.js`: React framework
   - `react` and `react-dom`: Core React libraries
   - `typescript`: For type safety

## Switching Between Mock and Real Data

### For Local Development (Mock Data):
- No configuration needed - the app defaults to mock data mode

### For Supabase Integration:
1. Create or update `.env.local` with Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
2. Install Supabase auth helpers:
   ```bash
   npm install @supabase/auth-helpers-nextjs
   ```
3. Restart the development server:
   ```bash
   npm run dev
   ```

## Future Backend Integration Plans

When integrating a full backend:

1. Create proper data services in the `lib` directory
2. Update components to fetch real data instead of mock data
3. Implement authentication flows
4. Set up API routes for server-side operations
5. Add caching strategies for improved performance

## Common Development Workflows

1. **Adding a new feature**:
   - Create components in `components/features/`
   - Add routes in `app/` directory
   - Update types in `lib/types.ts` if needed
   - Add mock data in `lib/mock-data.ts` for testing

2. **Styling components**:
   - Use Tailwind classes for styling
   - Use shadcn/ui components as a base
   - Customize with additional Tailwind classes

3. **Testing changes**:
   - Run in development mode with `npm run dev`
   - Check both light and dark themes
   - Test different screen sizes for responsive design 