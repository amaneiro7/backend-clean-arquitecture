import { Color, Icon } from '.'
import { type Size } from "../../../types/const";

export function UploadIcon({ 
  isDisabled, children, size, color 
}: React.PropsWithChildren<{ isDisabled?: boolean, color: Color, size?: Size }>) 
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
