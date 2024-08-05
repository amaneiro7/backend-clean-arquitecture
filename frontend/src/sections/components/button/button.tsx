interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  handle?: React.MouseEventHandler<HTMLButtonElement> 
  text: string
  className?: string
  actionType: keyof typeof ACTIONTYPE
  isDisabled?: boolean
  icon?: JSX.Element
  size? : keyof typeof SIZE
  buttonSize: keyof typeof BUTTONSIZE
  hoverTranslate?: boolean
}

const SIZE = {
  full: 'w-full',
  content: 'w-max',  
}
const BUTTONSIZE = {  
  small: 'min-h-6 h-6 py-1 px-2 text-sx',
  medium: 'min-h-8 h-8 py-2 px-2 text-sm',
  large: 'min-h-11 h-11 py-2 px-4 text-base'
}

const ACTIONTYPE = {
  ACTION: 'border-none text-white bg-primary hover:bg-primary-700 disabled:bg-primary-700 active:bg-primary-800',
  SAVE: 'border-none text-white border-terciary bg-terciary hover:bg-terciary-800 disabled:bg-terciary-800 active:bg-terciary-900',
  CANCEL: 'text-cancel border-cancel bg-gray-200 hover:text-white hover:bg-cancel active:bg-cancel hover:shadow-md',
  SECONDARY: `text-secondary border border-secondary bg-white hover:text-white hover:bg-secondary disabled:bg-secondary`,
  DELETE: 'border-none text-white border-quaternary bg-quaternary hover:bg-quaternary-500 disabled:bg-quaternary-500 active:bg-quaternary-quaternary-700',
  CLOSE: 'border-none text-white border-secondary bg-secondary-800 hover:bg-secondary-700 disabled:bg-secondary-700 active:bg-secondary-950'
} as const

export default function Button({ text, hoverTranslate, icon, className, handle, isDisabled = false, buttonSize = 'large', size = 'content', actionType = 'ACTION', ...props }: Props) {
  return (
    <button
      onClick={handle}      
      className={`flex justify-center items-center gap-2 ${BUTTONSIZE[buttonSize]} font-medium rounded-md cursor-pointer border border-solid transition-all duration-200 ease-in disabled:opacity-70 disabled:cursor-not-allowed ${hoverTranslate && 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'} ${className} ${ACTIONTYPE[actionType]} ${SIZE[size]}`}
      disabled={isDisabled}
      aria-label={`${text}`}
      title={`${text}`}
      {...props}
    >
      {icon}
      {text}
    </button>
  )
}