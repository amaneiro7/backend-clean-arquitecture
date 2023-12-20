interface Props {
  children: React.ReactNode

}

export const FormContainer = ({ children }: Props) => {
  return (
        <section className="w-full grid place-content-center">
            {children}
        </section>
  )
}
