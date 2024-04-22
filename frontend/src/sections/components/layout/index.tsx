import { Suspense, lazy } from 'react'
import { ToasterComponent } from '../../utils/toaster'
import Loading from '../Loading'
import { Footer } from '../Footer'

const Header = lazy(async () => await import('../header'))

interface Props {
  children: React.ReactNode
}
export const Layout = ({ children }: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <ToasterComponent />
      <Header />
      { children }
      <Footer />
    </Suspense>
  )
}
