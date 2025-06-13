import Link from "next/link"
import { Info } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-red-500 mb-4">
          <Info className="w-12 h-12 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Événement non trouvé</h1>
        <p className="text-gray-600 mb-4">L'événement que vous recherchez n'existe pas ou n'est plus disponible.</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-[#004258] text-white rounded-lg hover:bg-[#003245] transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
