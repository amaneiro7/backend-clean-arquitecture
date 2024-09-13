import { lazy, Suspense } from "react"
import { Outlet } from "react-router-dom"
import { AppContextProvider } from "../Context/AppProvider"

const Header = lazy(async () => await import("./header/Header").then((m) => ({ default: m.Header })))
const Footer = lazy(async () => await import("./Footer"))

export default function Layout() {
  return (
    <AppContextProvider>
      <Suspense fallback={<header className='min-h-16 h-16 bg-secondary' />}>
        <Header />
      </Suspense>
      <Outlet />
      <Suspense>
        <Footer />
      </Suspense>
    </AppContextProvider>
  )
}
