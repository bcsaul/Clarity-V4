/**
 * Filter component for story categories
 */

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { Category, CategoryId } from "@/lib/types"

interface CategoryFilterProps {
  categories: Category[]
  selected: CategoryId
  onSelect: (category: CategoryId) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 p-1">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selected === category.id ? "default" : "outline"}
              className={`flex items-center gap-2 ${selected === category.id ? category.color + " text-white" : ""}`}
              onClick={() => onSelect(category.id)}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </Button>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

