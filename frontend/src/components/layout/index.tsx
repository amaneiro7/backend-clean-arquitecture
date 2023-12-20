import { Copyright } from '../../ui/copyright'
import { ToasterComponent } from '../../utils/toaster'
import Header from '../header'

interface Props {
  children: React.ReactNode
}
export const Layout = ({ children }: Props) => {
  return (
    <>
      <ToasterComponent />
      <Header />
      { children }
      <Copyright />
    </>
  )
}
