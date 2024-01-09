import { Icon } from '.'

interface Props {
  onHandle?: React.MouseEventHandler<HTMLSpanElement> | undefined
}
export function DeleteIcon ({ onHandle }: Props) {
  return (
    <Icon
      type='delete'
      onHandle={onHandle}
    />
  )
}
