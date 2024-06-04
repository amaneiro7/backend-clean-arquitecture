import { PropsWithChildren, Suspense, lazy } from 'react'
import Loading from './Loading'

// const Header = lazy(async () => await import('./header'))
const Header = lazy(async () => await import('./header-new/Header').then(m => ({ default: m.Header })))
const Footer = lazy(async () => await import('./Footer'))

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      {children}
      <Footer />
    </Suspense>
  )
}
