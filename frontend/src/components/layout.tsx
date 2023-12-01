import { Copyright } from '../ui/copyright'
import Header from './header'

interface Props {
  children: React.ReactNode
}
export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      { children }
      <Copyright />
    </>
  )
}
