interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  handle?: React.MouseEventHandler<HTMLButtonElement> 
  text: string
  className?: string
  actionType: keyof typeof ACTIONTYPE
  isDisabled?: boolean
  icon?: JSX.Element
  size? : 'full' | 'content'
}


const ACTIONTYPE = {
  ACTION: 'border-none text-white bg-primary hover:bg-primary-700 active:bg-primary-800',
  SAVE: 'border-none text-white border-terciary bg-terciary hover:bg-terciary-600 active:bg-terciary-800',
  CANCEL: 'border-none text-gray-400 border-gray-500 bg-gray-500 hover:bg-gray-400 active:bg-gray-600',
  SECONDARY: `text-secondary border border-secondary bg-white hover:text-white hover:bg-secondary`,
  DELETE: 'border-none text-white border-quaternary bg-quaternary hover:bg-quaternary-500 active:bg-quaternary-quaternary-700',
  CLOSE: 'border-none text-white border-secondary bg-secondary-800 hover:bg-secondary-700 active:bg-secondary-950'
} as const

export default function Button({ text, icon, className, handle, isDisabled = false, size = 'content', actionType = 'ACTION', ...props }: Props) {
  return (
    <button      
      onClick={handle}      
      className={`flex justify-center items-center gap-2 min-h-11 h-11 py-2 px-4 font-medium text-base rounded-md cursor-pointer border border-solid seco transition-all duration-150 ease-in disabled:opacity-70 disabled:cursor-not-allowed ${className} ${ACTIONTYPE[actionType]} ${size === 'content' ? 'w-max' : size === 'full' && 'w-full'}`}
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