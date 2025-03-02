# Performance Optimizations and Error Handling

This document outlines the performance optimizations and error handling strategies implemented in the ClarityNews application.

## Error Handling

### Error Boundaries

We've implemented React Error Boundaries to catch JavaScript errors in components and display fallback UIs instead of crashing the entire application. This greatly improves the resilience of the application.

**Key implementations:**

1. **ErrorBoundary Component**: `components/ui/error-boundary.tsx`
   - Catches errors in child components
   - Displays friendly error messages
   - Provides "Try Again" functionality
   - Can be customized with component-specific fallback UIs

2. **Usage Pattern:**
   ```tsx
   <ErrorBoundary fallback={customFallback} componentName="ComponentName">
     <YourComponent />
   </ErrorBoundary>
   ```

3. **Implemented in:**
   - HomePage component (app/page.tsx)
   - StoryCard component (components/features/story/story-card.tsx)

### Safe Data Fetching

We've created a custom hook for safer data fetching with proper error states:

1. **useSafeData Hook**: `hooks/use-safe-data.tsx`
   - Handles loading, success, and error states
   - Provides retry functionality
   - Strongly typed with generics
   - Includes fallback components for loading and error states

2. **Usage Pattern:**
   ```tsx
   const { 
     data, 
     isLoading, 
     isError, 
     error, 
     retry 
   } = useSafeData(fetchFunction, dependencies)
   
   if (isLoading) return <LoadingFallback />
   if (isError) return <ErrorFallback error={error} retry={retry} />
   ```

3. **Implemented in:**
   - HomePage component for story fetching

### Resilient UI Components

Components are designed to handle missing or invalid data:

1. **StoryCard Component**: 
   - Handles missing image URLs with placeholders
   - Provides default text for missing titles or descriptions
   - Handles invalid category data

## Performance Optimizations

### Memoization

We use React's memoization features to prevent unnecessary re-renders and calculations:

1. **useMemo**: Used to optimize expensive calculations
   - Story filtering in HomePage is now memoized

2. **useCallback**: Used to stabilize function references
   - Filter functions are wrapped in useCallback to prevent recreation

### Debouncing

Input handling is optimized using debounce techniques:

1. **debounce utility**: `lib/utils/performance.ts`
   - Delays function execution until input stabilizes
   - Reduces the number of state updates and re-renders

2. **SearchInput Component**: Implements debouncing for search
   - Local state updates immediately for responsive UX
   - Parent state updates only after debounce period
   - Configurable debounce time (default: 300ms)

### Memory Caching

Simple in-memory caching for expensive operations:

1. **MemoryCache utility**: `lib/utils/performance.ts`
   - Stores results of expensive calculations
   - Includes TTL (Time To Live) support
   - Provides methods for get, set, delete, and clear

### Other Performance Utilities

1. **throttle function**: Limits the rate of function execution
   - Useful for scroll and resize event handlers

2. **isBrowser detection**: Safely handles server vs. client code execution

## Implementation Guidelines

### Adding Error Boundaries

Wrap complex or potentially error-prone components with ErrorBoundary:

```tsx
import { ErrorBoundary } from "@/components/ui/error-boundary"

function MyComponent() {
  return (
    <ErrorBoundary componentName="MyComponent">
      {/* Complex component code here */}
    </ErrorBoundary>
  )
}
```

### Optimizing with useMemo and useCallback

```tsx
// Before
const filteredItems = items.filter(item => item.type === selectedType)

// After
const filteredItems = useMemo(() => {
  return items.filter(item => item.type === selectedType)
}, [items, selectedType])
```

### Using Safe Data Fetching

```tsx
import { useSafeData } from "@/hooks/use-safe-data"

function MyDataComponent() {
  const { data, isLoading, isError, error, retry } = useSafeData(
    fetchMyData,
    [dependencyA, dependencyB]
  )
  
  if (isLoading) return <LoadingFallback />
  if (isError) return <ErrorFallback error={error} retry={retry} />
  
  return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>
}
```

## Testing

To test error handling:

1. **Error Boundary Testing**: 
   - Modify `getMockStories` in `lib/mock-data.ts` to throw errors:
   ```tsx
   getMockStories({ shouldError: true, errorMessage: "Test error" })
   ```

2. **Loading State Testing**:
   - Modify `getMockStories` to simulate network delay:
   ```tsx
   getMockStories({ shouldDelay: true, delayMs: 2000 })
   ``` 