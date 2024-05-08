import React from 'react'
import { Icon, SIZES } from '.'

export function RightIcon({ isDisabled, children, size }: React.PropsWithChildren<{ isDisabled?: boolean, size?: typeof SIZES[keyof typeof SIZES] }>) {
  return (
    <Icon
      isDisabled={isDisabled}
      type='right'
      size={size}
    >
      {children}
    </Icon>
  )
}
