import React from 'react'

import { SearchIcon } from '@icons'

const BlogSidebar = () => {
  return (
    <aside className="w-full lg:w-3/12">
      {/*
           TODO put this in its own component
           for search function
        */}
      <div className="relative">
        <input
          className="w-full h-full px-3 py-3 text-sm text-gray-300 bg-bg-500/80 shadow-form"
          placeholder="Search posts..."
        />
        <SearchIcon
          className="absolute top-2 right-2"
          height={25}
          onClick={() => null}
        />
      </div>

      <div className="flex flex-col mt-10 space-y-5">
        <h3 className="text-lg">Categories</h3>
        <div className="grid grid-cols-4 mt-2 gap-x-2 gap-y-2">
          {BlogCategories.slice(0, 6).map(({ color, name }, i) => (
            <button
              key={i}
              className={`${color} text-sm px-1 py-.5 rounded-md w-full`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex mt-2">
          <button className="ml-auto">More categories...</button>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <p>Bookmarks</p>
        <p>Most Upvoted</p>
        <p>Feedback</p>
      </div>
    </aside>
  )
}

const BlogCategories = [
  {
    name: 'React',
    color: 'bg-react',
  },
  {
    name: 'Workflow',
    color: 'bg-secondary-yellow',
  },
  {
    name: 'Nestjs',
    color: 'bg-nestjs',
  },
  {
    name: 'Workflow',
    color: 'bg-secondary-yellow',
  },
  {
    name: 'Nestjs',
    color: 'bg-nestjs',
  },
  {
    name: 'Workflow',
    color: 'bg-secondary-yellow',
  },
  {
    name: 'Nestjs',
    color: 'bg-nestjs',
  },
  {
    name: 'Workflow',
    color: 'bg-secondary-yellow',
  },
  {
    name: 'Nestjs',
    color: 'bg-nestjs',
  },
]

export default BlogSidebar
