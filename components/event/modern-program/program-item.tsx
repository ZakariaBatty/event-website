"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users } from "lucide-react"
import { SpeakerCard } from "./speaker-card"
import { EventTypeBadge } from "./event-type-badge"

interface ProgramItemProps {
  item: any
  onSpeakerClick: (speaker: any) => void
}

export function ProgramItemCard({ item, onSpeakerClick }: ProgramItemProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <EventTypeBadge type={item.type} />
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {item.time}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {item.location}
              </Badge>
            </div>
            <h3 className="font-bold text-lg text-gray-900 leading-tight">{item.title}</h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>
      </CardHeader>

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
      )}
    </Card>
  )
}
