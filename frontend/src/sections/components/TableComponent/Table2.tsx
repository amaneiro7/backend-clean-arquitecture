import { forwardRef } from 'react'

interface Props extends React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  className?: string  
}

const Table = forwardRef(function ({ children, className }: React.PropsWithChildren<Props>, ref: React.Ref<HTMLTableElement>) {
  return (    
    <table
      className={`relative min-w-full border-collapse table-auto ${className}`}
      ref={ref}
    >
      {children}
    </table>
  )
})
export default Table