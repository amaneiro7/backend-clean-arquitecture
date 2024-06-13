/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { HeaderNav } from './Header'
import { HamburguerMenu } from './HamburguerMenu'
import Button from '../button'
import { Nav } from './Nav'
import { Menu } from './Menu'

export interface DrapdownState {
  isActive: boolean
  index: number | null
}

export default function Header() {
  const location = useLocation()
  const [state, setState] = useState(false)
  const [drapdownState, setDrapdownState] = useState<DrapdownState>({ isActive: false, index: null })
  const { useAuth: { logout } } = useAppContext()

  const handleState = () => {
    setState(!state)
  }

  const handleDrapdownState = (index: number) => {
    setDrapdownState({ index, isActive: !drapdownState.isActive })
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (target != null && !target.closest('.nav-menu')) setDrapdownState({ isActive: false, index: null })
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
  useLayoutEffect(() => {
    setDrapdownState({ isActive: false, index: null })
  }, [location.pathname])
  return (
    <>
      <HeaderNav state={state}>
        <Nav>
          <div className='flex items-center justify-center py-3 md:py-5 md:block'>
            <Link to='/'>
              <Logo />
            </Link>
            <HamburguerMenu state={state} handleState={handleState} />
          </div>
          <Menu state={state} drapdownState={drapdownState} handleDrapdownState={handleDrapdownState} />
          <Button
            actionType='CLOSE'
            text='Cerrar Sesión'
            handle={logout}
            type='button'
          />
        </Nav>
      </HeaderNav>
      {state &&
        (<div className='z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden' onClick={handleState} />)}
    </>
  )
}
