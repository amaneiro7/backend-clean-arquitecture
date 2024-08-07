export function WrapperBox({ isActive }: { isActive: boolean }) {
    return (
      <div className={`-left-full top-16 h-screen fixed w-full bg-secondary-950/50 will-change-transform transition-transform duration-300 ease-in-out ${isActive && 'translate-x-full'}`} />
    )
}