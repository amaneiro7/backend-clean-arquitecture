import { useState } from "react";
import { Link } from "react-router-dom";

export default function TableCell({ value, url }: { value: string | number, url?: string }) {
  const className = "w-full max-w-[160px] text-left align-middle whitespace-nowrap text-ellipsis overflow-x-hidden overflow-y-visible break-words cursor-default"
  return (
    <td
      className="text-xs text-ellipsis border-b-2 border-b-gray-300 p-3 pb-2"
      aria-label={`${value}`}
      title={`${value}`}
    >
      {url ? <CellWithUrl value={value} className={className} url={url} /> : <NormalCell value={value} className={className} />}
    </td>)
}

function NormalCell({ value, className }: { value: string | number, className: string }) {
  return (
    <p className={className} >
      {value}
    </p>
  )
}
function CellWithUrl({ value, className, url }: { value: string | number, className: string, url: string }) {
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
      {isHovered ? <Link className="hover:text-secondary-700 hover:underline transition-colors duration-150" to={url}>{`${value}`}</Link> : value}
    </p>
  )
}
