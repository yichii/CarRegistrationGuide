import type { Metadata } from "next"
import BlogIndexClient from "./BlogIndexClient"
import { getAllPosts, getFeaturedPosts, getAllCategories } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog - Vehicle Registration Guides & Tips",
  description:
    "Expert guides on vehicle registration, title transfers, DMV requirements, and interstate moves. Get the latest tips and step-by-step instructions for all 50 states.",
  keywords: [
    "vehicle registration blog",
    "DMV guides",
    "title transfer tips",
    "car registration help",
    "moving vehicle guides",
    "state registration requirements",
  ],
  openGraph: {
    title: "Blog - Vehicle Registration Guides & Tips | CarRegistrationGuide",
    description: "Expert guides on vehicle registration, title transfers, and DMV requirements for all 50 states.",
    type: "website",
    url: "https://carregistrationguide.com/blog",
    images: [
      {
        url: "/og-image-blog.jpg",
        width: 1200,
        height: 630,
        alt: "CarRegistrationGuide Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Vehicle Registration Guides & Tips",
    description: "Expert guides on vehicle registration, title transfers, and DMV requirements for all 50 states.",
    images: ["/og-image-blog.jpg"],
  },
  alternates: {
    canonical: "https://carregistrationguide.com/blog",
  },
}

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const featuredPosts = await getFeaturedPosts()
  const categories = getAllCategories(allPosts)

  return <BlogIndexClient allPosts={allPosts} featuredPosts={featuredPosts} categories={categories} />
}
