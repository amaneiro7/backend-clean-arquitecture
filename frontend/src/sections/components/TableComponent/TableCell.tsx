function TableCell ({ value }: { value: string }) {
  return (
    <td
      className="align-middle whitespace-nowrap border-b-2 border-b-gray-300 p-3 pb-2"
    >
        {value}
    </td>)
}

export default TableCell
