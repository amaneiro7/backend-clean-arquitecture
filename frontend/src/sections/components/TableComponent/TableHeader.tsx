import type TableHead from "./TableHead"
import type TableRow from "./TableRow"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> {
  children: React.ReactElement<typeof TableRow<typeof TableHead>>
}

export default function TableHeader({ children, ...props }: Props) {
  return (
    <thead {...props} className='w-max min-w-max sticky z-10 top-0 drop-shadow-lg bg-secondary text-white'>
      {children}
    </thead>
  )
}
