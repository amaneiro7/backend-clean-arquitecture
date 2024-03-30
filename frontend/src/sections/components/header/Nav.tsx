export const Nav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
        <nav className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
            {children}
        </nav>
  )
}
