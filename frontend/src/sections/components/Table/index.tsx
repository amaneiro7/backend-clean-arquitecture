import { type FC, Children, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const TableStructure: FC<Props> = ({ children }) => {
  const [tableHeader, tableBody] = Children.toArray(children)
  return (
    <div className='w-full rounded-2xl p-6 border-2 border-solid shadow-md text-left'>
        <div className='overflow-x-auto overflow-y-auto pb-2'>
          <table className='min-w-full border-collapse table-fixed'>
            {tableHeader}
            {tableBody}
          </table>
        </div>
      </div>
  )
}

export default TableStructure
