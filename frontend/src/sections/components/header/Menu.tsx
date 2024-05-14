import { type DrapdownState } from '.'
import { navigation } from '../../Routes/routes'
import { DrapDownButton } from './DrapDownButton'
import { DrapdownNavMenu } from './DrapDownMenu'
import { NavMenu } from './NavMenu'

interface Props {
  state: boolean
  handleDrapdownState: (index: number) => void
  drapdownState: DrapdownState

}

export const Menu: React.FC<Props> = ({ state, handleDrapdownState, drapdownState }) => {
  return (
    <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
      <ul className='items-center space-y-6 md:flex md:space-x-6 md:space-y-0 [&>a]:transition-all'>
        {navigation.map((route, index) => {
          return (
            <li key={index}>
              {
                (route.isDrapdown ?? false)
                  ? (<DrapDownButton index={index} handleDrapdownState={handleDrapdownState} drapdownState={drapdownState} route={route} />)
                  : (<NavMenu route={route} />)
              }
              {
                (route.isDrapdown) && drapdownState.index === index && drapdownState.isActive
                  ? (<DrapdownNavMenu route={route} />)
                  : ''
              }
            </li>
          )
        })}
      </ul>
    </div>
  )
}
