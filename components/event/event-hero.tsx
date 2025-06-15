"use client"

import Image from "next/image"
import { Calendar, Mic } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { cn, formatDateRange } from "@/lib/utils"

interface EventHeroProps {
  eventData: any
  onProgramClick: () => void
  onSpeakersClick: () => void
}

export function EventHero({ eventData, onProgramClick, onSpeakersClick }: EventHeroProps) {
  return (
    <div className="pt-24 pb-10 px-4 text-center relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center mb-6">
          {/* eventData.logo ||  */}
          {
            eventData.coverImage && (
              <Image
                src={eventData.logo}
                alt="Logo"
                width={400} height={146} className="mx-auto mb-8" />
            )
          }
        </div>
        <h1 className={cn("text-4xl md:text-5xl font-bold mb-4", eventData.coverImage ? "text-white" : "text-[#004258]")}>{eventData.title}</h1>
        <p className={cn("text-xl max-w-3xl mx-auto mb-6", eventData.coverImage ? "text-gray-300" : "text-gray-600")}>{"L'Aquaculture de Demain"}</p>
        <div className="inline-block bg-white px-4 py-2 rounded-full text-amber-600 font-medium shadow-sm">
          {formatDateRange(eventData.startDate, eventData.endDate)} • {eventData.location}
        </div>

        <CountdownTimer targetData={{ startDate: eventData.startDate, coverImg: eventData.coverImage }} />

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            className="px-6 py-3 bg-[#004258] text-white rounded-lg font-medium hover:bg-[#003245] transition-colors flex items-center gap-2"
            onClick={onProgramClick}
          >
            <Calendar className="h-5 w-5" />
            Voir le programme
          </button>
          {eventData.speakers.length > 0 && (
            <button
              className="px-6 py-3 bg-white text-[#004258] border border-[#004258] rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
              onClick={onSpeakersClick}
            >
              <Mic className="h-5 w-5" />
              Découvrir les intervenants
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
