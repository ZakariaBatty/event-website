import { Badge } from "@/components/ui/badge"

interface EventTypeBadgeProps {
  type: string
}

const eventTypeConfig = {
  WORKSHOP: { label: "Workshop", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
  MASTER_CLASS: { label: "Master Class", variant: "secondary" as const, color: "bg-purple-100 text-purple-800" },
  SIDE_EVENT: { label: "Side Event", variant: "outline" as const, color: "bg-gray-100 text-gray-800" },
  SHOWCASE: { label: "Showcase", variant: "default" as const, color: "bg-green-100 text-green-800" },
  ROUNDTABLE: { label: "Roundtable", variant: "secondary" as const, color: "bg-amber-100 text-amber-800" },
  NETWORKING: { label: "Networking", variant: "outline" as const, color: "bg-pink-100 text-pink-800" },
}

export function EventTypeBadge({ type }: EventTypeBadgeProps) {
  const config = eventTypeConfig[type as keyof typeof eventTypeConfig] || eventTypeConfig.SIDE_EVENT

  return <Badge className={`${config.color} border-0 font-medium`}>{config.label}</Badge>
}
