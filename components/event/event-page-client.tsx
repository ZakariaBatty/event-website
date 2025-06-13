"use client"

import { useState } from "react"
import { FloatingActionButton } from "@/components/floating-action-button"
import { AnimatedBackground } from "@/components/animated-background"
import { EventHeader } from "@/components/event/event-header"
import { EventHero } from "@/components/event/event-hero"
import { EventCards } from "@/components/event/event-cards"
import { ProgramSidebar } from "@/components/event/sidebars/program-sidebar"
import { SpeakersSidebar } from "@/components/event/sidebars/speakers-sidebar"
import { LocationSidebar } from "@/components/event/sidebars/location-sidebar"
import { AboutSidebar } from "@/components/event/sidebars/about-sidebar"
import { NetworkSidebar } from "@/components/event/sidebars/network-sidebar"
import { PartnersSidebar } from "@/components/event/sidebars/partners-sidebar"
import { NotificationsSidebar } from "@/components/event/sidebars/notifications-sidebar"
import { HotelsSidebar } from "@/components/event/sidebars/hotels-sidebar"
import { QRCodesSidebar } from "@/components/event/sidebars/qrcodes-sidebar"

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
  const [isScrolled, setIsScrolled] = useState(false)

  // Create mock data for sections not in the API
  const networkData = {
    name: "EventWiFi",
    password: "Event2025",
    available: true,
  }

  const hotelData = [
    {
      name: "Hôtel près de l'événement",
      stars: 4,
      description: "Hôtel recommandé proche du lieu de l'événement",
      address: eventData.location || "Lieu de l'événement",
      website: "#",
      distance: "1 km de l'événement",
    },
  ]

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

  const handleScroll = (scrolled: boolean) => {
    setIsScrolled(scrolled)
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      <AnimatedBackground />

      <EventHeader
        eventData={eventData}
        isScrolled={isScrolled}
        onScroll={handleScroll}
        onCardClick={handleCardClick}
      />

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

      {/* <SpeakersSidebar
        isOpen={activeSidebar === "speakers"}
        onClose={closeSidebar}
        eventData={eventData}
        showDetail={showSpeakerDetail}
        selectedItem={selectedItem}
        onBack={handleBackFromDetail}
        onSpeakerClick={handleSpeakerClick}
      />
 */}
      {/* <LocationSidebar isOpen={activeSidebar === "location"} onClose={closeSidebar} eventData={eventData} />

      <AboutSidebar isOpen={activeSidebar === "about"} onClose={closeSidebar} eventData={eventData} />

      <NetworkSidebar isOpen={activeSidebar === "network"} onClose={closeSidebar} networkData={networkData} />

      <PartnersSidebar
        isOpen={activeSidebar === "partners"}
        onClose={closeSidebar}
        eventData={eventData}
        showDetail={showPartnerDetail}
        selectedItem={selectedItem}
        onBack={handleBackFromDetail}
        onPartnerClick={handlePartnerClick}
      /> */}

      {/* <NotificationsSidebar
        isOpen={activeSidebar === "notifications"}
        onClose={closeSidebar}
        notificationsData={notificationsData}
      />

      <HotelsSidebar isOpen={activeSidebar === "hotels"} onClose={closeSidebar} hotelData={hotelData} />

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
      /> */}
    </div>
  )
}
