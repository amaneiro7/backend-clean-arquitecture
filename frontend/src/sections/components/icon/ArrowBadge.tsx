import { Icon, SIZES } from '.'

export function ArrowBadgeIcon({ 
  isDisabled, children, size, color 
}: React.PropsWithChildren<{ isDisabled?: boolean, color: 'primary' | 'secondary', size?: typeof SIZES[keyof typeof SIZES] }>) 
{
  return (
    <Icon
      isDisabled={isDisabled}
      type='arrowBadge'
      size={size}
      color={color}
    >
      {children}
    </Icon>
  )
}
