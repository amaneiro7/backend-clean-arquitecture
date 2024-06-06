interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}

export function TilesSection ({ children, ...props }: React.PropsWithChildren<Props>) {
  return <section {...props} className="flex justify-center py-8 select-none">{children}</section>
}
