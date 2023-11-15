interface Props {
  children: React.ReactNode
  title: string
}
export const FormContainer = ({ children, title }: Props) => {
  return (
        <section className="w-full h-screen grid place-content-center">
            <div>
              <h1>{title}</h1>
            </div>
            {children}
        </section>
  )
}
