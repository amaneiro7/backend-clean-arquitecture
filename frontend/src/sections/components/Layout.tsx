import { lazy, memo, Suspense } from "react"
import { Outlet } from "react-router-dom"
import { AppContextProvider } from "../Context/AppProvider"

const Header = lazy(async () => await import("./header/Header").then((m) => ({ default: m.Header })))
const Footer = lazy(async () => await import("./Footer"))
const Main = lazy(async () => await import("./Main"))

const Layout = memo(() => {
    return (
      <AppContextProvider>
        <Suspense fallback={<header className='min-h-16 h-16 bg-secondary' />}>
          <Header />
        </Suspense>
        <Suspense fallback={<main className='min-h-screen h-screen bg-gray-100' />}>
          <Main>
            <Outlet />
          </Main>
        </Suspense>
        <Suspense fallback={<footer className='min-h-8 h-8 bg-slate-700' />}>
          <Footer />
        </Suspense>
      </AppContextProvider>
    )
  }
)

export default Layout