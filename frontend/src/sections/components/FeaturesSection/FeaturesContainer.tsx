export default function FeaturesContainer ({ children }: { children: React.ReactNode }) {
  return <ul className="grid-flow-row gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">{children}</ul>
}
