export default function Main ({ children, className }: { children: React.ReactNode, className?: string }) {
  return <main className={`${className ?? 'md:flex-1'} mt-24 max-w-full h-full min-h-fit flex flex-col px-8 pt-4 pb-0 md:overflow-hidden`}>{children}</main>
}
