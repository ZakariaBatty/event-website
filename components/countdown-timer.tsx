"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function CountdownTimer({ targetData }: { targetData: { startDate: string; coverImg: string | null } }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const target = new Date(targetData.startDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetData])

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <p className={cn("text-lg font-medium ", targetData.coverImg ? "text-white" : "text-[#004258]")}>L'événement a commencé!</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center gap-4 py-4">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-[#004258] w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm">
          {timeLeft.days}
        </div>
        <span className={cn("text-sm mt-1", targetData.coverImg ? "text-white" : "text-[#004258]")}>Jours</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-[#004258] w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm">
          {timeLeft.hours}
        </div>
        <span className={cn("text-sm mt-1", targetData.coverImg ? "text-white" : "text-[#004258]")}>Heures</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-[#004258] w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm">
          {timeLeft.minutes}
        </div>
        <span className={cn("text-sm mt-1", targetData.coverImg ? "text-white" : "text-[#004258]")}>Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-[#004258] w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm">
          {timeLeft.seconds}
        </div>
        <span className={cn("text-sm mt-1", targetData.coverImg ? "text-white" : "text-[#004258]")}>Secondes</span>
      </div>
    </div>
  )
}

