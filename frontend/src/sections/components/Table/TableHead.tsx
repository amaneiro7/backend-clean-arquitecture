type Props = React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> & {
  name: string
}

export function TableHead({ name, ...props }: Props) {
  return (
    <th 
      className='min-h-9 h-9 p-2 font-semibold tracking-wider text-left whitespace-nowrap capitalize'
      {...props}    
    >
      {name}
    </th>
  )
}
