"use client"

import { Sidebar } from "@/components/sidebar"
import { CalendarButton } from "@/components/calendar-button"
import type { CleanEventData } from "@/lib/types/api"

interface AboutSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: CleanEventData
}

export function AboutSidebar({ isOpen, onClose, eventData }: AboutSidebarProps) {
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="À propos de l'événement" width="50%">
      <div className="bg-white h-full p-6">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{eventData.description}</p>

          {eventData.organisation && (
            <>
              <h3 className="text-xl font-bold text-[#004258] mt-6 mb-3">Organisateur</h3>
              <p className="text-gray-700">{eventData.organisation.companyName}</p>
            </>
          )}

          {eventData.goals && (
            <>
              <h3 className="text-xl font-bold text-[#004258] mt-8 mb-3">Objectifs</h3>
              <p className="text-gray-700 leading-relaxed">{eventData.goals}</p>
            </>
          )}

          {eventData.themes && Array.isArray(eventData.themes) && eventData.themes.length > 0 && (
            <>
              <h3 className="text-xl font-bold text-[#004258] mt-8 mb-3">Thématiques</h3>
              <ul className="list-disc pl-5 space-y-1">
                {eventData.themes.map((theme: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {theme}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-6 text-sm">
            <div className="bg-gray-100 p-3 rounded-lg">
              <span className="font-medium">Statut:</span> {eventData.status}
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <span className="font-medium">Durée:</span> {eventData.duration.days} jour
              {eventData.duration.days > 1 ? "s" : ""}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <CalendarButton
              eventTitle={eventData.title}
              eventDescription={eventData.description || ""}
              startDate={eventData.startDate}
              endDate={eventData.endDate}
              location={eventData.location || ""}
            />
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
