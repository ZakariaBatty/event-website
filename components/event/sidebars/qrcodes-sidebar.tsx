"use client"

import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { QRCodeCard, QRCodeDetailCard } from "@/components/qr-code-card"
import type { CleanEventData } from "@/lib/types/api"

interface QRCodesSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: CleanEventData
  showDetail: boolean
  showFloorPlan: boolean
  selectedItem: any
  onBack: () => void
  onQRCodeClick: (qrCode: any) => void
  onFloorPlanClick: () => void
}

export function QRCodesSidebar({
  isOpen,
  onClose,
  eventData,
  showDetail,
  showFloorPlan,
  selectedItem,
  onBack,
  onQRCodeClick,
  onFloorPlanClick,
}: QRCodesSidebarProps) {
  // Mock floor plan data
  const floorPlanData = {
    title: "Plan du lieu",
    imageUrl: "/placeholder.svg?height=800&width=1200&text=Plan+du+Lieu",
    zones: [
      {
        name: "Zone A - Conférences",
        description: "Salles de conférences principales",
        color: "#3B82F6",
      },
      {
        name: "Zone B - Exposants",
        description: "Stands des exposants",
        color: "#10B981",
      },
    ],
    rooms: [
      {
        name: "Salle Principale",
        capacity: "200 personnes",
        location: "Zone A",
      },
    ],
    facilities: ["Restauration", "Toilettes", "Point information"],
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={showDetail ? (showFloorPlan ? "Plan du lieu" : selectedItem?.name) : "QR Codes"}
      width="60%"
      showBackButton={showDetail}
      onBack={onBack}
    >
      {!showDetail ? (
        <div className="bg-white h-full p-4 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#004258] mb-4">QR Codes de l'événement</h3>
            <p className="text-gray-600 mb-4">
              Scannez ces QR codes avec votre appareil mobile pour accéder aux informations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {eventData.qrCodes.map((qrCode, index) => (
                <QRCodeCard key={index} qrCode={qrCode} onClick={() => onQRCodeClick(qrCode)} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-[#004258] mb-4">Plan du lieu</h3>
            <p className="text-gray-600 mb-4">Consultez le plan pour vous orienter facilement.</p>

            <div
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
              onClick={onFloorPlanClick}
            >
              <div className="aspect-video relative overflow-hidden rounded-md mb-3">
                <Image
                  src={floorPlanData.imageUrl || "/placeholder.svg"}
                  alt="Plan du lieu"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-900 text-center">{floorPlanData.title}</h3>
              <p className="text-xs text-gray-600 text-center mt-1">Cliquez pour agrandir</p>
            </div>
          </div>
        </div>
      ) : showFloorPlan ? (
        <div className="bg-white h-full p-4 sm:p-6">
          <div className="mb-6">
            <div className="aspect-video relative overflow-hidden rounded-lg shadow-md mb-6">
              <Image
                src={floorPlanData.imageUrl || "/placeholder.svg"}
                alt="Plan du lieu"
                fill
                className="object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-[#004258] mb-4">Zones</h3>
                <div className="space-y-4">
                  {floorPlanData.zones.map((zone, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border-l-4"
                      style={{ borderColor: zone.color }}
                    >
                      <h4 className="font-medium text-gray-900">{zone.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{zone.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#004258] mb-4">Salles</h3>
                <div className="space-y-3">
                  {floorPlanData.rooms.map((room, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <p className="font-medium text-gray-800">{room.name}</p>
                      <p className="text-gray-600 text-xs">
                        {room.location} • {room.capacity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white h-full p-4 sm:p-6">
          <div className="max-w-md mx-auto">
            <QRCodeDetailCard qrCode={selectedItem} />
          </div>
        </div>
      )}
    </Sidebar>
  )
}
