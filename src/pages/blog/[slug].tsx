import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import readingTime, { ReadTimeResults } from 'reading-time'

import BlogLayout from 'layouts/blog'
import { IBlogPost } from 'utils/types'

interface IPostPage {
  frontMatter: IBlogPost
  content: string
  slug: string
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>
  wordCount: number
  readingTime: ReadTimeResults
}

const PostPage = ({
  frontMatter,
  mdxSource,
  readingTime,
  wordCount,
}: IPostPage) => {
  const { categories, date, title } = frontMatter

  return (
    <BlogLayout>
      <main className="container relative px-6 mx-auto mt-16 xl:max-w-7xl">
        <article className="flex flex-col lg:max-w-none ">
          <Link href="/blog">
            <a>
              <button className="px-2 py-1 text-sm rounded-lg bg-windowred">
                Go Back
              </button>
            </a>
          </Link>
          <section className="mt-10 space-y-2 md:mt-20">
            <h1 className="text-6xl md:text-8xl text-whitetext">{title}</h1>
            <p className="mb-0 text-graytext">
              Posted on: {date.split(' ').slice(0, -2).join(' ')}
            </p>
            <ul className="flex pl-0 space-x-4 list-none">
              {categories.map((category, i) => (
                <li
                  className="px-2 py-.5 bg-blue-600 rounded-lg w-fit text-sm font-medium"
                  key={i}
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-5 text-whitetext">
              <p>{readingTime.text}</p>
              <div className="w-1 h-1 bg-yellow-500 rounded-full" />
              <p>{wordCount} words</p>
            </div>
          </section>
          <section className="mt-10 prose sm:prose-lg lg:prose-xl dark:prose-invert">
            <MDXRemote {...mdxSource} />
          </section>
        </article>
      </main>
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  // Read the files inside the pages/posts dir
  const files = fs.readdirSync(path.join('src/data/posts'))

  // Generate path for each file
  const paths = files.map(file => {
    return {
      params: {
        slug: file.replace('.mdx', ''),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string }
}) {
  // read each file
  const markdown = fs.readFileSync(
    path.join('src/data/posts', slug + '.mdx'),
    'utf-8',
  )

  // Extract front matter
  const { data: frontMatter, content } = matter(markdown)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require('remark-prism'), require('remark-code-titles')],
    },
  })

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
      wordCount: content.trim().split(/\s+/).length,
      readingTime: readingTime(content),
    },
  }
}
export default PostPage
