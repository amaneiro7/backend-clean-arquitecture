import Edit from './edit.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function EditIcon({...props}:Props) {
  return (
    <i>
      <Edit {...props} />
    </i>
  )
}

