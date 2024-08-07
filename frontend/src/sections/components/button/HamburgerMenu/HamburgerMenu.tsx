import './HambuergerMenu.css'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isActive: boolean
}
export function HamburgerMenu({ isActive, ...pros }: Props) {
    return (
      <button
        {...pros}
        aria-label='Menu de navegación'
        aria-haspopup
        type='button'
        className={`hamburger hamburger--spin bg-transparent ${isActive && 'is-active [&>span>span]:bg-white [&>span>span]:before:bg-white [&>span>span]:after:bg-white'}`}
      >
        <span className='hamburger-box'>
          <span className='hamburger-inner bg-white before:bg-white after:bg-white' />
        </span>
      </button>

    )
}