"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"
import { Sidebar } from "@/components/sidebar"


interface LocationSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: any
}

export function LocationSidebar({ isOpen, onClose, eventData }: LocationSidebarProps) {
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Lieu de l'événement" width="50%">
      <div className="bg-white h-full">
        <div className="aspect-video relative">
          <Image src="/placeholder.svg?height=400&width=800&text=Map" alt="Map" fill className="object-cover" />
        </div>

        <div className="p-6">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{eventData.title}</h3>
            <p className="text-gray-700 mb-4">{eventData.location}</p>
            {eventData.country && <p className="text-gray-600 text-sm mb-4">Pays: {eventData.country.name}</p>}
            <div className="flex flex-wrap gap-3">
              {eventData.linkMap && (
                <a
                  href={eventData.linkMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#004258] text-white rounded-lg hover:bg-[#003245] transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Voir sur la carte
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
