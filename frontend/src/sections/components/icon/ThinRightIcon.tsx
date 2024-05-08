import { Icon, SIZES } from '.'

export function ThinRightIcon({ isDisabled, children, size }: React.PropsWithChildren<{ isDisabled?: boolean, size?: typeof SIZES[keyof typeof SIZES] }>) {
  return (
    <Icon
      isDisabled={isDisabled}
      type='thinRight'
      size={size}
    >
      {children}
    </Icon>
  )
}
