interface Props extends React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> {
  borderColor?: keyof typeof COLOR
 }

 const COLOR = {
   orange: 'border-primary-400',
   blue: 'border-secondary',
   green: 'border-terciary',
   red: 'border-quaternary',
 } as const

export function DetailsWrapper ({ borderColor = 'blue', children, ...props }: Props) {
    return (
      <section className={`w-11/12 flex flex-col gap-4 p-4 mb-5 border-t-2 rounded bg-gray-200 ${COLOR[borderColor]}`} {...props}>
        {children}
      </section>
    )
}