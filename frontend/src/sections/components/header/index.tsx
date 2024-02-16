import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { routes } from '../../Context/routes'
import Logo from '../../ui/Logo'
// import logo from '../../../src/assets/Logo.png'

export default function Header () {
  const { useAuth: { user } } = useAppContext()
  return (
      <header className='w-full sticky top-0 z-10 bg-white'>
        <nav className='grid w-full min-h-[100px] text-secondary grid-cols-3 place-content-center shadow-md'>
          <div className='flex-1 pl-5'>
            <Link to={'/'}>
              <Logo/>
            </Link>
          </div>
          <li className='flex gap-8 [&>a]:transition-all'>
            {routes.map(route => {
              if (route.auth === 'private' && user == null) return null
              if (route.auth === 'public' && user != null) return null

              return (
                  <NavLink
                  key={route.id}
                    className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined}
                    to={route.path}
                  >
                    {route.name} <br />
                  </NavLink>

              )
            })}
          </li>
            {/* <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/device/add'>Agregar <br /></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/dashboard'>Dashboard <br /></NavLink>
            {user !== undefined ? <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/login'>Iniciar Sesión <br /></NavLink> : null} */}
        </nav>
      </header>
  )
}
