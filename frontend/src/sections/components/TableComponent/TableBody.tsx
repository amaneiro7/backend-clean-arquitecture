import type TableCell from "./TableCell"
import type TableRow from "./TableRow"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> {
  children: Array<React.ReactElement<typeof TableRow<typeof TableCell>>>
}

function TableBody({ children, ...props }: Props) {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  )
}

export default TableBody
