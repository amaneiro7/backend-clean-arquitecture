// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite-plugin-svgr/client" />
import { lazy, PropsWithChildren, Suspense } from 'react'
const AddSVG = lazy(async () => import('./add.svg?react'))
const EditSVG = lazy(async () => import('./edit.svg?react'))
const DeleteSVG = lazy(async () => import('./delete.svg?react'))
const RightArrowSVG = lazy(async () => import('./rightArrow.svg?react'))
const ThinRightArrowSVG = lazy(async () => import('./thinArrow.svg?react'))
const FilterSVG = lazy(async () => import('./filter.svg?react'))

interface Props {
  type: keyof typeof iconTypes
  isDisabled?: boolean
  size?: Size
}

type Size = typeof SIZES[keyof typeof SIZES]

export const SIZES = {
  extraSmall: 'w-4',
  small: 'w-6',
  medium: 'w-8',
  large: 'w-10',
  extralarge: 'w-12'
} as const

const iconTypes = {
  add: ({ size }: { size: Size }) => (
    <Suspense><AddSVG className={`${size} aspect-square transition-all fill-primary`} /></Suspense>
  ),
  edit: ({ size }: { size: Size }) => (
    <Suspense><EditSVG className={`${size} aspect-square transition-all fill-secondary`} /></Suspense>
  ),
  delete: ({ size }: { size: Size }) => (
    <Suspense><DeleteSVG className={`${size} aspect-square transition-all fill-quaternary`} /></Suspense>
  ),
  right: ({ size }: { size: Size }) => (
    <Suspense><RightArrowSVG className={`${size} aspect-square transition-all fill-terciary`} /></Suspense>
  ),
  thinRight: ({ size }: { size: Size }) => (
    <Suspense><ThinRightArrowSVG className={`${size} aspect-square transition-all fill-secondary`} /></Suspense>
  ),
  filter: ({ size }: { size: Size }) => (
    <Suspense><FilterSVG className={`${size} p-0 aspect-square transition-all fill-inheret`} /></Suspense>
  )
} as const
export const Icon = ({ type, isDisabled = false, children, size = 'w-6' }: PropsWithChildren<Props>) => {

  return (
    <i
      className={`relative w-12 aspect-square flex justify-center items-center  ${isDisabled ? 'cursor-default opacity-50' : 'cursor-pointer hover:[&>svg]:opacity-70'}`}
    >
      {iconTypes[type]({ size })}
      {children}
    </i>
  )
}
