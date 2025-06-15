
interface EventTypeSpanProps {
  type: string
}

const eventTypeConfig = {
  WORKSHOP: { label: "Workshop", variant: "default" as const, color: "text-blue-800" },
  MASTER_CLASS: { label: "Master Class", variant: "secondary" as const, color: "text-purple-800" },
  SIDE_EVENT: { label: "Side Event", variant: "outline" as const, color: "text-gray-800" },
  SHOWCASE: { label: "Showcase", variant: "default" as const, color: "text-green-800" },
  ROUNDTABLE: { label: "Roundtable", variant: "secondary" as const, color: "text-amber-800" },
  NETWORKING: { label: "Networking", variant: "outline" as const, color: "text-pink-800" },
}

export function EventTypeSpan({ type }: EventTypeSpanProps) {
  const config = eventTypeConfig[type as keyof typeof eventTypeConfig] || eventTypeConfig.SIDE_EVENT

  return <span className={`${config.color} font-medium mr-2`}>{config.label}</span>
}
