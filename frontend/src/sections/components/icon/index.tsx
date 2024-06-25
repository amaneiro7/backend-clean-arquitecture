// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite-plugin-svgr/client" />
import { lazy, PropsWithChildren } from 'react'
import { Size } from '../../../types/const'
const AddSVG = lazy(async () => import('./add.svg?react'))
const EditSVG = lazy(async () => import('./edit.svg?react'))
const DeleteSVG = lazy(async () => import('./delete.svg?react'))
const RightArrowSVG = lazy(async () => import('./rightArrow.svg?react'))
const ThinRightArrowSVG = lazy(async () => import('./thinArrow.svg?react'))
const ArrowBadge = lazy(async () => import('./arrow-badge.svg?react'))
const FilterSVG = lazy(async () => import('./filter.svg?react'))
const DownloadIcon = lazy(async () => import('./download.svg?react'))
const UploadIcon = lazy(async () => import('./upload.svg?react'))

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  type: keyof typeof iconTypes
  isDisabled?: boolean
  size?: Size
  color?: Color
}

export type Color = 'primary' | 'secondary' | 'white' | 'quaternary' | 'terciary' | 'black'
export interface IconTypesProps {
  size: Size
  color?: Color
}


const iconTypes = {
  add: ({ size, color }: IconTypesProps) => (
    <AddSVG className={`${size} aspect-square transition-all fill-${color ? color : 'primary'}`} />
  ),
  edit: ({ size }: IconTypesProps) => (
    <EditSVG className={`${size} aspect-square transition-all stroke-white fill-white'}`} />
  ),
  delete: ({ size, color }: IconTypesProps) => (
    <DeleteSVG className={`${size} aspect-square transition-all fill-${color ? color : 'quaternary'}`} />
  ),
  right: ({ size, color }: IconTypesProps) => (
    <RightArrowSVG className={`${size} aspect-square transition-all fill-${color ? color : 'terciary'}`} />
  ),
  thinRight: ({ size, color }: IconTypesProps) => (
    <ThinRightArrowSVG className={`${size} aspect-square transition-all fill-${color}`} />
  ),
  arrowBadge: ({ size, color }: IconTypesProps) => (
    <ArrowBadge className={`${size} aspect-square transition-all text-${color} fill-${color}`} />
  ),
  downloadIcon: ({ size, color }: IconTypesProps) => (
    <DownloadIcon className={`${size} aspect-square transition-all text-${color} fill-${color}`} />
  ),
  uploadIcon: ({ size, color }: IconTypesProps) => (
    <UploadIcon className={`${size} aspect-square transition-all text-${color} fill-${color}`} />
  ),
  upIcon: ({ size, color }: IconTypesProps) => (
    <DownloadIcon className={`${size} aspect-square transition-all text-${color} fill-${color}`} />
  ),
  filter: ({ size }: IconTypesProps) => (
    <FilterSVG className={`${size} aspect-square transition-all text-inherit fill-inherit`} />
  )
} as const
export const Icon = ({ type, isDisabled = false, children, color, size = 'w-6', ...props }: PropsWithChildren<Props>) => {

  return (
    <i
      className={`drop-shadow-2xl relative ${size} aspect-square flex justify-center items-center  ${isDisabled ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
    >
      {iconTypes[type]({ size, color, ...props })}
      {children}
    </i>
  )
}
