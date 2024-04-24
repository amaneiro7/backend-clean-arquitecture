import { Tooltip } from '../Tooltip'

function TableCell ({ value }: { value: string | number }) {
  return (
    <td
      className="text-xs text-ellipsis border-b-2 border-b-gray-300 p-3 pb-2"
    >
      <Tooltip text={value}/>
    </td>)
}

export default TableCell
