export function HeaderInput({ className, children }: React.PropsWithChildren<{ className?: string }>) {
    return (
      <header
        className={`relative h-10 min-h-min w-full grid grid-cols-[repeat(auto-fit,_150px)] gap-4 ${className}`}
      >
        {children}
      </header>
    )

}