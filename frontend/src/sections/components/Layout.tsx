import { PropsWithChildren, Suspense, lazy } from "react";

//const Header = lazy(async () => await import('./header'))
const Header = lazy(async () => await import("./header-new/Header").then((m) => ({ default: m.Header })));
const Footer = lazy(async () => await import("./Footer"));

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      {children}
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
