import { Icon } from '.'

interface Props {
  onHandle?: React.MouseEventHandler<HTMLSpanElement> | undefined
}
export function EditIcon ({ onHandle }: Props) {
  return (
    <Icon
      type='edit'
      onHandle={onHandle}
    />
  )
}
