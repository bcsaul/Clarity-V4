/**
 * Date navigation component
 */

import { format, subDays, addDays } from "date-fns"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface DateNavigationProps {
  date: Date
  onDateChange: (date: Date) => void
}

export function DateNavigation({ date, onDateChange }: DateNavigationProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={() => onDateChange(subDays(date, 1))}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
            <Calendar className="mr-2 h-4 w-4" />
            {format(date, "MMMM d, yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={(date) => date && onDateChange(date)}
            disabled={(date) => date > new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onDateChange(addDays(date, 1))}
        disabled={date >= new Date()}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

