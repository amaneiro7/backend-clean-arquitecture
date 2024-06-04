import React, { lazy } from 'react'
import { type SIZES } from '.'
const Icon = lazy(async () => import('.').then(m => ({ default: m.Icon })))

export function EditIcon({ isDisabled, children, size }: React.PropsWithChildren<{ isDisabled?: boolean, size?: typeof SIZES[keyof typeof SIZES] }>) {
  return (
    <Icon
      isDisabled={isDisabled}
      type='edit'
      size={size}
    >
      {children}
    </Icon>
  )
}
