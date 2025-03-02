# ClarityNews Documentation

## Application Summary

ClarityNews is a modern news platform designed to provide readers with balanced, multi-perspective coverage of current events. The application aims to combat media bias by presenting diverse viewpoints alongside factual reporting.

### Core Features
- Multi-perspective news stories with bias indicators
- Interactive world map showing regional impacts
- Games section featuring Wordle and Connections
- Real-time stock tracking
- Sports standings and statistics
- Premium features including podcast summaries
- One-word reaction system for community engagement
- Prediction markets integration via Polymarket

### Target Users
- News readers seeking balanced coverage
- Users interested in understanding media bias
- Investors tracking market movements
- Sports enthusiasts following multiple leagues
- Users seeking interactive news engagement

## Project Structure

```plaintext
clarity-news/
├── app/                      # Next.js 13+ App Router
│   ├── (features)/          # Feature-specific routes
│   │   ├── games/          # Games feature pages
│   │   ├── sports/         # Sports feature pages
│   │   └── stocks/         # Stocks feature pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── games/             # Game-specific components
│   ├── stocks/            # Stock-related components
│   └── ui/                # UI components (shadcn/ui)
├── lib/                   # Utilities and data
│   ├── mock-data.ts      # Mock data for development
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── styles/              # Additional styles

