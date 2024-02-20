import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'

import Logo from '../../ui/Logo'
import { routes } from '../../Routes/routes'
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
          <ul className='flex gap-8 [&>a]:transition-all'>
            {routes.map(route => {
              if (route.auth === 'private' && user == null) return null
              if (route.auth === 'public' && user != null) return null

              return (
                <li key={route.id} >
                  <NavLink
                    className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined}
                    to={route.path}
                  >
                    {route.name} <br />
                  </NavLink>
                </li>

              )
            })}
          </ul>
          <div>
            
          </div>
            {/* <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/device/add'>Agregar <br /></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/dashboard'>Dashboard <br /></NavLink>
            {user !== undefined ? <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/login'>Iniciar Sesión <br /></NavLink> : null} */}
        </nav>
      </header>
  )
}
