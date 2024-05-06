function TableCell({ value }: { value: string | number }) {
  return (
    <td className="text-xs text-ellipsis border-b-2 border-b-gray-300 p-3 pb-2">
      <p
        className="w-full text-left align-middle whitespace-nowrap text-ellipsis overflow-x-hidden overflow-y-visible break-words cursor-default"
        aria-label={`${value}`}
        title={`${value}`}
      >
        {value ?? ''}
      </p>
    </td>)
}

export default TableCell
