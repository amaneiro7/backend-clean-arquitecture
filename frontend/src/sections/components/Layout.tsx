import { PropsWithChildren, Suspense, lazy } from 'react'
import { ToasterComponent } from '../utils/toaster'
import Loading from './Loading'

const Header = lazy(async () => await import('./header'))
const Footer = lazy(async () => await import('./Footer'))

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<Loading />}>
      <ToasterComponent />
      <Header />
      {children}
      <Footer />
    </Suspense>
  )
}
