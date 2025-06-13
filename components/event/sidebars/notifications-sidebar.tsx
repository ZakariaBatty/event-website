"use client"

import { Bell } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

interface Notification {
  id: number
  title: string
  message: string
  date: string
  read: boolean
}

interface NotificationsSidebarProps {
  isOpen: boolean
  onClose: () => void
  notificationsData: Notification[]
}

export function NotificationsSidebar({ isOpen, onClose, notificationsData }: NotificationsSidebarProps) {
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Notifications" width="40%">
      <div className="bg-white h-full">
        <div className="divide-y">
          {notificationsData.map((notification, index) => (
            <div
              key={index}
              className={`p-4 ${notification.read ? "opacity-70" : ""} hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${notification.read ? "bg-gray-200" : "bg-blue-100"}`}>
                  <Bell className={`w-5 h-5 ${notification.read ? "text-gray-500" : "text-blue-600"}`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  )
}
