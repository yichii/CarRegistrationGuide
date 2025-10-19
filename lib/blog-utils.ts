import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  category: string
  summary: string
  author: string
  updated?: string
  featured: boolean
  image?: string
  content: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn("[v0] Blog directory does not exist:", postsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString().split("T")[0],
          readTime: data.readTime || "5 min",
          category: data.category || "General",
          summary: data.summary || "",
          author: data.author || "CarRegistrationGuide Team",
          updated: data.updated,
          featured: data.featured || false,
          image: data.image,
          content,
        } as BlogPost
      })

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("[v0] Error reading blog posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      readTime: data.readTime || "5 min",
      category: data.category || "General",
      summary: data.summary || "",
      author: data.author || "CarRegistrationGuide Team",
      updated: data.updated,
      featured: data.featured || false,
      image: data.image,
      content,
    } as BlogPost
  } catch (error) {
    console.error("[v0] Error reading blog post:", error)
    return null
  }
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.featured)
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export async function getRelatedPosts(currentSlug: string, category: string, limit = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.slug !== currentSlug && post.category === category).slice(0, limit)
}

export function getAllCategories(posts: BlogPost[]): string[] {
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}
