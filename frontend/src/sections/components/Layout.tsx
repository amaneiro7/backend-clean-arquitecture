import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(async () => await import("./header/Header").then((m) => ({ default: m.Header })));
const Footer = lazy(async () => await import("./Footer"));

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />      
    </>
  );
}
