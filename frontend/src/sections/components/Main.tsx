export default function Main ({ children, className }: { children: React.ReactNode, className?: string }) {
  return <main className={`${className ?? 'flex-1'} max-w-full h-full flex flex-col gap-5 p-4 overflow-hidden`}>{children}</main>
}
