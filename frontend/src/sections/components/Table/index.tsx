import { type FC, Children, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const TableStructure: FC<Props> = ({ children }) => {
  const [tableHeader, tableBody] = Children.toArray(children)
  return (
    <div className='w-full rounded-2xl py-6 px-1 border-2 border-solid shadow-md text-left text-xs'>
        <div className='rotate-180 overflow-x-scroll pb-2'>
          <table className='min-w-full rotate-180 border-collapse table-fixed'>
            {tableHeader}
            {tableBody}
          </table>
        </div>
      </div>
  )
}

export default TableStructure
