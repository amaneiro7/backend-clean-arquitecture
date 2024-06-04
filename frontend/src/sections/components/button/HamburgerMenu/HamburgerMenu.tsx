import './HambuergerMenu.css'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isActive: boolean
}
export function HamburgerMenu({ isActive, ...pros }: Props) {
    return (
        <button
            {...pros}
            aria-label="Menu de navegación"
            aria-haspopup
            type="button"
            className={`hamburger hamburger--spin bg-transparent ${isActive && 'is-active [&>span>span]:bg-primary [&>span>span]:before:bg-primary [&>span>span]:after:bg-primary'}`}
        >
            <span className="hamburger-box  ">
                <span className='hamburger-inner bg-primary before:bg-primary after:bg-primary'></span>
            </span>
        </button>

    )
}