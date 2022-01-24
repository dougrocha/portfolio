import { SearchIcon } from '@icons'
import React from 'react'

const BlogSidebar = () => {
  return (
    <aside className="w-full lg:w-3/12">
      {/*
           TODO put this in its own component
           for search function
        */}
      <div className="relative">
        <input
          className="w-full h-full px-3 py-3 text-sm text-gray-300 bg-bg-light shadow-form"
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
        <div className="grid w-full grid-cols-3 mt-2 gap-x-4 gap-y-2">
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
    color: 'bg-workflow',
  },
  {
    name: 'Nestjs',
    color: 'bg-nestjs',
  },
  {
    name: 'Workflow',
    color: 'bg-workflow',
  },
  {
    name: 'Nestjs',
    color: 'bg-nestjs',
  },
  {
    name: 'Workflow',
    color: 'bg-workflow',
  },
  {
    name: 'Nestjs',
    color: 'bg-nestjs',
  },
  {
    name: 'Workflow',
    color: 'bg-workflow',
  },
  {
    name: 'Nestjs',
    color: 'bg-nestjs',
  },
]

export default BlogSidebar
