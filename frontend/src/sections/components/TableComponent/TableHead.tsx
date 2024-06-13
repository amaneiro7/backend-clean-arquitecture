function TableHead({ name }: { name: string }) {
  return (
    <th className='min-w-32 w-fit p-2 text-xs font-bold tracking-wider text-left whitespace-nowrap capitalize'>
      {name}
    </th>
  )
}

export default TableHead
