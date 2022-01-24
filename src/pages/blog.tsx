import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import React from 'react'

import BlogSection from 'components/blog'
import BlogSidebar from 'components/blog/sidebar'
import BlogLayout from 'layouts/blog'
import { ISlugBlogPosts } from 'utils/types'

const Blog = ({ posts }: { posts: ISlugBlogPosts[] }) => {
  return (
    <BlogLayout>
      <main className="container flex flex-wrap justify-between px-6 mx-auto mt-16 text-white xl:max-w-7xl">
        <BlogSection posts={posts} />
        <BlogSidebar />
      </main>
    </BlogLayout>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('src/data/posts'))

  const posts = files.map(filename => {
    const slug = filename.replace('.mdx', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('src/data/posts', filename),
      'utf-8',
    )

    const { data: frontMatter, content } = matter(markdownWithMeta)

    return {
      slug,
      frontMatter,
      content,
    }
  })

  console.log(
    posts.sort(
      (a, b) => Date.parse(b.frontMatter.date) - Date.parse(a.frontMatter.date),
    ),
  )

  return {
    props: {
      posts,
    },
  }
}

export default Blog
