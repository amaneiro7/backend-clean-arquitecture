import { useState } from "react";
import { Link } from "react-router-dom";

interface Props<T> extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  value: string | number, 
  url?: string, 
  state?: T
}

export default function TableCell<T>({ value, url, state }: Props<T>) {
  const className = "w-full h-full max-w-[200px] text-left align-middle whitespace-nowrap text-ellipsis overflow-x-hidden overflow-y-visible break-words cursor-default"
  return (
    <td
      className='min-h-9 h-9 text-xs text-ellipsis border-b-2 border-b-gray-300 p-2'
      aria-label={`${value}`}
      title={`${value}`}
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
