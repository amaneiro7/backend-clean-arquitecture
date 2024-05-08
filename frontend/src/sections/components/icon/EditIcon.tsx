import React from 'react'
import { Icon, SIZES } from '.'

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
