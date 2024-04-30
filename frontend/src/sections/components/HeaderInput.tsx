export function HeaderInput({ className, children }: React.PropsWithChildren<{ className?: string }>) {
    return (
        <header
            className={`min-h-min grid grid-cols-[repeat(auto-fit,_150px)] gap-5 place-content-center ${className}`}
        >
            {children}
        </header>
    )

}