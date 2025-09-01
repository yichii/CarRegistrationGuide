// app/sitemap.ts
import { MetadataRoute } from 'next'

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://vehiclereregister.com'

const US = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const base: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/start`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const entryStatePages: MetadataRoute.Sitemap = US.map((to) => ({
    url: `${BASE}/start?to=${to}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...base, ...entryStatePages]
}

