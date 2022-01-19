import { Icon, IconProps } from '@iconify/react'

export const GithubIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="akar-icons:github-fill" />
}

export const LinkedIn = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="codicon:mail" />
}

export const MainIcon = ({ ...props }: Partial<IconProps>) => {
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
          className={'cursor-pointer' + className}
          icon={icon}
          color={props.color || '#ffbd44'}
          height={height || 35}
        />
      )}
    </>
  )
}
