# Blog Author Guide

Welcome to the CarRegistrationGuide blog system! This guide will help you create, edit, and manage blog posts without needing to modify any code.

## Quick Start

1. Create a new `.mdx` file in the `/content/blog` directory
2. Add frontmatter metadata at the top
3. Write your content using Markdown
4. Commit and deploy - your post will automatically appear!

## Creating a New Blog Post

### Step 1: Create the MDX File

Create a new file in `/content/blog` with a descriptive filename:

\`\`\`
content/blog/your-post-slug.mdx
\`\`\`

**Filename tips:**
- Use lowercase letters
- Separate words with hyphens
- Keep it short but descriptive
- Example: `florida-vehicle-registration-guide.mdx`

### Step 2: Add Frontmatter

Every blog post must start with frontmatter (metadata) between `---` markers:

\`\`\`mdx
---
title: "Your Post Title Here"
date: "2025-01-18"
readTime: "7 min"
category: "State-to-State Moves"
summary: "A brief summary of your post (1-2 sentences)"
author: "Your Name"
updated: "2025-01-18"
featured: false
image: "/images/blog/your-image.jpg"
---
\`\`\`

**Frontmatter fields:**

- `title` (required): The post title (use quotes)
- `date` (required): Publication date in YYYY-MM-DD format
- `readTime` (required): Estimated reading time (e.g., "5 min")
- `category` (required): Post category (see categories below)
- `summary` (required): Brief description for post cards
- `author` (required): Author name
- `updated` (optional): Last updated date
- `featured` (optional): Set to `true` to feature on homepage
- `image` (optional): Path to header image

**Available categories:**
- State-to-State Moves
- Title & Registration
- Inspections
- Insurance
- DMV Guides
- General

### Step 3: Write Your Content

After the frontmatter, write your content using Markdown:

\`\`\`mdx
## Main Heading

Your introduction paragraph goes here.

### Subheading

More content with **bold** and *italic* text.

- Bullet point 1
- Bullet point 2

1. Numbered list item 1
2. Numbered list item 2
\`\`\`

## Custom Components

Use these special components to enhance your posts:

### Callout Boxes

Highlight important information:

\`\`\`mdx
<Callout type="info">
This is an informational callout with helpful tips.
</Callout>

<Callout type="warning">
This is a warning about something important.
</Callout>

<Callout type="success">
This is a success message or positive note.
</Callout>

<Callout type="error">
This is an error or critical warning.
</Callout>
\`\`\`

### Checklists

Create interactive checklists:

\`\`\`mdx
<Checklist items={[
  "First item to check",
  "Second item to check",
  "Third item to check"
]} />
\`\`\`

### Download Buttons

Add download buttons for forms or resources:

\`\`\`mdx
<DownloadButton href="/forms/your-form.pdf" label="Download Form" />
\`\`\`

## Markdown Syntax Guide

### Headings

\`\`\`mdx
## H2 Heading
### H3 Heading
#### H4 Heading
\`\`\`

### Text Formatting

\`\`\`mdx
**Bold text**
*Italic text*
***Bold and italic***
`Inline code`
\`\`\`

### Links

\`\`\`mdx
[Link text](https://example.com)
[Internal link](/start)
\`\`\`

### Lists

\`\`\`mdx
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
\`\`\`

### Blockquotes

\`\`\`mdx
> This is a blockquote
> It can span multiple lines
\`\`\`

### Code Blocks

`\`\`\`mdx
\`\`\`javascript
const example = "code block";
console.log(example);
