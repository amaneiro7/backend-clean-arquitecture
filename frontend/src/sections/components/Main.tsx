import { memo } from "react"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
  content?: "max" | "full"
  overflow?: boolean
}

const Main = memo(function({ children, className, content = "full", overflow = true }: React.PropsWithChildren<Props>) {
  return <main className={`${className ?? "md:flex-1"} max-w-full h-${content} max-h-min flex flex-col px-8 pt-4 pb-0 ${overflow && 'md:overflow-hidden'}`}>{children}</main>
})

export default Main