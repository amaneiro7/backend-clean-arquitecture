import { Link } from "react-router-dom";
import { navigation } from "../../Routes/new.routes";
import { lazy, Suspense } from "react";
const ArrowBadge = lazy(async () => import("../icon/ArrowBadge").then((m) => ({ default: m.ArrowBadgeIcon })));

export function Nav({ isActive }: { isActive: boolean }) {
  return (
    <nav
      className={`-right-2/3 fixed top-24 p-8 max-w-2/3 md:w-1/2 overflow-visible z-40 text-white bg-secondary-950/95 transition-transform transform-gpu will-change-transform duration-300 ease-in-out ${
        isActive && "-translate-x-full"
      }`}
    >
      {navigation.map((nav) => (
        <ul key={nav.label}>
          <li>
            <h3 key={nav.label} className='text-2xl font-medium'>
              {nav.label}
            </h3>
            <ul className='mt-4 mb-3'>
              {nav.navs.map((item, index) => (
                <li key={index} className='list-item'>
                  <Link
                    to={item.path}
                    className='font-body text-base text-center tracking-wide h-8 px-4 py-2 font-semibold flex items-center hover:text-primary transition-colors'
                    aria-label={item.title}
                    aria-description={item.desc}
                  >
                    <Suspense>
                      <ArrowBadge size='w-6' color='primary' />
                    </Suspense>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </nav>
  );
}
