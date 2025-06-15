import EventPageClient from "@/components/event/event-page-client"
import { notFound } from "next/navigation"

const API_BASE_URL = "https://event-management-dev.vercel.app"

type Params = {
  params: Promise<{
    slug: string
  }>
}

async function getEventData(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 10 },
    })

    if (!res.ok) return null

    const json = await res.json()
    return json.success ? json.data : null
  } catch (err) {
    console.error("Error fetching event data:", err)
    return null
  }
}

export async function generateMetadata({ params }: Params) {
  const resolvedParams = await params

  if (!resolvedParams?.slug) {
    return {
      title: "Événements",
      description: "Découvrez nos événements à venir.",
    }
  }

  const eventData = await getEventData(resolvedParams.slug)

  if (!eventData) {
    return {
      title: "Événement non trouvé",
      description: "L'événement que vous recherchez n'existe pas.",
    }
  }

  return {
    title: `${eventData.title} | Événement`,
    description: eventData.description || `Découvrez ${eventData.title}`,
    openGraph: {
      title: eventData.title,
      description: eventData.description || "",
      images: eventData.coverImage ? [eventData.coverImage] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: eventData.title,
      description: eventData.description || "",
      images: eventData.coverImage ? [eventData.coverImage] : [],
    },
  }
}

export async function generateStaticParams() {
  return []
}

// الصفحة الرئيسية ديال الحدث
export default async function EventPage({ params }: Params) {
  // await params عشان نجيبوا من Promise
  const resolvedParams = await params
  const eventData = await getEventData(resolvedParams.slug)

  if (!eventData) notFound()

  return <EventPageClient eventData={eventData} />
}