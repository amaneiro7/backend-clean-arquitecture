// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite-plugin-svgr/client" />
// import { ReactComponent as AddSVG } from './add.svg'
// import { ReactComponent as EditSVG } from './edit.svg'
// import { ReactComponent as DeleteSVG } from './delete.svg'
import AddSVG from './add.svg?react'
import EditSVG from './edit.svg?react'
import DeleteSVG from './delete.svg?react'

interface Props {
  type: keyof typeof iconTypes
  onHandle?: React.MouseEventHandler<HTMLSpanElement> | undefined
}

const iconTypes = {
  add: () => (
      <AddSVG className='w-6 h-6 transition-all fill-primary' />
  ),
  edit: () => (
      <EditSVG className='w-6 h-6 transition-all fill-secondary' />
  ),
  delete: () => (
      <DeleteSVG className='w-6 h-6 transition-all fill-quaternary' />
  )
} as const
export const Icon = ({ type, onHandle }: Props) => {
  return (
          <span
              className={'w-12 h-12 flex justify-center items-center hover:[&>svg]:opacity-70 '}
              onClick={onHandle}
          >
              {iconTypes[type]()}
          </span>
  )
}
