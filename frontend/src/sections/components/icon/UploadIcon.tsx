import { Color, Icon, SIZES } from '.'

export function UploadIcon({ 
  isDisabled, children, size, color 
}: React.PropsWithChildren<{ isDisabled?: boolean, color: Color, size?: typeof SIZES[keyof typeof SIZES] }>) 
{
  return (
    <Icon
      isDisabled={isDisabled}
      type='uploadIcon'
      size={size}
      color={color}      
    >
      {children}
    </Icon>
  )
}
