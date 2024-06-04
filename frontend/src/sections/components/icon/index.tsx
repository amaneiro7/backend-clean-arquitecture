// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite-plugin-svgr/client" />
import { lazy, PropsWithChildren, Suspense } from 'react'
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


type Size = typeof SIZES[keyof typeof SIZES]

export const SIZES = {
  extraSmall: 'w-4',
  small: 'w-6',
  medium: 'w-8',
  large: 'w-10',
  extralarge: 'w-12'
} as const

export interface IconTypesProps {
  size: Size
  color?: Color
}


const iconTypes = {
  add: ({ size, color }: IconTypesProps) => (
    <Suspense><AddSVG className={`${size} aspect-square transition-all fill-${color ? color : 'primary'}`} /></Suspense>
  ),
  edit: ({ size, color }: IconTypesProps) => (
    <Suspense><EditSVG className={`${size} aspect-square transition-all fill-${color ? color : 'secondary'}`} /></Suspense>
  ),
  delete: ({ size, color }: IconTypesProps) => (
    <Suspense><DeleteSVG className={`${size} aspect-square transition-all fill-${color ? color : 'quaternary'}`} /></Suspense>
  ),
  right: ({ size, color }: IconTypesProps) => (
    <Suspense><RightArrowSVG className={`${size} aspect-square transition-all fill-${color ? color : 'terciary'}`} /></Suspense>
  ),
  thinRight: ({ size, color }: IconTypesProps) => (
    <Suspense><ThinRightArrowSVG className={`${size} aspect-square transition-all fill-${color}`} /></Suspense>
  ),
  arrowBadge: ({ size, color }: IconTypesProps) => (
    <Suspense><ArrowBadge className={`${size} aspect-square transition-all text-${color} fill-${color}`} /></Suspense>
  ),
  downloadIcon: ({ size, color }: IconTypesProps) => (
    <Suspense><DownloadIcon className={`${size} aspect-square transition-all text-${color} fill-${color}`} /></Suspense>
  ),
  uploadIcon: ({ size, color }: IconTypesProps) => (
    <Suspense><UploadIcon className={`${size} aspect-square transition-all text-${color} fill-${color}`} /></Suspense>
  ),
  upIcon: ({ size, color }: IconTypesProps) => (
    <Suspense><DownloadIcon className={`${size} aspect-square transition-all text-${color} fill-${color}`} /></Suspense>
  ),
  filter: ({ size }: IconTypesProps) => (
    <Suspense><FilterSVG className={`${size} aspect-square transition-all fill-inheret`} /></Suspense>
  )
} as const
export const Icon = ({ type, isDisabled = false, children, color, size = 'w-6', ...props }: PropsWithChildren<Props>) => {

  return (
    <i
      className={`relative ${size} aspect-square flex justify-center items-center  ${isDisabled ? 'cursor-default opacity-50' : 'cursor-pointer hover:[&>svg]:opacity-70'}`}
    >
      {iconTypes[type]({ size, color, ...props })}
      {children}
    </i>
  )
}
