"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Clock, Users } from "lucide-react"
import { SpeakerCard } from "./event/modern-program/speaker-card"
import { CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { EventTypeSpan } from "./event/EventTypeSpan"

export function ProgramCard({
  date,
  items,
  onSpeakerClick,
}: {
  date: string
  items: any[]
  onSpeakerClick: (speaker: any) => void
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div
        className="bg-[#004258] text-white p-4 text-center text-xl font-bold flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-6"></div>
        <div>{date}</div>
        <div>{isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</div>
      </div>

      {isExpanded && (
        <div className="divide-y">
          {items.map((item, itemIndex) => (
            <div key={itemIndex} className="p-4 bg-white hover:bg-gray-50">
              <div className="flex">
                <div className="w-36 text-gray-500 font-medium pr-4 border-r">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.time}
                  </Badge>
                </div>
                <div className="flex-1 pl-4">
                  <div className="mb-2">
                    <EventTypeSpan type={item.type} />
                    <span className="font-medium">{item.description}</span>
                  </div>
                  {item.speakers && item.speakers.length > 0 && (
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Speakers ({item.speakers.length})</span>
                      </div>
                      <div className="grid gap-2">
                        {item.speakers.map((speaker: any) => (
                          <SpeakerCard key={speaker.id} speaker={speaker} onClick={onSpeakerClick} />
                        ))}
                      </div>
                    </CardContent>
                    // <div className="mt-2 pl-2 border-l-2 border-gray-200 grid gap-2">

                    //   {item.speakers.map((speaker: any, speakerIndex: number) => (
                    //     <div key={speakerIndex} className="mb-1">
                    //       <button
                    //         className="text-[#004258] hover:underline text-sm"
                    //         onClick={() =>
                    //           onSpeakerClick({
                    //             ...speaker,
                    //             eventTitle: item.description,
                    //             eventType: item.type,
                    //             eventTime: item.time,
                    //             eventDate: date,
                    //             eventAvatar: item.avatar,
                    //           })
                    //         }
                    //       >
                    //         {speaker.name}
                    //       </button>
                    //       <span className="text-gray-500 text-sm"> ({speaker.organization})</span>
                    //       {speaker.title && (
                    //         <div className="text-sm text-gray-600 ml-4 mt-1 italic">{speaker.title}</div>
                    //       )}
                    //     </div>
                    //   ))}
                    // </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

