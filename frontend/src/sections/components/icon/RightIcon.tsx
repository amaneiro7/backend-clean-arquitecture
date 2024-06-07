import React from 'react'
import { Icon } from '.'
import { type Size } from "../../../types/const";

export function RightIcon({ isDisabled, children, size }: React.PropsWithChildren<{ isDisabled?: boolean, size?: Size }>) {
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
