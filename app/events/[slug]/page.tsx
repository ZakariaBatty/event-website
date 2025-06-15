import EventPageClient from "@/components/event/event-page-client"
import { notFound } from "next/navigation"

// API base URL ديالك
const API_BASE_URL = "https://event-management-dev.vercel.app"

type Params = {
  params: {
    slug: string
  }
}

// جلب البيانات من API
async function getEventData(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 10 }, // ISR: cache for 10 seconds
    })

    if (!res.ok) return null

    const json = await res.json()
    return json.success ? json.data : null
  } catch (err) {
    console.error("Error fetching event data:", err)
    return null
  }
}

// توليد الميتاداتا SEO
export async function generateMetadata({ params }: Params) {
  if (!params?.slug) {
    return {
      title: "Événements",
      description: "Découvrez nos événements à venir.",
    }
  }

  const eventData = await getEventData(params.slug)

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

// (اختياري) توليد params للـ static generation
export async function generateStaticParams() {
  // إذا عندك API كيرجع list ديال slugs، يمكن تجيبها هنا
  // و ترجعها على شكل [{ slug: "..." }, ...]
  return []
}

// الصفحة الرئيسية ديال الحدث
export default async function EventPage({ params }: Params) {
  const eventData = await getEventData(params.slug)

  if (!eventData) notFound()

  return <EventPageClient eventData={eventData} />
}
