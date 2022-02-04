import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'

import { ClosedHamburgerIcon, SearchIcon } from '@icons'
import { ISlugBlogPosts } from 'utils/types'

interface ISidebar {
  posts: ISlugBlogPosts[]
}

const BlogSidebar = ({ posts }: ISidebar) => {
  const [filterdData, setFilterdData] = useState<ISlugBlogPosts[]>([])
  const [searchWords, setSearchWrods] = useState('')

  const handlerFilteredData = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value.toLowerCase()
    const filter = posts.filter(val => {
      return val.frontMatter.title.toLowerCase().includes(searchWord)
    })

    if (searchWord == '') {
      setFilterdData([])
    } else {
      setFilterdData(filter)
    }

    setSearchWrods(searchWord)
  }

  const clearInput = () => {
    setSearchWrods('')
    setFilterdData([])
  }

  return (
    <aside className="w-full mt-20 lg:mt-0 lg:w-3/12">
      {/*
           TODO put this in its own component
           for search function
        */}
      <div className="relative shadow-form">
        <div>
          <input
            className="w-full h-full px-3 py-3 pr-12 text-sm text-gray-300 rounded-md bg-bg-500/80 focus:outline-none focus:border-bg-200 focus:ring-bg-200 focus:rounded-md focus:ring-1"
            placeholder="Search posts..."
            value={searchWords}
            onChange={handlerFilteredData}
          />
          {searchWords.length === 0 ? (
            <SearchIcon className="absolute top-2 right-2" height={25} />
          ) : (
            <ClosedHamburgerIcon
              className="absolute top-2 right-2"
              height={25}
              onClick={clearInput}
            />
          )}
        </div>
        {filterdData.length != 0 && (
          <div className="absolute flex flex-col w-full overflow-auto bg-gray-400 top-11 overscroll-contain rounded-b-md max-h-52">
            {filterdData.slice(0, 10).map(post => {
              return (
                <Link key={post.slug} href={'/blog/' + post.slug}>
                  <a className="w-full px-4 py-2 hover:bg-slate-700 none">
                    {post.frontMatter.title}
                  </a>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* <div className="flex flex-col mt-10 space-y-5">
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
      </div> */}
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
