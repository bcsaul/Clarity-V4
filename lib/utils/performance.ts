/**
 * Performance utilities for ClarityNews
 */

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
 * Debounce function to limit the rate at which a function can fire
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
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