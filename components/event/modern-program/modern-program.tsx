"use client"

import { useState } from "react"
import { SpeakerModal } from "./speaker-modal"
import { ProgramDayCard } from "./program-day"
import { Sidebar } from "@/components/sidebar"
import { formatDateRange } from "@/lib/utils"

interface ProgramSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: any
}

export default function ModernProgram({ isOpen, onClose, eventData }: ProgramSidebarProps) {

  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [eventDetails, setEventDetails] = useState<any>(null)

  const handleSpeakerClick = (speaker: any, details?: any) => {
    setSelectedSpeaker(speaker)
    setEventDetails(details)
  }

  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Programme de l'événement" width="70%">

      <div className="min-h-screen bg-gray-50">

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {eventData.programme.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No sessions found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="text-center py-6 bg-white border-b">
                <h2 className="text-2xl font-bold text-[#004258]">{eventData.title}</h2>
                <p className="text-amber-600 mt-2">
                  {formatDateRange(eventData.startDate, eventData.endDate)}
                </p>
                <p className="text-gray-700">- {eventData.location} -</p>
              </div>
              <div className="space-y-6">
                {eventData.programme.map((programDay: any, index: any) => (
                  <ProgramDayCard
                    key={index}
                    programDay={programDay}
                    onSpeakerClick={handleSpeakerClick}
                    defaultExpanded={true}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Speaker Modal */}
        <SpeakerModal
          speaker={selectedSpeaker}
          isOpen={!!selectedSpeaker}
          onClose={() => {
            setSelectedSpeaker(null)
            setEventDetails(null)
          }}
          eventDetails={eventDetails}
        />
      </div>
    </Sidebar>

  )
}
