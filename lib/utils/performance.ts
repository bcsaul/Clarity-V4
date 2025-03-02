/**
 * Performance monitoring utilities for ClarityNews
 * Provides tools to measure and optimize client-side performance
 */

import { useEffect, useRef } from 'react';

/**
 * Metrics for web vitals and performance tracking
 */
export type PerformanceMetrics = {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTI?: number; // Time to Interactive
  loadTime?: number; // Page load time
  resourcesCount?: number; // Number of resources loaded
  resourcesSize?: number; // Total size of resources loaded in KB
};

/**
 * Hook to track component render performance
 * @param componentName - Name of the component to track
 */
export function useRenderPerformance(componentName: string) {
  const startTime = useRef(performance.now());

  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTime.current;
    
    // Only log in development or if explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING === 'true') {
      console.log(`[Performance] ${componentName} rendered in ${duration.toFixed(2)}ms`);
    }
    
    // Report to analytics in production
    if (process.env.NODE_ENV === 'production' && window.gtag) {
      window.gtag('event', 'performance', {
        'event_category': 'component_render',
        'event_label': componentName,
        'value': Math.round(duration)
      });
    }
    
    return () => {
      startTime.current = performance.now();
    };
  }, [componentName]);
}

/**
 * Collect current performance metrics
 * @returns Object containing current performance metrics
 */
export function collectPerformanceMetrics(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {};
  
  // Use Performance API if available
  if (typeof performance !== 'undefined') {
    const entries = performance.getEntriesByType('navigation');
    
    if (entries.length > 0) {
      const navEntry = entries[0] as PerformanceNavigationTiming;
      metrics.loadTime = navEntry.loadEventEnd - navEntry.startTime;
    }
    
    // Resource metrics
    const resources = performance.getEntriesByType('resource');
    metrics.resourcesCount = resources.length;
    metrics.resourcesSize = resources.reduce((total, resource) => {
      return total + (resource as PerformanceResourceTiming).encodedBodySize;
    }, 0) / 1024; // Convert to KB
  }
  
  // Web Vitals if available
  if (typeof window !== 'undefined' && 'webVitals' in window) {
    // @ts-ignore - Web Vitals might be loaded as a global
    const webVitals = window.webVitals;
    if (webVitals) {
      metrics.FCP = webVitals.FCP;
      metrics.LCP = webVitals.LCP;
      metrics.FID = webVitals.FID;
      metrics.CLS = webVitals.CLS;
      metrics.TTI = webVitals.TTI;
    }
  }
  
  return metrics;
}

/**
 * Image optimization helper - generates optimal srcSet for responsive images
 * @param basePath - Base path of the image
 * @param extension - Image file extension
 * @returns Object with src and srcSet attributes
 */
export function generateResponsiveImageSrc(basePath: string, extension: string = 'jpg') {
  const widths = [320, 480, 640, 768, 1024, 1280, 1536];
  
  // Generate srcSet for responsive images
  const srcSet = widths
    .map(width => `${basePath}-${width}.${extension} ${width}w`)
    .join(', ');
    
  return {
    src: `${basePath}-640.${extension}`,
    srcSet,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  };
}

/**
 * Resource prioritization helper - dynamically loads resources based on priority
 * @param url - URL of the resource to load
 * @param type - Type of resource (script, style, etc.)
 * @param priority - Priority level (high, medium, low)
 * @param callback - Optional callback function on load
 */
export function loadResource(
  url: string, 
  type: 'script' | 'style', 
  priority: 'high' | 'medium' | 'low' = 'medium',
  callback?: () => void
) {
  if (typeof window === 'undefined') return;
  
  // Only execute in browser environment
  if (type === 'script') {
    const script = document.createElement('script');
    script.src = url;
    script.async = priority !== 'high';
    script.defer = priority === 'low';
    
    if (callback) {
      script.onload = callback;
    }
    
    document.head.appendChild(script);
  } else if (type === 'style') {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    
    if (priority === 'high') {
      link.setAttribute('importance', 'high');
    }
    
    if (callback) {
      link.onload = callback;
    }
    
    document.head.appendChild(link);
  }
}

/**
 * Optimize rendering of heavy components with idle-time execution
 * @param callback - Function to execute during idle time
 */
export function executeWhenIdle(callback: () => void): void {
  if (typeof window === 'undefined') return;
  
  if ('requestIdleCallback' in window) {
    // @ts-ignore - TypeScript doesn't always recognize requestIdleCallback
    window.requestIdleCallback(callback);
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(callback, 1);
  }
}

/**
 * Debounce function to limit execution rate
 * Useful for performance-heavy callbacks like scroll/resize handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 100
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Simple in-memory cache implementation
 */
export class MemoryCache {
  private static cache: Map<string, { value: any; expiry: number }> = new Map();

  /**
   * Get a value from the cache
   * @param key - Cache key
   * @returns The cached value or undefined if not found or expired
   */
  static get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    
    // Return undefined if item doesn't exist or has expired
    if (!item || (item.expiry && item.expiry < Date.now())) {
      if (item) this.cache.delete(key); // Clean up expired items
      return undefined;
    }
    
    return item.value as T;
  }

  /**
   * Set a value in the cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttlMs - Time to live in milliseconds (optional)
   */
  static set<T>(key: string, value: T, ttlMs?: number): void {
    const expiry = ttlMs ? Date.now() + ttlMs : 0;
    this.cache.set(key, { value, expiry });
  }

  /**
   * Remove a value from the cache
   * @param key - Cache key
   */
  static remove(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cached values
   */
  static clear(): void {
    this.cache.clear();
  }
}

/**
 * Throttle function to limit the rate at which a function can fire
 * @param func - Function to throttle
 * @param limit - Limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Detect if the code is running in a browser environment
 * @returns True if running in a browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Detect if the device is a mobile device
 * @returns True if the device is mobile
 */
export function isMobile(): boolean {
  if (!isBrowser()) return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
} 