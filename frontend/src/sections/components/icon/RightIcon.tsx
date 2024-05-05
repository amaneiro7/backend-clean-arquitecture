import React from 'react'
import { Icon } from '.'

export function RightIcon({ isDisabled, children }: React.PropsWithChildren<{ isDisabled?: boolean }>) {
  return (
    <Icon
      isDisabled={isDisabled}
      type='right'
    >
      {children}
    </Icon>
  )
}
