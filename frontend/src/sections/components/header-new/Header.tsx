import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { type UserApiResponse } from "../../../modules/shared/domain/types/responseTypes";

const Nav = lazy(async () => import("./Nav").then((m) => ({ default: m.Nav })));
const WelcomeTitle = lazy(async () => import("./WelcomeTitle").then((m) => ({ default: m.WelcomeTitle })));
const HamburgerMenu = lazy(async () => import("../button/HamburgerMenu/HamburgerMenu").then((m) => ({ default: m.HamburgerMenu })));
const WrapperBox = lazy(async () => import("./WrapperBox").then((m) => ({ default: m.WrapperBox })));
const Logo = lazy(async () => import("../Logo"));
const Button = lazy(async () => import("../button"));

export function Header() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const {
    useAuth: { user, logout },
  } = useAppContext();

  const handleState = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    setIsActive(false);
  }, [location.pathname]);
  return (
    <header className='h-24 md:text-sm md:border-none gap-4 flex items-center justify-between md:top-0 md:sticky z-50 bg-secondary w-full shadow-lg pr-8 py-4'>
      <div className='pl-8 pr-3 p-2 bg-white rounded-e-full'>
        <Link aria-label='Logo' aria-describedby='Logo y un enlace al inicio de la página' to='/'>
          <Suspense>
            <Logo />
          </Suspense>
        </Link>
      </div>
      <Suspense>
        <WelcomeTitle user={user as unknown as UserApiResponse} />
      </Suspense>
      <div className='flex flex-1 items-center justify-end'>
        <Button aria-label='Botón para cerrar sesión del usuario' role='logout' actionType='ACTION' text='Cerrar Sesión' handle={logout} type='button' />
      </div>
      <HamburgerMenu onClick={handleState} isActive={isActive} />
      <WrapperBox isActive={isActive} />
      <Nav isActive={isActive} />
    </header>
  );
}
