interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}

export function TilesSection ({ children, ...props }: React.PropsWithChildren<Props>) {
  return <section {...props} className="max-w-full flex justify-center -mx-4 py-8 select-none">{children}</section>
}
