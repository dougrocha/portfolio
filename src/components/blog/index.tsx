import React from 'react'

import { FilterIcon } from '@icons'
import { ISlugBlogPosts } from 'utils/types'

import BlogPost from './blogPost'

const BlogSection = ({ posts }: { posts: ISlugBlogPosts[] }) => {
  const handleLoadMore = () => {
    return
  }
  return (
    <section className="w-full lg:w-8/12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">Blog Posts</h2>
        <div className="flex items-center">
          <FilterIcon className="mr-2" />
          Sort
        </div>
      </div>
      <div className="space-y-6 mt-14">
        {posts
          .filter(post => post.frontMatter.isPinned === true)
          .map(post => (
            <BlogPost post={post} key={post.slug} />
          ))}
        {posts
          .filter(post => post.frontMatter.isPinned === false)
          .map((post, i) => {
            if (i == 0) {
              return <BlogPost post={post} key={post.slug} isNew />
            }
            return <BlogPost post={post} key={post.slug} />
          })}
      </div>
      <div className="flex items-center justify-center mt-16 ">
        <button
          className="px-8 py-2 rounded-lg shadow-form bg-secondary-red"
          onClick={() => handleLoadMore()}
        >
          <strong>Load More</strong>
        </button>
      </div>
    </section>
  )
}

export default BlogSection
