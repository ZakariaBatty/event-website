"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { SpeakerCard } from "@/components/speaker-card"
import { AnimatedBackground } from "@/components/animated-background"
import { SearchFilter } from "@/components/search-filter"
import { CalendarButton } from "@/components/calendar-button"
import { CountdownTimer } from "@/components/countdown-timer"
import { FloatingActionButton } from "@/components/floating-action-button"
import { ProgramCard } from "@/components/program-card"
import { QRCodeCard, QRCodeDetailCard } from "@/components/qr-code-card"
import { Calendar, MapPin, Info, Wifi, Users, Bell, Hotel, Mic, Download, QrCode } from "lucide-react"

interface EventPageClientProps {
  eventData: any
}

export default function EventPageClient({ eventData }: EventPageClientProps) {
  // UI states
  const [activeSidebar, setActiveSidebar] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showSpeakerDetail, setShowSpeakerDetail] = useState(false)
  const [showPartnerDetail, setShowPartnerDetail] = useState(false)
  const [showQRCodeDetail, setShowQRCodeDetail] = useState(false)
  const [showFloorPlan, setShowFloorPlan] = useState(false)
  const [filteredSpeakers, setFilteredSpeakers] = useState(eventData.speakers)
  const [filteredProgram, setFilteredProgram] = useState(eventData.programme)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleCardClick = (type: string, item: any = null) => {
    setActiveSidebar(type)
    setSelectedItem(item)
    setShowSpeakerDetail(false)
    setShowPartnerDetail(false)
    setShowQRCodeDetail(false)
    setShowFloorPlan(false)
  }

  const closeSidebar = () => {
    setActiveSidebar(null)
    setSelectedItem(null)
    setShowSpeakerDetail(false)
    setShowPartnerDetail(false)
    setShowQRCodeDetail(false)
    setShowFloorPlan(false)
  }

  const handleSpeakerClick = (speaker: any) => {
    setSelectedItem(speaker)
    if (activeSidebar !== "speakers") {
      setActiveSidebar("speakers")
    }
    setShowSpeakerDetail(true)
  }

  const handlePartnerClick = (participant: any) => {
    setSelectedItem(participant)
    setShowPartnerDetail(true)
  }

  const handleQRCodeClick = (qrCode: any) => {
    setSelectedItem(qrCode)
    setShowQRCodeDetail(true)
  }

  const handleFloorPlanClick = () => {
    setShowFloorPlan(true)
  }

  const handleBackFromDetail = () => {
    setShowSpeakerDetail(false)
    setShowPartnerDetail(false)
    setShowQRCodeDetail(false)
    setShowFloorPlan(false)
  }

  const handleFilterSpeakers = useCallback((filtered: any) => {
    setFilteredSpeakers(filtered)
  }, [])

  const handleFilterProgram = useCallback((filtered: any) => {
    setFilteredProgram(filtered)
  }, [])


  // Create notifications from event data (mock for now)
  const notificationsData = [
    {
      id: 1,
      title: "Ouverture de l'événement",
      message: `${eventData.title} commence le ${new Date(eventData.startDate).toLocaleDateString("fr-FR")}`,
      date: new Date(eventData.startDate).toLocaleDateString("fr-FR"),
      read: false,
    },
  ]

  // Create network data (mock for now)
  const networkData = {
    name: "EventWiFi",
    password: "Event2025",
    available: true,
  }


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

  ]

  const speakerFilterOptions = [
    { label: "Master Class", value: "MASTER_CLASS" },
    { label: "Side Event", value: "SIDE_EVENT" },
    { label: "Showcase", value: "SHOWCASE" },
    { label: "Roundtable", value: "ROUNDTABLE" },
  ]

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      <AnimatedBackground />

      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "py-4"
          }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={eventData.logo || "/placeholder.svg?height=40&width=40&text=Logo"}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1
              className={`font-bold text-[#004258] transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"}`}
            >
              {eventData.title}
            </h1>
          </div>
          <div className="hidden md:flex gap-6">
            {cardItems.slice(0, 4).map((item, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(item.type)}
                className="text-sm font-medium text-gray-700 hover:text-[#004258] transition-colors"
              >
                {item.title}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-[#004258] text-white rounded-lg text-sm font-medium hover:bg-[#003245] transition-colors"
            onClick={() => handleCardClick("program")}
          >
            Voir le programme
          </button>
        </div>
      </header>

      <div className="pt-24 pb-10 px-4 text-center relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center mb-6">
            <Image
              src={eventData.logo || "/placeholder.svg?height=120&width=120&text=Logo"}
              alt="Logo"
              width={120}
              height={120}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#004258] mb-4">{eventData.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{eventData.description}</p>
          <div className="inline-block bg-white px-4 py-2 rounded-full text-amber-600 font-medium shadow-sm">
            {new Date(eventData.startDate).toLocaleDateString("fr-FR")} -{" "}
            {new Date(eventData.endDate).toLocaleDateString("fr-FR")} • {eventData.location}
          </div>

          <CountdownTimer targetDate={eventData.startDate} />

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              className="px-6 py-3 bg-[#004258] text-white rounded-lg font-medium hover:bg-[#003245] transition-colors flex items-center gap-2"
              onClick={() => handleCardClick("program")}
            >
              <Calendar className="h-5 w-5" />
              Voir le programme
            </button>
            {eventData.speakers.length > 0 && (
              <button
                className="px-6 py-3 bg-white text-[#004258] border border-[#004258] rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                onClick={() => handleCardClick("speakers")}
              >
                <Mic className="h-5 w-5" />
                Découvrir les intervenants
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
        <h2 className="text-2xl font-bold text-[#004258] mb-6 text-center">Accès rapide</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cardItems
            .filter((item) => item.show)
            .map((item, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(item.type)}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 hidden sm:block">{item.description}</p>
                </div>
              </div>
            ))}
        </div>
      </main>

      <FloatingActionButton onSelect={(type) => handleCardClick(type)} />

      {/* Program Sidebar */}
      <Sidebar isOpen={activeSidebar === "program"} onClose={closeSidebar} title="Programme de l'événement" width="60%">
        <div className="bg-[#f5f9ff] min-h-full">
          <div className="text-center py-6 bg-white border-b">
            <h2 className="text-2xl font-bold text-[#004258]">{eventData.title}</h2>
            <p className="text-amber-600 mt-2">
              {new Date(eventData.startDate).toLocaleDateString("fr-FR")} -{" "}
              {new Date(eventData.endDate).toLocaleDateString("fr-FR")}
            </p>
            <p className="text-gray-700">- {eventData.location} -</p>
          </div>

          <div className="p-4">
            {filteredProgram.map((day: any, dayIndex: any) => (
              <ProgramCard key={dayIndex} date={day.date} items={day.items} onSpeakerClick={handleSpeakerClick} />
            ))}
          </div>

        </div>
      </Sidebar>

      {/* Speakers Sidebar */}

      {/* Location Sidebar */}

      {/* About Sidebar */}

      {/* Network Sidebar */}

      {/* Partners/Participants Sidebar */}

      {/* Notifications Sidebar */}

      {/* Hotels Sidebar */}

      {/* QR Codes Sidebar */}
    </div>
  )
}
