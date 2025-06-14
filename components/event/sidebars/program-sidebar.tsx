"use client"

import { useState, useCallback } from "react"
import { Download } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { ProgramCard } from "@/components/program-card"
import { CalendarButton } from "@/components/calendar-button"
import { formatDateRange } from "@/lib/utils"

interface ProgramSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: any
  onSpeakerClick: (speaker: any) => void
}

export function ProgramSidebar({ isOpen, onClose, eventData, onSpeakerClick }: ProgramSidebarProps) {
  const [filteredProgram, setFilteredProgram] = useState(eventData.programme)

  const handleFilterProgram = useCallback((filtered: any) => {
    setFilteredProgram(filtered)
  }, [])

  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Programme de l'événement" width="70%">
      <div className="bg-[#f5f9ff] min-h-full">
        <div className="text-center py-6 bg-white border-b">
          <h2 className="text-2xl font-bold text-[#004258]">{eventData.title}</h2>
          <p className="text-amber-600 mt-2">
            {formatDateRange(eventData.startDate, eventData.endDate)}
          </p>
          <p className="text-gray-700">- {eventData.location} -</p>
        </div>

        <div className="p-4 pt-4">
          {filteredProgram.map((day: any, dayIndex: any) => (
            <ProgramCard key={dayIndex} date={day.date} items={day.items} onSpeakerClick={onSpeakerClick} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
}
