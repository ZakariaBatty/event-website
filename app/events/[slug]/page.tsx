import EventPageClient from "@/components/event/event-page-client"
import { notFound } from "next/navigation"

// 👇 Replace with your actual API URL
const API_BASE_URL = "https://event-management-dev.vercel.app"

async function getEventData(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 600 }, // ISR: cache for 10 minutes
    })

    if (!res.ok) return null

    const json = await res.json()
    return json.success ? json.data : null
  } catch (err) {
    console.error("Error fetching event data:", err)
    return null
  }
}

// 👇 Generate SEO metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const url = await params

  if (!url || !url.slug) {
    return {
      title: "Événements",
      description: "Découvrez nos événements à venir.",
    }
  }

  const eventData = await getEventData(url.slug)

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

// (Optional) Static generation for some slugs
export async function generateStaticParams() {
  return [] // or fetch list of slugs from API if needed
}

// 👇 Page
export default async function EventPage({ params }: { params: { slug: string } }) {
  const url = await params
  const eventData = await getEventData(url.slug)

  if (!eventData) notFound()

  return <EventPageClient eventData={eventData} />
}
