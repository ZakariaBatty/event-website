"use client"

import { Calendar, MapPin, Info, Wifi, Users, Bell, Hotel, Mic, QrCode } from "lucide-react"

interface EventCardsProps {
  eventData: any
  onCardClick: (type: string) => void
}

export function EventCards({ eventData, onCardClick }: EventCardsProps) {
  // Transform participants into partners format for compatibility

  const cardItems = [
    {
      title: "Programme",
      description: "Consultez le programme complet de l'événement",
      icon: <Calendar className="w-8 h-8 text-blue-500" />,
      type: "program",
      show: true,
    },
    {
      title: "Intervenants",
      description: "Découvrez les experts et conférenciers",
      icon: <Mic className="w-8 h-8 text-[#004258]" />,
      type: "speakers",
      show: eventData.speakers.length > 0,
    },
    {
      title: "QR Codes",
      description: "Scannez pour accéder aux documents",
      icon: <QrCode className="w-8 h-8 text-[#004258]" />,
      type: "qrcodes",
      show: eventData.qrCodes.length > 0,
    },
    {
      title: "À propos",
      description: "En savoir plus sur l'événement",
      icon: <Info className="w-8 h-8 text-purple-500" />,
      type: "about",
      show: true,
    },
    {
      title: "Réseau WiFi",
      description: "Connectez-vous au réseau de l'événement",
      icon: <Wifi className="w-8 h-8 text-yellow-500" />,
      type: "network",
      show: true,
    },
    {
      title: "Notifications",
      description: "Restez informé des dernières actualités",
      icon: <Bell className="w-8 h-8 text-orange-500" />,
      type: "notifications",
      show: true,
    },

  ]

  return (
    <main className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
      <h2 className="text-2xl font-bold text-[#004258] mb-6 text-center">Accès rapide</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {cardItems
          .filter((item) => item.show)
          .map((item, index) => (
            <div
              key={index}
              onClick={() => onCardClick(item.type)}
              className="bg-white rounded-lg p-9 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-medium text-2xl text-gray-900 mb-1">{item.title}</h3>
                <p className="text-l text-gray-600  hidden sm:block">{item.description}</p>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}
