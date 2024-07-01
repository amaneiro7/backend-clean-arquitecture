import { Link } from "react-router-dom"

interface Props {    
    text: string
    actionType: keyof typeof ACTIONTYPE
    url: string
    icon?: JSX.Element
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
  
  export function LinkAsButton ({ text, hoverTranslate, icon, url, actionType = 'ACTION' }: Props) {
    return (
      <Link                        
        className={`w-max h-min flex justify-center items-center gap-2 py-2 px-4 font-medium text-base align-middle text-center text-white rounded-md cursor-pointer border border-solid border-transparent transition-all duration-150 ease-in disabled:opacity-70 disabled:cursor-not-allowed ${hoverTranslate && 'hover:shadow-lg hover:-translate-y-1'} ${ACTIONTYPE[actionType]}`}              
        aria-label={`${text}`}
        title={`${text}`}
        to={url}
      >
        {icon}
        {text}
      </Link>
    )
  }