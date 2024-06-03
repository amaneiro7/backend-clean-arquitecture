export default function PageTitle ({ title }: { title: string }) {
  return <h1 className="min-h-fit mb-5 text-xl font-bold leading-tight tracking-tight text-secondary-950 md:text-2xl dark:text-white">{title}</h1>
}
