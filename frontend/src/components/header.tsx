import { NavLink } from 'react-router-dom'
// import logo from '../../../src/assets/Logo.png'

export default function Header () {
  return (
      <header className='w-full sticky top-0 z-10 bg-white'>
        <nav className='grid w-full min-h-[100px] text-secondary grid-cols-3 place-content-center shadow-md'>
          <div className='flex-1 pl-5'>
            <a href='/'>
                InventarioAPP
              {/* <img src={logo} alt='Logo' /> */}
            </a>
          </div>
          <div className='flex gap-8 [&>a]:transition-all'>
            <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/'>Home <br /></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/addnewitem'>Agregar <br /></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-primary border-b border-primary' : undefined} to='/dashboard'>Dashboard <br /></NavLink>
          </div>
        </nav>
      </header>
  )
}
