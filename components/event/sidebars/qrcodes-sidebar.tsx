"use client"

import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { QRCodeCard, QRCodeDetailCard } from "@/components/qr-code-card"
import { QRCodeView } from "../dr-code-card"

interface QRCodesSidebarProps {
  isOpen: boolean
  onClose: () => void
  eventData: any
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
}: QRCodesSidebarProps) {

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={showDetail ? (showFloorPlan ? "Plan du lieu" : selectedItem?.name) : "QR Codes"}
      width="60%"
      showBackButton={showDetail}
      onBack={onBack}
    >
      <div className="bg-gray-50 p-4 border-t">
        <p className="text-sm text-center text-gray-600">
          Scannez ce QR code avec votre appareil mobile pour accéder au document
        </p>
      </div>
      <div className="bg-white h-full p-4 sm:p-6">
        <QRCodeView qrCodes={eventData.qrCodes} />
      </div>
    </Sidebar>
  )
}
