function TableHead({ name }: { name: string }) {
  return (
    <th className='min-h-11 max-h-11 h-11 min-w-32 w-fit p-2 text-xs font-bold tracking-wider text-left whitespace-nowrap capitalize'>
      {name}
    </th>
  )
}

export default TableHead
