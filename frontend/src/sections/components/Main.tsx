export default function Main ({ children, className }: { children: React.ReactNode, className?: string }) {
  return <main className={`${className ?? 'flex-1'} max-w-full h-full min-h-fit flex flex-col gap-5 px-8 pt-4 pb-0 md:overflow-auto`}>{children}</main>
}
