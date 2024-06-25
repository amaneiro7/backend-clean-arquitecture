import { useState } from "react";
import { Link } from "react-router-dom";

interface Props<T> extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  value: string | number, 
  url?: string, 
  state?: T
  size?: Size
}

type Size = 'w-20' | 'w-24' | 'w-28' | 'w-32' | 'w-36' | 'w-40' | 'w-44' | 'w-48' | 'w-52' | 'w-56' | 'w-60'

export default function TableCell<T>({ value, url, state, size = 'w-20', ...props }: Props<T>) {
  const className = `px-2 ${size} text-left align-middle whitespace-nowrap text-ellipsis overflow-hidden break-words cursor-default`
  return (
    <td
      className={`min-h-11 h-11 ${size} p-0 text-xs overflow-hidden whitespace-nowrap text-ellipsis border-b-2 border-b-gray-300`}
      aria-label={`${value}`}
      title={`${value}`}
      {...props}
    >
      {url ? <CellWithUrl state={state} value={value} className={className} url={url} /> : <NormalCell value={value} className={className} />}
    </td>
  )
}

function NormalCell({ value, className }: { value: string | number, className: string }) {
  return (
    <p className={className}>
      {value}
    </p>
  )
}
function CellWithUrl<T>({ value, className, url, state }: { value: string | number, className: string, url: string, state?: T }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <p
      className={className}
      onMouseOver={() => {
        setIsHovered(true)
      }}
      onMouseOut={() => {
        setIsHovered(false)
      }}
    >
      {isHovered ? <Link className='hover:text-secondary-700 hover:underline transition-colors duration-150' state={{ state }} to={url}>{`${value}`}</Link> : value}
    </p>
  )
}
