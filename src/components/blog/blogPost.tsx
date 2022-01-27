import Link from 'next/link'
import React from 'react'

import { ISlugBlogPosts } from 'utils/types'

const BlogPost = ({
  post: { frontMatter, slug },
  isNew,
}: {
  post: ISlugBlogPosts
  isNew?: boolean
}) => {
  const { isPinned, categories, date, description, title } = frontMatter

  // TODO dynamically create all data here
  // The most recent blog post will always have the new tag, pinned will be selected by user.

  return (
    <article className="relative">
      <div className="flex flex-col items-start w-full pl-16 space-y-4">
        <Link href={`/blog/${slug}`}>
          <a>
            <h4 className="text-xl font-medium text-gray-200">{title}</h4>
          </a>
        </Link>

        <div className="flex items-center justify-end w-64 h-5 space-x-6">
          <div className="w-28 h-0.5 border-2 border-red-400 rounded-sm" />
          {/* These logos here will have set colors, make a enum value for each colors so they match with the categories of the side bar */}
          <div className="flex items-center justify-center space-x-5">
            {categories.map((category, i) => (
              <CategoryIcon name={category} key={i} />
            ))}
          </div>
        </div>

        {/* This description is only going to show a certain amount of characters */}
        <p className="text-xl text-start text-gray-200 px-0.5">
          {description?.substring(0, 100).concat('...')}
        </p>

        {/* Make Read more button clickable, even though the whole container is clickable */}
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-300">
            {date.split(' ').slice(0, -2).join(' ')}
          </p>
          <div className="w-1 h-1 bg-yellow-500 rounded-full" />
          <Link href={`/blog/${slug}`}>
            <a className="text-sm font-bold text-center text-gray-300">
              Read more...
            </a>
          </Link>
        </div>
      </div>

      {/* Most blog posts wont be pinned and new but this is a solid method ot show both at the moment. Try to stick to only one. */}
      <div className="absolute left-0 top-1">
        {isNew && (
          <p
            className={`${
              isNew ? 'text-secondary-red' : ''
            } italic font-medium`}
          >
            NEW!
          </p>
        )}
        {isPinned && (
          <p
            className={`${
              isPinned ? `text-secondary-orange` : ''
            } italic font-medium`}
          >
            PINNED
          </p>
        )}
      </div>
    </article>
  )
}

const CategoryIcon = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-start px-1 py-0.5 bg-blue-900 rounded-md">
      <p className="text-sm text-center text-gray-200">{name}</p>
    </div>
  )
}

export default BlogPost
