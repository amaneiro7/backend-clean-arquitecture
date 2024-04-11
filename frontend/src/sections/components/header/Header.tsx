export const HeaderNav: React.FC<{ children: React.ReactNode, state: boolean }> = ({ children, state }) => {
  return (
        <header className={`relative z-50 bg-white w-full md:static md:text-sm md:border-none ${state ? 'shadow-lg rounded-b-xl md:shadow-none' : ''}`}>
            {children}
        </header>
  )
}
