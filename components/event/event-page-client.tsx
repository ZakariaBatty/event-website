"use client"

import { useState } from "react"
import { FloatingActionButton } from "@/components/floating-action-button"
import { AnimatedBackground } from "@/components/animated-background"
import { EventHeader } from "@/components/event/event-header"
import { EventHero } from "@/components/event/event-hero"
import { EventCards } from "@/components/event/event-cards"
import { ProgramSidebar } from "@/components/event/sidebars/program-sidebar"
import { SpeakersSidebar } from "@/components/event/sidebars/speakers-sidebar"
import { AboutSidebar } from "@/components/event/sidebars/about-sidebar"
import { NetworkSidebar } from "@/components/event/sidebars/network-sidebar"
import { NotificationsSidebar } from "@/components/event/sidebars/notifications-sidebar"
import { QRCodesSidebar } from "@/components/event/sidebars/qrcodes-sidebar"
import ModernProgram from "./modern-program/modern-program"

interface EventPageClientProps {
  eventData: any
}

export default function EventPageClient({ eventData }: EventPageClientProps) {
  // UI states
  const [activeSidebar, setActiveSidebar] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showSpeakerDetail, setShowSpeakerDetail] = useState(false)
  const [showQRCodeDetail, setShowQRCodeDetail] = useState(false)
  const [showFloorPlan, setShowFloorPlan] = useState(false)



  const notificationsData = [
    {
      id: 1,
      title: "Ouverture de l'événement",
      message: `${eventData.title} commence le ${new Date(eventData.startDate).toLocaleDateString("fr-FR")}`,
      date: new Date(eventData.startDate).toLocaleDateString("fr-FR"),
      read: false,
    },
  ]

  const handleCardClick = (type: string, item: any = null) => {
    setActiveSidebar(type)
    setSelectedItem(item)
    setShowSpeakerDetail(false)
    setShowQRCodeDetail(false)
    setShowFloorPlan(false)
  }

  const closeSidebar = () => {
    setActiveSidebar(null)
    setSelectedItem(null)
    setShowSpeakerDetail(false)
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

  const handleQRCodeClick = (qrCode: any) => {
    setSelectedItem(qrCode)
    setShowQRCodeDetail(true)
  }

  const handleFloorPlanClick = () => {
    setShowFloorPlan(true)
  }

  const handleBackFromDetail = () => {
    setShowSpeakerDetail(false)
    setShowQRCodeDetail(false)
    setShowFloorPlan(false)
  }


  return (
    <div className="min-h-screen bg-[#f5f9ff]"
      style={{
        backgroundImage: `url(${eventData.coverImage || null})`,
      }}
    >
      <AnimatedBackground />
      {/* 
      <EventHeader
        eventData={eventData}
        isScrolled={isScrolled}
        onScroll={handleScroll}
        onCardClick={handleCardClick}
      /> */}

      <EventHero
        eventData={eventData}
        onProgramClick={() => handleCardClick("program")}
        onSpeakersClick={() => handleCardClick("speakers")}
      />

      <EventCards eventData={eventData} onCardClick={handleCardClick} />

      <FloatingActionButton onSelect={(type) => handleCardClick(type)} />

      {/* Sidebars */}
      <ProgramSidebar
        isOpen={activeSidebar === "program"}
        onClose={closeSidebar}
        eventData={eventData}
        onSpeakerClick={handleSpeakerClick}
      />
      {/* <ModernProgram
        isOpen={activeSidebar === "program"}
        onClose={closeSidebar}
        eventData={eventData}
      /> */}

      <SpeakersSidebar
        isOpen={activeSidebar === "speakers"}
        onClose={closeSidebar}
        eventData={eventData}
        showDetail={showSpeakerDetail}
        selectedItem={selectedItem}
        onBack={handleBackFromDetail}
        onSpeakerClick={handleSpeakerClick}
      />

      {/* <LocationSidebar isOpen={activeSidebar === "location"} onClose={closeSidebar} eventData={eventData} /> */}

      <AboutSidebar isOpen={activeSidebar === "about"} onClose={closeSidebar} eventData={eventData} />

      <NetworkSidebar isOpen={activeSidebar === "network"} onClose={closeSidebar} networkData={eventData.qrCodes} />

      {/* <PartnersSidebar
        isOpen={activeSidebar === "partners"}
        onClose={closeSidebar}
        eventData={eventData}
        showDetail={showPartnerDetail}
        selectedItem={selectedItem}
        onBack={handleBackFromDetail}
        onPartnerClick={handlePartnerClick}
      /> */}

      <NotificationsSidebar
        isOpen={activeSidebar === "notifications"}
        onClose={closeSidebar}
        notificationsData={notificationsData}
      />

      {/* <HotelsSidebar isOpen={activeSidebar === "hotels"} onClose={closeSidebar} hotelData={hotelData} /> */}

      <QRCodesSidebar
        isOpen={activeSidebar === "qrcodes"}
        onClose={closeSidebar}
        eventData={eventData}
        showDetail={showQRCodeDetail}
        showFloorPlan={showFloorPlan}
        selectedItem={selectedItem}
        onBack={handleBackFromDetail}
        onQRCodeClick={handleQRCodeClick}
        onFloorPlanClick={handleFloorPlanClick}
      />
    </div>
  )
}
