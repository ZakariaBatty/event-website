"use client"

import Image from "next/image"
import { Sidebar } from "@/components/sidebar"

interface Hotel {
  name: string
  stars: number
  description: string
  address: string
  website: string
  distance: string
}

interface HotelsSidebarProps {
  isOpen: boolean
  onClose: () => void
  hotelData: Hotel[]
}

export function HotelsSidebar({ isOpen, onClose, hotelData }: HotelsSidebarProps) {
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Hébergement" width="50%">
      <div className="bg-white h-full">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {hotelData.map((hotel, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="aspect-video relative">
                <Image
                  src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(hotel.name)}`}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{hotel.name}</h3>
                  <div className="flex">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm">{hotel.description}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">{hotel.address}</p>
                <p className="text-xs sm:text-sm text-gray-500">Distance: {hotel.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  )
}
