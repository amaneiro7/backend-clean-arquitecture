interface Props extends React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> { }

export function DetailsWrapper ({ children, ...props }: Props) {
    return (
      <section className='w-11/12 flex flex-col gap-4 p-4 border-t-2 border-secondary rounded bg-gray-200' {...props}>
        {children}
      </section>
    )
}