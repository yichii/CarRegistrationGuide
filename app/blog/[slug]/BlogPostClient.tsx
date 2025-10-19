"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User, ArrowLeft, Facebook, Twitter, Linkedin, Mail, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { BlogPost } from "@/lib/blog"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = post.title

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`,
    }

    if (platform in urls) {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <span className="text-xl font-bold text-foreground">CarRegistrationGuide</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/start" className="text-sm font-medium hover:text-primary">
                Get Started
              </Link>
              <Link href="/faq" className="text-sm font-medium hover:text-primary">
                FAQ
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-primary">
                Blog
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Back to Blog */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-4">
            <Badge variant="secondary" className="text-sm">
              {post.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{post.title}</h1>

          {/* Summary/TL;DR */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg text-gray-700 leading-relaxed">{post.summary}</p>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} read</span>
            </div>
          </div>

          {/* Last Updated */}
          {post.updated && post.updated !== post.date && (
            <p className="text-sm text-muted-foreground mb-8">
              Last updated:{" "}
              {new Date(post.updated).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}

          {/* Hero Image */}
          {post.image && (
            <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b">
            <span className="text-sm font-medium">Share this article:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("email")}>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-7 prose-p:my-6 prose-ul:my-6 prose-ul:ml-6 prose-li:mt-2 prose-strong:font-semibold prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80 prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-table:w-full prose-table:border-collapse prose-th:border prose-th:p-2 prose-th:bg-muted prose-td:border prose-td:p-2">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>,
                h2: ({ children }) => <h2 className="text-3xl font-bold mb-4 mt-10 border-b pb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-semibold mb-4 mt-8">{children}</h3>,
                h4: ({ children }) => <h4 className="text-xl font-semibold mb-3 mt-6">{children}</h4>,
                p: ({ children }) => <p className="leading-7 my-6">{children}</p>,
                ul: ({ children }) => <ul className="my-6 ml-6 list-disc space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="my-6 ml-6 list-decimal space-y-2">{children}</ol>,
                li: ({ children }) => <li className="leading-7">{children}</li>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                    <code className="text-sm font-mono">{children}</code>
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-6">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
                th: ({ children }) => <th className="border p-3 text-left font-semibold">{children}</th>,
                td: ({ children }) => <td className="border p-3">{children}</td>,
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <Separator className="mb-6" />
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <Card className="mb-12 bg-gradient-to-r from-blue-50 to-white">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <CardTitle className="mb-2">Written by {post.author}</CardTitle>
                  <CardDescription className="text-base">
                    Founder of CarRegistrationGuide.com, helping movers simplify the DMV process. With years of
                    experience navigating vehicle registration requirements across all 50 states, {post.author} provides
                    expert guidance to make your interstate move stress-free.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* CTA Section */}
          <Card className="mb-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Register Your Vehicle?</h3>
              <p className="text-lg mb-6 text-blue-100">
                Get a personalized checklist for your state-to-state move in seconds
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/start">Generate Your Free Checklist</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.slug} className="hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      {relatedPost.image && (
                        <div className="relative h-40 w-full">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">
                          {relatedPost.category}
                        </Badge>
                        <CardTitle className="text-lg hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{relatedPost.summary}</CardDescription>
                      </CardHeader>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 CarRegistrationGuide. All rights reserved.</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
              <Link href="/faq" className="hover:text-primary">
                FAQ
              </Link>
              <Link href="/help" className="hover:text-primary">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
