import { Icon } from '.'

interface Props {
  isDisbaled?: boolean
}
export function EditIcon ({ isDisbaled = false }: Props) {
  return (
    <Icon
      type='edit'
      isDisabled={isDisbaled}
    />
  )
}
