"use client"

import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import type { CleanEventData } from "@/lib/types/api"

interface PartnersSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: CleanEventData
  showDetail: boolean
  selectedItem: any
  onBack: () => void
  onPartnerClick: (partner: any) => void
}

export function PartnersSidebar({
  isOpen,
  onClose,
  eventData,
  showDetail,
  selectedItem,
  onBack,
  onPartnerClick,
}: PartnersSidebarProps) {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={showDetail ? selectedItem?.name : "Participants & Partenaires"}
      width="50%"
      showBackButton={showDetail}
      onBack={onBack}
    >
      {!showDetail ? (
        <div className="bg-white h-full p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {eventData.participants.map((participant, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                onClick={() => onPartnerClick(participant)}
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 relative mb-3 sm:mb-4">
                  <Image
                    src={participant.logo || "/placeholder.svg?height=100&width=100"}
                    alt={participant.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-center font-medium text-sm sm:text-base text-gray-900">{participant.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{participant.type}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white h-full p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-40 h-40 relative mb-4">
              <Image
                src={selectedItem.logo || "/placeholder.svg?height=200&width=200"}
                alt={selectedItem.name}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
            <p className="text-gray-600">{selectedItem.company}</p>
            <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{selectedItem.type}</span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {selectedItem.description || `${selectedItem.name} est un participant important de cet événement.`}
            </p>

            <div className="mt-6 flex justify-center">
              {selectedItem.website && (
                <a
                  href={selectedItem.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#004258] text-white rounded-lg hover:bg-[#003245] transition-colors"
                >
                  Visiter le site web
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}
