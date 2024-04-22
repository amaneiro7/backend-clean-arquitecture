import { NavLink } from 'react-router-dom'
import { type Navigation } from '../../Routes/routes'

export function NavMenu ({ route }: { route: Navigation }) {
  return (
      <NavLink
        className={({ isActive }) => isActive ? 'text-primary border-b-4 border-primary' : undefined}
        to={route.path}
      >
        {route.name} <br />
      </NavLink>
  )
}
