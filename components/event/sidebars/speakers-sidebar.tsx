"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { SpeakerCard } from "@/components/speaker-card"
import { SearchFilter } from "@/components/search-filter"
import { Clock, MapPin } from "lucide-react"

interface SpeakersSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: any
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
      width="70%"
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
            {filteredSpeakers.map((speaker: any, index: any) => (
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

                <div>
                  <h3 className="text-lg font-medium">Sessions</h3>
                  {selectedItem.sideEventItem && selectedItem.sideEventItem.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {selectedItem.sideEventItem.map((item: any) => {
                        return (
                          <div key={item.id} className="border rounded-md p-3">
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  {item.type === "MASTER_CLASS" && <span className="text-blue-500">MASTER CLASS:</span>}
                                  {item.type === "SIDE_EVENT" && <span className="text-gray-700">SIDE EVENT:</span>}
                                  {item.type === "NETWORKING" && <span className="text-green-600">NETWORKING:</span>}
                                  {item.type === "SHOWCASE" && <span className="text-amber-600">SHOWCASE:</span>}
                                  {item.type === "ROUNDTABLE" && <span className="text-purple-600">ROUNDTABLE:</span>}
                                  {item.type === "WORKSHOP" && <span className="text-amber-600">WORKSHOP:</span>}
                                  {item.type === "KEYNOTE" && <span className="text-red-600">KEYNOTE:</span>}
                                  {item.type === "PANEL" && <span className="text-yellow-600">PANEL:</span>}
                                  <div className="text-base font-semibold">{item.title}</div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{item.time || "Time not set"}</span>
                                {item.location && (
                                  <>
                                    <MapPin className="h-4 w-4" />
                                    <span>{item.location}</span>
                                  </>
                                )}
                              </div>
                              <p className="mt-2 text-sm">{item.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </ul>
                  ) : (
                    <p className="mt-2 text-gray-500">No sessions assigned</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </Sidebar >
  )
}
