import { lazy, Suspense } from "react";

const LazyLogoImage = lazy(async () => import("../components/lazyImages/LazyLogoImage").then((m) => ({ default: m.LazyLogoImage })));
export default function Logo() {
  return (
    <div className="flex gap-2 divide-x-2 divide-secondary-900 items-center">
      <Suspense>
        <LazyLogoImage className="max-w-11 bg-contain w-28 h-11 clear-none" />
      </Suspense>
      <h1 className="pl-2 hidden md:flex flex-col text-2xl font-semibold text-secondary dark:text-white">
        SoporteTecnico
        <span className="text-sm text-secondary-950/80">Aplicacion de Inventario</span>
      </h1>
    </div>
  );
}
