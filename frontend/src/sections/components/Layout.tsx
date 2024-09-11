import { lazy, Suspense } from "react"
import { Outlet } from "react-router-dom"
import { AppContextProvider } from "../Context/AppProvider"

const Header = lazy(async () => await import("./header/Header").then((m) => ({ default: m.Header })))
const Footer = lazy(async () => await import("./Footer"))
const Main = lazy(async () => await import("./Main"))

export default function Layout() {
  return (
    <AppContextProvider>
      <Suspense fallback={<header className='min-h-16 h-16 bg-secondary' />}>
        <Header />
      </Suspense>
      <Suspense fallback={<main className='flex-1' />}>
        <Main overflow={false} content='max' className='pr-8'>
          <Outlet />
        </Main>
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
    </AppContextProvider>
  )
}
