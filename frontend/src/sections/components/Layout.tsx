import { lazy } from "react";

const Header = lazy(async () => await import("./header/Header").then((m) => ({ default: m.Header })));
const Footer = lazy(async () => await import("./Footer"));

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {children}      
      <Footer />      
    </>
  );
}
