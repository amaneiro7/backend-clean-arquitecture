function TableHead({ name }: { name: string }) {
  return (
    <th className='min-w-20 max-w-20 w-20 p-2 text-xs font-bold tracking-wider text-left whitespace-nowrap capitalize'>
      {name}
    </th>
  )
}

export default TableHead
