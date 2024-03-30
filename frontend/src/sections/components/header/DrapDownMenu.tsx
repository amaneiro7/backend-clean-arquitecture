import { NavLink } from 'react-router-dom'
import { type Navigation } from '../../Routes/routes'

export const DrapdownNavMenu: React.FC<{ route: Navigation }> = ({ route }) => {
  return (
        <div className="mt-6 inset-x-0 top-20 w-full md:absolute md:border-y md:shadow-md md:mt-0 bg-white">
        <ul className='max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3'>
            {route?.navs.map((dropdownItem, index) => (
                <li key={index}>
                    <DrapdownLabel label={dropdownItem.label} />
                    <ul className='mt-5 space-y-6'>
                        {dropdownItem.navs.map((navItem, index) => (
                            <li key={index} className="group">
                                <NavLink className='flex gap-3 items-center' to={navItem.path} >
                                <DrapDownIcon icon={navItem.icon} />
                                    <div>
                                        <NavItemTitle title={navItem.title} />
                                        <NavItemDesc desc={navItem.desc}/>
                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    </div>
  )
}

const DrapdownLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <p className="text-indigo-600 text-sm">
        {label}
    </p>
  )
}

const DrapDownIcon: React.FC<{ icon: string }> = ({ icon }) => {
  return (
    <div className='w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center duration-150 group-hover:bg-indigo-600 group-hover:text-white md:w-14 md:h-14'>
        {icon}
    </div>
  )
}

const NavItemTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <span className="text-gray-800 duration-200 group-hover:text-indigo-600 text-sm font-medium md:text-base">
        {title}
    </span>
  )
}

const NavItemDesc: React.FC<{ desc: string }> = ({ desc }) => {
  return (
    <p className='text-sm text-gray-600 group-hover:text-gray-800 mt-1'>
        {desc}
    </p>
  )
}
