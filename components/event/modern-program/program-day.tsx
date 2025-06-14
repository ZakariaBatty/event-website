"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Calendar } from "lucide-react"
import { ProgramItemCard } from "./program-item"

interface ProgramDayProps {
  programDay: any
  onSpeakerClick: (speaker: any) => void
  defaultExpanded?: boolean
}

export function ProgramDayCard({ programDay, onSpeakerClick, defaultExpanded = true }: ProgramDayProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className="mb-6 overflow-hidden shadow-sm">
      <CardHeader className="bg-gradient-to-r from-[#004258] to-[#005f73] text-white p-0">
        <Button
          variant="ghost"
          className="w-full h-auto p-6 text-white hover:bg-white/10 rounded-none justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5" />
            <CardTitle className="text-xl font-bold">{programDay.date}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-90">{programDay.items.length} events</span>
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-6 pt-6 bg-gray-50/50">
          <div className="space-y-4">
            {programDay.items.map((item: any) => (
              <ProgramItemCard key={item.id} item={item} onSpeakerClick={onSpeakerClick} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
