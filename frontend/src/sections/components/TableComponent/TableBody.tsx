interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> {}

function TableBody({ children, ...props }: React.PropsWithChildren<Props>) {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  )
}

export default TableBody
