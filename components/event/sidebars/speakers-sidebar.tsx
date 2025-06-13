"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { SpeakerCard } from "@/components/speaker-card"
import { SearchFilter } from "@/components/search-filter"
import type { CleanEventData } from "@/lib/types/api"

interface SpeakersSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: CleanEventData
  showDetail: boolean
  selectedItem: any
  onBack: () => void
  onSpeakerClick: (speaker: any) => void
}

export function SpeakersSidebar({
  isOpen,
  onClose,
  eventData,
  showDetail,
  selectedItem,
  onBack,
  onSpeakerClick,
}: SpeakersSidebarProps) {
  const [filteredSpeakers, setFilteredSpeakers] = useState(eventData.speakers)

  const handleFilterSpeakers = useCallback((filtered: any) => {
    setFilteredSpeakers(filtered)
  }, [])

  const speakerFilterOptions = [
    { label: "Master Class", value: "MASTER_CLASS" },
    { label: "Side Event", value: "SIDE_EVENT" },
    { label: "Showcase", value: "SHOWCASE" },
    { label: "Roundtable", value: "ROUNDTABLE" },
  ]

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={showDetail ? selectedItem?.name : "Intervenants"}
      width="50%"
      showBackButton={showDetail}
      onBack={onBack}
    >
      {!showDetail ? (
        <div className="p-4 sm:p-6 bg-[#f5f9ff]">
          <SearchFilter
            data={eventData.speakers}
            onFilter={handleFilterSpeakers}
            placeholder="Rechercher un intervenant..."
            filterOptions={speakerFilterOptions}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {filteredSpeakers.map((speaker, index) => (
              <SpeakerCard key={index} speaker={speaker} onClick={() => onSpeakerClick(speaker)} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white h-full">
          <div className="p-6">
            <div className="flex flex-col space-y-6">
              <div className="mx-auto w-48 h-48 relative overflow-hidden rounded-full shadow-lg">
                <Image
                  src={selectedItem.avatar || "/placeholder.svg?height=300&width=300"}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                <p className="text-gray-600">{selectedItem.organization}</p>
                {selectedItem.title && <p className="mt-2 text-gray-700 italic">"{selectedItem.title}"</p>}
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Biographie</h3>
                  <p className="text-gray-700 mt-2">
                    {selectedItem.bio ||
                      `Expert reconnu dans son domaine, ${selectedItem.name} apporte une expérience précieuse et des connaissances approfondies à notre événement.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}
