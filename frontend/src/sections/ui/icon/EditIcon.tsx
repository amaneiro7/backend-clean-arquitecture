import { Icon } from '.'

interface Props {
  onHandle?: React.MouseEventHandler<HTMLSpanElement> | undefined
  isDisbaled?: boolean
}
export function EditIcon ({ onHandle, isDisbaled = false }: Props) {
  return (
    <Icon
      type='edit'
      onHandle={onHandle}
      isDisabled={isDisbaled}
    />
  )
}
