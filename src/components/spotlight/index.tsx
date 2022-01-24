import Link from 'next/link'

import {
  NextJsIcon,
  TypescriptIcon,
  MongoDbIcon,
  StyledComponentsIcon,
  GithubIcon,
  ExternalLinkIcon,
} from '@icons'
import { StaticLinks } from 'utils/staticLinks'

const SpotlightProject = () => {
  return (
    <section className="container px-6 mx-auto mt-40">
      <div className="flex flex-col justify-center mx-auto max-w-7xl">
        <div>
          <p className="font-medium text-windowyellow">- Spotlight</p>
          <h2 className="text-5xl font-bold text-whitetext">Quanty</h2>
        </div>
        <div className="pr-3 mt-24 md:mt-32 lg:pl-20">
          <div className="flex flex-col items-start justify-center ">
            <span className="text-3xl font-bold text-whitetext">
              - Description
            </span>
            <p className="pl-4 text-xl text-graytext">
              This is the current project I am working on. Quanty is a Discord
              Bot with a dashboard. It&apos;s built with NextJs, NestJs, and
              Typescript. This project is mainly geared towards automating
              actions in discord while allowing users to have a fluid/easy
              experience with a dashboard.
            </p>
          </div>
          <div className="flex flex-col items-center justify-between mt-4 space-y-10 md:mt-2 md:flex-row md:space-y-0">
            <div className="flex items-center justify-center max-w-xs pl-4 space-x-4 md:justify-between lg:w-full">
              <NextJsIcon className="cursor-default" />
              <TypescriptIcon className="cursor-default" />
              <MongoDbIcon className="cursor-default" />
              <StyledComponentsIcon className="cursor-default" />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Link href={StaticLinks.QUANTYGIT} passHref>
                <a>
                  <GithubIcon />
                </a>
              </Link>
              <Link href={StaticLinks.QUANTYAPP} passHref>
                <a>
                  <ExternalLinkIcon />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpotlightProject
