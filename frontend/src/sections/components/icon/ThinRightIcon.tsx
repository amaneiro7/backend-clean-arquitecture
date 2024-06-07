import { Icon } from '.'
import { type Size } from "../../../types/const";


export function ThinRightIcon({ 
  isDisabled, children, size, color 
}: React.PropsWithChildren<{ isDisabled?: boolean, color: 'primary' | 'secondary', size?: Size }>) 
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
