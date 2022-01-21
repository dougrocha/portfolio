import { SearchIcon } from '@icons'
import ContactFooter from 'components/contact/ContactFooter'
import BlogLayout from 'layouts/blog'
import React from 'react'

const BlogCategories = [
  {
    name: 'React',
    color: '#325ea0',
  },
  {
    name: 'Workflow',
    color: '#FFBD44',
  },
  {
    name: 'Nestjs',
    color: '#2E0DF8',
  },
]

const Blog = () => {
  return (
    <BlogLayout>
      <div className="container px-[52px] mx-auto text-white xl:max-w-7xl">
        <div className="text-white ">TOP SECTION</div>
        <div className="w-full md:grid md:grid-cols-10">
          <div className="col-span-7">testing</div>
          <div className="col-span-3">
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

            <div>
              <div>Categories</div>
              <div className="flex">
                {BlogCategories.map(({ color, name }) => (
                  <button key={name} className={`bg-[${color}] w-full`}>
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div>extras</div>
          </div>
        </div>
        <footer className="flex flex-col items-center justify-center">
          <ContactFooter />
        </footer>
      </div>
    </BlogLayout>
  )
}

export default Blog
