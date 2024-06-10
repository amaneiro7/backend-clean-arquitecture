interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
}

export function HeaderInput({ className, children, ...props }: React.PropsWithChildren<Props>) {
    return (
      <section
        {...props}
        className={`relative h-10 min-h-min w-full grid grid-cols-[repeat(auto-fit,_150px)] gap-4 ${className}`}
      >
        {children}
      </section>
    )

}