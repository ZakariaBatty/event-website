"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, User } from "lucide-react"

interface SpeakerCardProps {
  speaker: any
  onClick: (speaker: any) => void
}

export function SpeakerCard({ speaker, onClick }: SpeakerCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick(speaker)}>
      <CardContent className="!p-4 !pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={speaker.avatar || undefined} alt={speaker.name} />
            <AvatarFallback>
              {speaker.name
                .split(" ")
                .map((n: any) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 truncate">{speaker.name}</h4>
            <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              <User className="h-3 w-3" />
              {speaker.title}
            </p>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {speaker.organization}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
