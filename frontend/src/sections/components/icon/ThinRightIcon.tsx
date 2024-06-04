import { Icon, SIZES } from '.'

export function ThinRightIcon({ 
  isDisabled, children, size, color 
}: React.PropsWithChildren<{ isDisabled?: boolean, color: 'primary' | 'secondary', size?: typeof SIZES[keyof typeof SIZES] }>) 
{
  return (
    <Icon
      isDisabled={isDisabled}
      type='thinRight'
      size={size}
      color={color}
    >
      {children}
    </Icon>
  )
}
