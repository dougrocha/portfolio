import React from 'react'

import { FilterIcon } from '@icons'
import { ISlugBlogPosts } from 'utils/types'

import BlogPost from './blogPost'

const BlogSection = ({ posts }: { posts: ISlugBlogPosts[] }) => {
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
        {/* Move this to a custom hook to make is easier */}
        {posts
          .slice(1)
          .filter(post => post.frontMatter.isPinned === true)
          .map(post => (
            <>
              <BlogPost post={post} key={post.slug} />
            </>
          ))}
        <BlogPost post={posts[0]} key={posts[0].slug} isNew />
        {posts
          .slice(1)
          .filter(post => post.frontMatter.isPinned === false)
          .map(post => (
            <>
              <BlogPost post={post} key={post.slug} />
            </>
          ))}
      </div>
      <div className="flex items-center justify-center mt-16 ">
        <button className="px-8 py-2 rounded-lg shadow-form bg-windowred">
          <strong>Load More</strong>
        </button>
      </div>
    </section>
  )
}

export default BlogSection
