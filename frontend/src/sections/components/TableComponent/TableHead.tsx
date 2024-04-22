function TableHead ({ name }: { name: string }) {
  return (
    <th className="p-3 pl-2 text-xs text-left w-fit whitespace-nowrap capitalize">
      {name}
    </th>
  )
}

export default TableHead
