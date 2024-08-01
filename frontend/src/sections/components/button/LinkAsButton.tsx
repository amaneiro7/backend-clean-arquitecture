import { Link } from "react-router-dom"

interface Props {    
    text: string
    className?: string
    actionType: keyof typeof ACTIONTYPE
    url: string
    icon?: JSX.Element
    size? : 'full' | 'content'
    hoverTranslate?: boolean
  }
  
  
  const ACTIONTYPE = {
    ACTION: 'border-none text-white bg-primary hover:bg-primary-700 active:bg-primary-800',
    SAVE: 'border-none text-white border-terciary bg-terciary hover:bg-terciary-800 active:bg-terciary-900',
    CANCEL: 'text-cancel border-cancel bg-gray-200 hover:text-white hover:bg-cancel active:bg-cancel hover:shadow-md',
    SECONDARY: `text-secondary border border-secondary bg-white hover:text-white hover:bg-secondary`,
    DELETE: 'border-none text-white border-quaternary bg-quaternary hover:bg-quaternary-500 active:bg-quaternary-quaternary-700',
    CLOSE: 'border-none text-white border-secondary bg-secondary-800 hover:bg-secondary-700 active:bg-secondary-950'
  } as const
  
  export function LinkAsButton ({ text, hoverTranslate, className, icon, url, actionType = 'ACTION', size = 'content' }: Props) {
    return (
      <Link                        
        className={`flex justify-center items-center gap-2 min-h-11 h-11 py-2 px-4 font-medium text-base rounded-md cursor-pointer border border-solid transition-all duration-200 ease-in disabled:opacity-70 disabled:cursor-not-allowed ${hoverTranslate && 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'} ${className} ${ACTIONTYPE[actionType]} ${size === 'content' ? 'w-max' : size === 'full' && 'w-full'}`}          
        aria-label={`${text}`}
        title={`${text}`}
        to={url}
        replace
      >
        {icon}
        {text}
      </Link>
    )
  }