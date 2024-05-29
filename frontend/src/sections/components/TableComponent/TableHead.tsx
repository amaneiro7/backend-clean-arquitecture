function TableHead({ name }: { name: string }) {
  return (
    <th className="max-w-max p-2 text-xs font-bold tracking-wider text-left w-fit whitespace-nowrap capitalize">
      {name}
    </th>
  )
}

export default TableHead
