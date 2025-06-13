"use client"

import { Wifi } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

interface NetworkData {
  name: string
  password: string
  available: boolean
}

interface NetworkSidebarProps {
  isOpen: boolean
  onClose: () => void
  networkData: NetworkData
}

export function NetworkSidebar({ isOpen, onClose, networkData }: NetworkSidebarProps) {
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Réseau WiFi" width="40%">
      <div className="bg-white h-full">
        <div className="p-6 text-center">
          <div className="bg-gray-100 p-8 rounded-lg">
            <Wifi className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{networkData.name}</h3>
            <div className="bg-white p-3 rounded-md mb-4 border">
              <p className="font-mono text-lg">{networkData.password}</p>
            </div>
            <p className="text-sm text-gray-600">
              {networkData.available
                ? "Le réseau est disponible dans tout l'événement"
                : "Le réseau sera disponible prochainement"}
            </p>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
