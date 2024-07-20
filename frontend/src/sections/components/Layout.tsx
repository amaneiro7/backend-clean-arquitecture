import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppContextProvider } from "../Context/AppProvider";

const Header = lazy(async () => await import("./header/Header").then((m) => ({ default: m.Header })));
const Footer = lazy(async () => await import("./Footer"));

export default function Layout() {
  return (
    <>
      <AppContextProvider>
        <Header />
        <Outlet />
        <Footer />      
      </AppContextProvider>
    </>
  );
}
