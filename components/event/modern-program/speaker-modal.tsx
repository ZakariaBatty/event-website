"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, Clock, User } from "lucide-react"

interface SpeakerModalProps {
  speaker: any | null
  isOpen: boolean
  onClose: () => void
  eventDetails?: {
    eventTitle: string
    eventType: string
    eventTime: string
    eventDate: string
  }
}

export function SpeakerModal({ speaker, isOpen, onClose, eventDetails }: SpeakerModalProps) {
  if (!speaker) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={speaker.avatar || undefined} alt={speaker.name} />
              <AvatarFallback className="text-lg">
                {speaker.name
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">{speaker.name}</DialogTitle>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{speaker.title}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>{speaker.organization}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {eventDetails && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Speaking at:</h3>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-900">{eventDetails.eventTitle}</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    {eventDetails.eventDate}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    {eventDetails.eventTime}
                  </Badge>
                  <Badge variant="secondary">{eventDetails.eventType}</Badge>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Biography</h3>
            <div className="prose prose-sm max-w-none">
              {speaker.bio.split("\n").map((paragraph: any, index: any) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
