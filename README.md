# ClarityNews

ClarityNews is a modern news platform designed to provide readers with balanced, multi-perspective coverage of current events. The application aims to combat media bias by presenting diverse viewpoints alongside factual reporting.

## 🌟 Features

### Primary Features
- **Multi-perspective News Stories**: View news with different political perspectives and bias indicators
- **Interactive World Map**: Explore regional impacts and perspectives on global stories
- **Category Filtering**: Browse news by categories like politics, technology, business, etc.
- **Search Functionality**: Find stories based on keywords
- **Date Navigation**: Browse news from different dates

### Secondary Features
- **Games Section**: Play Wordle and Connections games
- **Stocks Tracking**: View stock market information
- **Sports Updates**: Check sports scores and standings
- **One-word Reactions**: Engage with stories through simple reactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bcsaul/Clarity-V4.git
   cd Clarity-V4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. The app requires specific packages to work correctly. Make sure you have these installed:
   ```bash
   # UI and animation libraries
   npm install framer-motion next-themes 
   
   # If you want to use Supabase (optional for mock data mode)
   npm install @supabase/auth-helpers-nextjs
   ```

### Running the Application

To run the development server:

```bash
# Using npm
npm run dev

# Or using npx
npx next dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Mock Data

This version of the application uses mock data for all features:
- News stories are pre-populated
- Games, stocks, and sports sections use simulated data
- No backend integration required for local development

The application is configured to run in mock data mode by default, even if Supabase environment variables are present.

### Configuration

#### Mock Data Mode (Default)

The app automatically runs in mock data mode if Supabase is not configured. The middleware (`middleware.ts`) handles this by detecting the absence of Supabase authentication and defaulting to mock data.

#### Supabase Integration (Optional)

If you want to use Supabase authentication:

1. Make sure you have `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. Install the required dependency:
   ```bash
   npm install @supabase/auth-helpers-nextjs
   ```

3. The middleware will automatically use Supabase if these environment variables are present.

## 🔧 Troubleshooting

### Common Issues and Solutions

1. **Module not found: Can't resolve '@/lib/constants'**
   - Solution: Ensure path aliases are correctly configured in `tsconfig.json`:
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

2. **Module not found: Can't resolve 'framer-motion'**
   - Solution: Install framer-motion:
     ```bash
     npm install framer-motion
     ```

3. **Supabase Authentication Issues**
   - Solution: The middleware is configured to fall back to mock data if Supabase authentication fails, so no action is required.
   - If you want to use Supabase, ensure the environment variables are set correctly.

4. **Blank Page / ERR_EMPTY_RESPONSE**
   - Solution: This can be due to multiple issues:
     - Clear build cache: `rm -rf .next`
     - Restart dev server: `npm run dev`
     - Check for missing dependencies

5. **Dependency Issues**:
   ```bash
   npm install
   ```

6. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```

7. **Check Node.js version**:
   ```bash
   node -v  # Should be 18.x or higher
   ```

8. **Managing Multiple Localhost Instances**:
   - If you see messages like "Port 3000 is in use, trying 3001 instead", you have multiple instances running.
   - To close all existing Node.js processes before starting a new one:
     
     **On macOS/Linux**:
     ```bash
     # Find all Node.js processes
     ps aux | grep node
     
     # Kill all Node.js processes
     killall node
     
     # Or kill a specific process by ID
     kill -9 <PID>
     ```
     
     **On Windows**:
     ```bash
     # List all Node.js processes
     tasklist | findstr node
     
     # Kill all Node.js processes
     taskkill /F /IM node.exe
     ```
   
   - After closing existing processes, run `npm run dev` to start a fresh instance.
   - Always check that the app is running on the expected port (usually 3000) unless intentionally changed.

9. **Missing Module 'critters'**:
   If you encounter an error about a missing 'critters' module:
   ```bash
   npm install critters
   ```

## 📢 GitHub Repository Management

### Version Management

This repository uses a version-based approach for updates:

1. **Main Branch**: The `main` branch always contains the latest stable version
2. **Complete Versions**: Each version is a complete, working snapshot of the application
3. **No Incremental Updates**: We do not commit small, incremental changes but rather complete, functional versions

### Creating a New Version

When you want to create a new version:

1. Make all your changes locally and ensure they work correctly
2. Test thoroughly to make sure the app functions as expected
3. Commit and push as a complete new version:

```bash
# Add all changes
git add .

# Commit with a version message
git commit -m "Version X: Brief description of major changes"

# Push to GitHub
git push
```

### Repository Setup

If you need to set up this repository on a new machine:

```bash
# Clone the repository
git clone https://github.com/bcsaul/Clarity-V4.git

# Enter the project directory
cd Clarity-V4

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 🏗️ Project Structure

```
clarity-news/
├── app/                      # Next.js App Router
│   ├── (features)/           # Feature-specific routes
│   ├── story/                # Story detail pages
│   ├── games/                # Games pages (secondary feature)
│   ├── login/                # Authentication pages
│   ├── signup/               # User registration
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # Reusable components
│   ├── features/             # Feature-specific components
│   ├── games/                # Game components (secondary feature)
│   └── ui/                   # UI components (shadcn/ui)
├── lib/                      # Utilities and data
│   ├── constants.ts          # App constants
│   ├── mock-data.ts          # Mock data for development
│   ├── types.ts              # TypeScript types
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
└── styles/                   # Additional styles
├── middleware.ts             # Next.js middleware for auth/mock data handling
```

## 🧩 Key Components

### Primary Components (News)
- `StoryCard`: Displays story previews on the home page
- `CategoryFilter`: Filters stories by category
- `SpectrumSlider`: Controls visible perspectives based on political bias

### UI Components
- Comprehensive UI component library built with shadcn/ui
- Custom components like `WorldMap`, `PodcastPlayer`, and `PolymarketOdds`

### Secondary Components
- `Wordle`: Classic word-guessing game
- `Connections`: Word grouping puzzle game
- Stock and sports tracking components

## 🛠️ Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (based on Radix UI)
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React

## 📱 Current Implementation

- Frontend implementation with mock data
- All features are functional using simulated data
- Focus on news presentation interface
- Secondary features included and ready to use

## 🔮 Future Development

- Backend integration
- User authentication
- Real-time data fetching
- Personalized news feed

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [Vercel](https://vercel.com) for the v0 interface builder
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Next.js](https://nextjs.org/) for the React framework 

## 📝 Development Notes

### Key Implementation Details

1. **Mock Data by Default**: The application is configured to work with mock data by default, making it easy to run without backend dependencies.

2. **Flexible Middleware**: The middleware (`middleware.ts`) is designed to work in both mock data mode and with Supabase integration:
   - Automatically detects if Supabase environment variables are present
   - Falls back to mock data mode if Supabase is not configured or encounters errors
   - Provides clear console logs indicating which mode is being used

3. **Path Aliasing**: The TypeScript configuration includes path aliases (@/lib/constants) to simplify imports and maintain a clean codebase.

4. **UI Components**: All UI elements use a combination of:
   - shadcn/ui for consistent, accessible components
   - Tailwind CSS for styling
   - Framer Motion for animations

5. **Development Best Practices**:
   - Always close previous instances of the app before starting a new one (see Troubleshooting section)
   - Review the README before each development session to ensure all requirements are met
   - Use the troubleshooting section when encountering common issues

### Additional Documentation

For more detailed technical information, please refer to:
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Detailed guide for developers
- [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md) - Technical architecture and implementation details
- [PERFORMANCE_AND_ERROR_HANDLING.md](./PERFORMANCE_AND_ERROR_HANDLING.md) - Performance optimizations and error handling strategies 