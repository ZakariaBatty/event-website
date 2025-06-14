"use client"

import { Wifi } from "lucide-react"
import { Sidebar } from "@/components/sidebar"


interface NetworkSidebarProps {
  isOpen: boolean
  onClose: () => void
  networkData: any
}

export function NetworkSidebar({ isOpen, onClose, networkData }: NetworkSidebarProps) {

  const network = networkData
    .filter((qr: any) => qr.type === "WIFI")
    .map((qr: any) => {
      const match = qr.content.match(/WIFI:S:(.*?);T:.*?;P:(.*?);/);
      const ssid = match?.[1] || "";
      const password = match?.[2] || "";

      return {
        id: qr.id,
        ssid,
        password,
      };
    });
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Réseau WiFi" width="40%">
      <div className="bg-white h-full">
        <div className="p-6 text-center">
          <div className="bg-gray-100 p-8 rounded-lg">
            <Wifi className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            {network.map((item: any) => (
              <div key={item.id}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.ssid}</h3>
                <div className="bg-white p-3 rounded-md mb-4 border">
                  <p className="font-mono text-lg">{item.password}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {!networkData.available
                    ? "Le réseau est disponible dans tout l'événement"
                    : "Le réseau sera disponible prochainement"}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Instructions de connexion</h3>

            <div className="space-y-4 text-left">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900">1. Recherchez le réseau WiFi</h4>
                <p className="text-gray-700 mt-1">
                  Ouvrez les paramètres WiFi de votre appareil et recherchez le réseau "{network.map((item: any) => item.ssid).join(", ")}".
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900">2. Entrez le mot de passe</h4>
                <p className="text-gray-700 mt-1">Utilisez le mot de passe indiqué ci-dessus pour vous connecter.</p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900">3. Acceptez les conditions</h4>
                <p className="text-gray-700 mt-1">
                  Une page de connexion peut s'ouvrir. Acceptez les conditions d'utilisation pour finaliser la
                  connexion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
