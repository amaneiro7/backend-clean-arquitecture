// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite-plugin-svgr/client" />
import AddSVG from './add.svg?react'
import EditSVG from './edit.svg?react'
import DeleteSVG from './delete.svg?react'
import RightArrowSVG from './rightArrow.svg?react'
import ThinRightArrowSVG from './thinArrow.svg?react'
import { PropsWithChildren } from 'react'

interface Props {
  type: keyof typeof iconTypes
  isDisabled?: boolean
  size?: typeof SIZES[keyof typeof SIZES]
}

export const SIZES = {
  extraSmall: 'w-4',
  small: 'w-6',
  medium: 'w-8',
  large: 'w-10',
  extralarge: 'w-12'
} as const

const iconTypes = {
  add: ({size}) => (
    <AddSVG className={`${size} aspect-square transition-all fill-primary`} />
  ),
  edit: ({size}) => (
    <EditSVG className={`${size} aspect-square transition-all fill-secondary`} />
  ),
  delete: ({size}) => (
    <DeleteSVG className={`${size} aspect-square transition-all fill-quaternary`} />
  ),
  right: ({size}) => (
    <RightArrowSVG className={`${size} aspect-square transition-all fill-terciary`} />
  ),
  thinRight: ({size}) => (
    <ThinRightArrowSVG className={`${size} aspect-square transition-all fill-secondary`} />
  )
} as const
export const Icon = ({ type, isDisabled = false, children, size = 'w-6' }: PropsWithChildren<Props>) => {

  return (
    <i
      className={`relative w-12 aspect-square p-2 flex justify-center items-center  ${isDisabled ? 'cursor-default opacity-50' : 'cursor-pointer hover:[&>svg]:opacity-70'}`}
    >
      {iconTypes[type]({size})}
      {children}
    </i>
  )
}
