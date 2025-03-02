"use client"

/**
 * Reusable search input component with debounced input handling
 */

import { Command } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCallback, useState, useEffect } from "react"
import { debounce } from "@/lib/utils/performance"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceTime?: number
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search...",
  debounceTime = 300
}: SearchInputProps) {
  // Local state to immediately update the input while debouncing the parent update
  const [localValue, setLocalValue] = useState(value)
  
  // Update local value when parent value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])
  
  // Create debounced handler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    debounce((newValue: string) => {
      onChange(newValue)
    }, debounceTime),
    [onChange, debounceTime]
  )
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue) // Update local state immediately
    debouncedOnChange(newValue) // Debounce the update to parent
  }
  
  return (
    <div className="relative">
      <Command className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input 
        value={localValue} 
        onChange={handleChange} 
        placeholder={placeholder} 
        className="pl-9" 
        aria-label="Search"
      />
    </div>
  )
}

