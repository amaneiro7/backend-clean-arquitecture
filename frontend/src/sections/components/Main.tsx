import { memo } from "react"

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
  content?: keyof typeof HeightView
  overflow?: boolean
}

const HeightView = {
  max: 'h-max',
  full: 'h-full'
} as const

const Main = memo(function({ children, className, content = "full", overflow = true }: React.PropsWithChildren<Props>) {
  return <main className={`max-w-full ${HeightView[content]} max-h-min flex flex-col pl-8 pt-4 pb-0 md:flex-1 ${overflow && 'md:overflow-hidden'} ${className}`}>{children}</main>
})

export default Main