import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#004258]" />
        <p className="text-gray-600">Chargement de l'événement...</p>
      </div>
    </div>
  )
}
