import React from 'react'
import type TableCell from './TableCell'
import type TableRow from './TableRow'

function TableBody ({ children }: { children: Array<React.ReactElement<typeof TableRow<typeof TableCell>>> }) {
  return (
    <tbody className=''>
      {children}
    </tbody>
  )
}

export default TableBody
