interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}

export default function Section ({ children, ...props }: React.PropsWithChildren<Props>) {
  return <section {...props} className="p-8">{children}</section>
}
