// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite-plugin-svgr/client" />
import AddSVG from './add.svg?react'
import EditSVG from './edit.svg?react'
import DeleteSVG from './delete.svg?react'
import RightArrowSVG from './rightArrow.svg?react'
import { PropsWithChildren } from 'react'

interface Props {
  type: keyof typeof iconTypes
  isDisabled?: boolean
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
  ),
  right: () => (
    <RightArrowSVG className='w-full aspect-square transition-all fill-terciary' />
  )
} as const
export const Icon = ({ type, isDisabled = false, children }: PropsWithChildren<Props>) => {
  return (
    <i
      className={`relative w-12 h-12 p-2 flex justify-center items-center  ${isDisabled ? 'cursor-default opacity-50' : 'hover:[&>svg]:opacity-70'}`}
    >
      {iconTypes[type]()}
      {children}
    </i>
  )
}
