"use client"

import { useEffect } from "react"
import Image from "next/image"

interface EventHeaderProps {
  eventData: any
  isScrolled: boolean
  onScroll: (scrolled: boolean) => void
  onCardClick: (type: string) => void
}

export function EventHeader({ eventData, isScrolled, onScroll, onCardClick }: EventHeaderProps) {
  useEffect(() => {
    const handleScroll = () => {
      onScroll(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [onScroll])

  const headerItems = [
    { title: "Programme", type: "program" },
    { title: "Intervenants", type: "speakers", show: eventData.speakers.length > 0 },
    // { title: "Lieu", type: "location" },
    { title: "À propos", type: "about" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "py-4"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={"/placeholder.svg?height=40&width=40&text=Logo"}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className={`font-bold text-[#004258] transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"}`}>
            {eventData.title}
          </h1>
        </div>
        <div className="hidden md:flex gap-6">
          {headerItems
            .filter((item) => item.show !== false)
            .map((item, index) => (
              <button
                key={index}
                onClick={() => onCardClick(item.type)}
                className="text-sm font-medium text-gray-700 hover:text-[#004258] transition-colors"
              >
                {item.title}
              </button>
            ))}
        </div>
        <button
          className="px-4 py-2 bg-[#004258] text-white rounded-lg text-sm font-medium hover:bg-[#003245] transition-colors"
          onClick={() => onCardClick("program")}
        >
          Voir le programme
        </button>
      </div>
    </header>
  )
}
