import { Icon, IconProps } from '@iconify/react'

export const GithubIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="akar-icons:github-fill" />
}

export const MailIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="codicon:mail" />
}

export const LinkedInIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="eva:linkedin-outline" />
}

export const HamBurgerIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="charm:menu-hamburger" />
}

export const ClosedHamburgerIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="heroicons-outline:x" />
}

export const NextJsIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="cib:next-js" />
}

export const MongoDbIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="cib:mongodb" />
}

export const StyledComponentsIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="file-icons:styledcomponents" />
}

export const TypescriptIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="file-icons:typescript-alt" />
}
export const LoadingIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="eos-icons:loading" />
}
export const ExternalLinkIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="charm:link-external" />
}
export const SearchIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="eva:search-fill" />
}
export const SendIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="akar-icons:send" />
}
export const FilterIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="fluent:arrow-sort-down-lines-24-regular" />
}

const BaseIcon = ({
  icon,
  height,
  className,
  ...props
}: Partial<IconProps>) => {
  return (
    <>
      {icon && (
        <Icon
          {...props}
          className={'cursor-pointer '.concat(className ?? '')}
          icon={icon}
          color={props.color || '#ffbd44'}
          height={height || 35}
        />
      )}
    </>
  )
}
