import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { MDXRemoteSerializeResult } from 'next-mdx-remote/'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import readingTime, { ReadTimeResults } from 'reading-time'

import BlogLayout from 'layouts/blog'
import getMdxSource from 'lib/getMdxSource'
import { IBlogPost } from 'utils/types'

const MDXRenderer = dynamic(() => import('components/MDXComponent'))

interface IPostPage {
  frontMatter: IBlogPost
  content: string
  slug: string
  mdxSource: MDXRemoteSerializeResult
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
      <main className="container relative flex flex-col items-center mx-auto mt-16 xl:max-w-7xl">
        <article className="px-6 bg-slate-400 dark:bg-inherit md:px-14 lg:max-w-none w-fit">
          <div className="space-y-2 lg:w-2/3 md:mt-10">
            <h1 className="text-5xl md:text-8xl dark:text-primary-white">
              {title}
            </h1>
            <p className="mb-0 dark:text-primary-brightgray">
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
            <div className="flex items-center space-x-5 dark:text-primary-white ">
              <p>{readingTime.text}</p>
              <div className="w-1 h-1 bg-yellow-500 rounded-full" />
              <p>{wordCount} words</p>
            </div>
          </div>
          <div className="mt-10 prose sm:prose-lg lg:prose-xl dark:prose-invert">
            <hr />
            <MDXRenderer mdxSource={mdxSource} />
          </div>
        </article>
        <button className="px-6 py-2 mt-10 text-lg transition-transform ease-out rounded-lg bg-secondary-red hover:-translate-y-2">
          <Link href="/blog">
            <a>Go Back</a>
          </Link>
        </button>
      </main>
    </BlogLayout>
  )
}

export const getStaticPaths = async () => {
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

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  // read each file
  const markdown = fs.readFileSync(
    path.join('src/data/posts', slug + '.mdx'),
    'utf-8',
  )

  // Extract front matter
  const { data: frontMatter, content } = matter(markdown)

  const mdxSource = await getMdxSource({ content, frontMatter })

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
