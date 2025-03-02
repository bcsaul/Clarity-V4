# ClarityNews Technical Documentation

## Architecture Overview

ClarityNews is built using a modern frontend architecture with Next.js 14, utilizing app router, React server components, and client components. The application is designed to work in two modes:

1. **Mock Data Mode**: Using static mock data from `lib/mock-data.ts` (default)
2. **Supabase Integration Mode**: Using real data from Supabase (optional)

The application uses middleware to determine which mode to use, providing flexibility during development and deployment.

## Middleware Implementation

The application's middleware (`middleware.ts`) handles authentication and determines whether to use real Supabase data or mock data:

```typescript
// Conditional import for Supabase based on environment
let createMiddlewareClient: any = null

// Only load Supabase if environment variables are set
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  try {
    ({ createMiddlewareClient } = require("@supabase/auth-helpers-nextjs"))
  } catch (error) {
    console.warn("Supabase auth helpers not available, using mock data mode")
  }
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Try Supabase if available, fall back to mock data
  if (createMiddlewareClient && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createMiddlewareClient({ req, res })
      await supabase.auth.getSession()
      console.log("Using Supabase authentication")
    } catch (error) {
      console.warn("Error with Supabase authentication, falling back to mock data", error)
    }
  } else {
    console.log("Using mock data mode - no authentication")
  }

  return res
}
```

This approach allows the app to run without Supabase during development while maintaining the option to integrate it later.

## Path Aliasing

The application uses TypeScript path aliases to simplify imports. The configuration is in `tsconfig.json`:

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

This allows importing files using `@/` prefix (e.g., `import { CATEGORIES } from "@/lib/constants"`).

## Data Flow Architecture

### Mock Data Flow
1. Component imports mock data from `lib/mock-data.ts`
2. Data is used directly in components
3. Updates are managed through React state
4. No backend calls are made

### Supabase Data Flow (when enabled)
1. Middleware authenticates with Supabase
2. Components use data fetchers to retrieve data
3. Updates are sent to Supabase through API calls
4. Real-time updates can be implemented using Supabase subscriptions

## Feature Explanations

### 1. News Stories Feature

#### Story Listing
**User Interactions:**
- Scrolling through story cards
- Filtering by category using top navigation buttons
- Searching stories using search bar
- Navigating through dates using date picker
- Clicking story cards to view full details

**Data Flow:**
1. Initial story data loaded from `mock-data.ts`
2. Stories filtered based on:
   - Selected category
   - Search query
   - Selected date
3. Filtered stories rendered as cards
4. Story card clicks trigger navigation to story detail page

**Key Components:**
- `HomePage` (`app/page.tsx`)
- Story card components
- Category filter
- Search input
- Date navigation

#### Story Detail
**User Interactions:**
- Sliding perspective bias slider
- Clicking reactions
- Submitting one-word reactions
- Interacting with world map regions
- Playing podcast summaries
- Viewing prediction markets

**Data Flow:**
1. Story detail loaded from `mock-data.ts` using story ID
2. Perspective slider controls visible perspectives (3 at a time)
3. World map interactions trigger region detail displays
4. One-word reactions stored in local state
5. Podcast player manages audio state

**Key Components:**
- `StoryPage` (`app/story/[id]/page.tsx`)
- `SpectrumSlider`
- `WorldMap`
- `PodcastPlayer`
- `PolymarketOdds`

### 2. Games Feature

#### Wordle Game
**User Interactions:**
- Typing letters
- Submitting guesses
- Using virtual keyboard
- Viewing feedback colors

**Algorithm:**
```typescript
function checkGuess(guess: string, answer: string): LetterState[] {
  return guess.split("").map((letter, i) => {
    if (letter === answer[i]) return "correct"
    if (answer.includes(letter)) return "present"
    return "absent"
  })
}
```

## Dependencies and External Libraries

### Core Libraries
- **Next.js 14**: React framework with app router and server components
- **React 18**: Frontend UI library
- **TypeScript**: Type-safe JavaScript

### UI and Animation
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library used for smooth transitions and effects
- **shadcn/ui**: Component library based on Radix UI primitives
- **Lucide React**: Icon library

### Data Management (Optional)
- **Supabase**: Backend-as-a-service for authentication and data storage
- **@supabase/auth-helpers-nextjs**: Next.js helpers for Supabase integration

## Performance Considerations

- **Animations**: Framer Motion is used selectively to avoid performance issues
- **Image Optimization**: Next.js Image component optimizes images automatically
- **Code Splitting**: Next.js handles code splitting for optimal loading
- **Static Data**: Mock data approach minimizes network requests

## Future Integration Paths

1. **Full Supabase Integration**:
   - Implement data services for each feature
   - Set up authentication flows
   - Create database schema in Supabase

2. **Custom Backend**:
   - Implement API routes in Next.js
   - Connect to a custom database
   - Create authentication system

3. **Hybrid Approach**:
   - Use Supabase for authentication
   - Custom API for specialized features
   - Content management system for editorial workflow

