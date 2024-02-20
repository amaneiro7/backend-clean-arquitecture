import { Link, NavLink } from 'react-router-dom'
import Logo from '../../ui/Logo'
import { navigation } from '../../Routes/routes'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'

export default function Header () {
  const [state, setState] = useState(false)
  const [drapdownState, setDrapdownState] = useState<{ isActive: boolean, index: number | null }>({ isActive: false, index: null })
  const { useAuth: { logout } } = useAppContext()

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target
      if (target != null && !target.closest('.nav-menu')) setDrapdownState({ isActive: false, index: null })
    }
  }, [])
  return (
    <>
      <header className={`relative z-20 bg-white w-full md:static md:text-sm md:border-none ${state ? 'shadow-lg rounded-b-xl md:shadow-none' : ''}`}>
        <nav className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <Link to={'/'}>
              <Logo/>
            </Link>
            <div className="md:hidden">
                <button className="text-gray-500 hover:text-gray-800" onClick={() => { setState(!state) }} >
                    {
                        state
                          ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            )
                          : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                            </svg>

                            )
                    }
                </button>
            </div>
          </div>
          <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
            <ul className='items-center space-y-6 md:flex md:space-x-6 md:space-y-0 [&>a]:transition-all'>
              {navigation.map((route, index) => {
                return (
                  <li key={index}>
                    {
                      (route.isDrapdown ?? false)
                        ? (
                            <button
                              className="w-full flex items-center justify-between gap-1 text-gray-700 hover:text-indigo-600"
                              onClick={() => {
                                setDrapdownState({ index, isActive: !drapdownState.isActive })
                              }}
                            >
                              {route.name}
                            {
                                drapdownState.index === index && drapdownState.isActive
                                  ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                                    </svg>

                                    )
                                  : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                    )
                            }
                        </button>
                          )
                        : (
                    <NavLink
                      className={({ isActive }) => isActive ? 'text-primary border-b-4 border-primary' : undefined}
                      to={route.path}
                    >
                      {route.name} <br />
                    </NavLink>

                          )
                    }
                    {
                      (route.isDrapdown === true) && drapdownState.index === index && drapdownState.isActive
                        ? (
                        <div className="mt-6 inset-x-0 top-20 w-full md:absolute md:border-y md:shadow-md md:mt-0">
                            <ul className='max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3'>
                                {route?.navs.map((dropdownItem, index) => (
                                    <li key={index}>
                                        <p className="text-indigo-600 text-sm">{dropdownItem.label}</p>
                                        <ul className='mt-5 space-y-6'>
                                            {dropdownItem.navs.map((navItem, index) => (
                                                <li key={index} className="group">
                                                    <a href={navItem.path} className='flex gap-3 items-center'>
                                                        <div className='w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center duration-150 group-hover:bg-indigo-600 group-hover:text-white md:w-14 md:h-14'>
                                                            {navItem.icon}
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-800 duration-200 group-hover:text-indigo-600 text-sm font-medium md:text-base">{navItem.title}</span>
                                                            <p className='text-sm text-gray-600 group-hover:text-gray-800 mt-1'>{navItem.desc}</p>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                          )
                        : ''
                    }
                  </li>

                )
              })}
            </ul>
          </div>
          <div className='flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0'>
              <button
                className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
                onClick={logout}
              >
                  Cerrar Cesión
              </button>

          </div>
            {/* <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/device/add'>Agregar <br /></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/dashboard'>Dashboard <br /></NavLink>
            {user !== undefined ? <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/login'>Iniciar Sesión <br /></NavLink> : null} */}
        </nav>
      </header>
      {state
        ? (<div className='z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden' onClick={(() => { setState(false) })}></div>)
        : ''
      }
      </>
  )
}
