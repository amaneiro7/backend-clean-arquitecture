import { Suspense, lazy } from 'react'
import { Copyright } from '../../ui/copyright'
import { ToasterComponent } from '../../utils/toaster'
import Loading from '../Loading'

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
      <Copyright />
    </Suspense>
  )
}
