import { Color, Icon } from '.'
import { type Size } from "../../../types/const";


export function DownloadIcon({ 
  isDisabled, children, size, color 
}: React.PropsWithChildren<{ isDisabled?: boolean, color: Color, size?: Size }>) 
{
  return (
    <Icon
      isDisabled={isDisabled}
      type='downloadIcon'
      size={size}
      color={color}      
    >
      {children}
    </Icon>
  )
}
