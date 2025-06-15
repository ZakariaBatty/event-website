"use client"

import { ExternalLink } from "lucide-react"
import { Card, CardTitle, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Calendar } from "../ui/calendar"
import { QRCodeSVG } from "qrcode.react"

export enum QRCodeType {
  URL = "URL",
  TEXT = "TEXT",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  SMS = "SMS",
  WIFI = "WIFI",
  VCARD = "VCARD",
}

interface QRCodeViewProps {
  qrCodes: any[]
}

export function QRCodeView({
  qrCodes,
}: QRCodeViewProps) {

  const getTypeBadgeColor = (type: QRCodeType) => {
    const colors = {
      [QRCodeType.URL]: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      [QRCodeType.TEXT]: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      [QRCodeType.EMAIL]: "bg-green-100 text-green-800 hover:bg-green-200",
      [QRCodeType.PHONE]: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      [QRCodeType.SMS]: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      [QRCodeType.WIFI]: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      [QRCodeType.VCARD]: "bg-pink-100 text-pink-800 hover:bg-pink-200",
    }
    return colors[type] || "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }

  // Function to format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Function to truncate content for display
  const truncateContent = (content: string, maxLength = 50) => {
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {qrCodes.filter(qr => qr.type !== "WIFI").length === 0 ? (
        <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No QR codes found. Create one to get started.</p>
        </div>
      ) : (
        qrCodes
          .filter(qr => qr.type !== "WIFI")
          .map((qrCode) => (
            <Card key={qrCode.id} className="overflow-hidden p-0">
              <div
                className="w-full aspect-square flex items-center justify-center"
                style={{ backgroundColor: qrCode.backgroundColor || "#FFFFFF" }}
              >
                <QRCodeSVG
                  value={qrCode.content}
                  size={200}
                  fgColor={qrCode.foregroundColor || "#000000"}
                  bgColor={qrCode.backgroundColor || "#FFFFFF"}
                  level="M"
                  includeMargin={false}
                />
              </div>

              <div className="p-4 border-t">
                <h3 className="text-base font-semibold text-center truncate" title={qrCode.name}>
                  {qrCode.name}
                </h3>
                {qrCode.description && (
                  <p className="text-sm text-gray-500 mt-1 text-center">
                    {truncateContent(qrCode.description, 100)}
                  </p>
                )}
              </div>
            </Card>
          ))
      )}
    </div>


  )
}


