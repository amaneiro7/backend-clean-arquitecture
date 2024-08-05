interface Props extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  handleClick?: () => void
  value: string
  className: string
}

export default function TableButton({ handleClick, value, className, ...props }: Props) {
  return (
    <td
      {...props}
      className='min-h-9 h-9 min-w-20 text-xs text-ellipsis border-b-2 border-b-gray-300 p-2 text-transparent'
    >
      <button className={`text-white p-1 px-2 rounded-3xl ${className}`} onClick={handleClick}>{value}</button>
    </td>
  )
}
