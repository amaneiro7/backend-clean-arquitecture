interface Props extends React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>{
  name: string
  size?: Size
}

type Size = 'min-w-20' | 'min-w-24' | 'min-w-28' | 'min-w-32' | 'min-w-36' | 'min-w-40' | 'min-w-44' | 'min-w-48' | 'min-w-52' | 'min-w-56' | 'min-w-60' 

function TableHead({ name, size, ...props }: Props) {
  return (
    <th {...props} className={`min-h-11 h-11 ${size} p-2 text-xs font-bold tracking-wider text-left whitespace-nowrap capitalize`}>
      {name}
    </th>
  )
}

export default TableHead
