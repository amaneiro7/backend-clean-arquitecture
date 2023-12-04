import { Icon } from '.'

interface Props {
  onHandle: React.MouseEventHandler<HTMLSpanElement> | undefined
}

export function AddIcon ({ onHandle }: Props) {
  return (
    <Icon
      type='add'
      onHandle={onHandle}
    />
  )
}
