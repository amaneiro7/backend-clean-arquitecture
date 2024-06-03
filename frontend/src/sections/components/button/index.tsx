interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  handle?: React.MouseEventHandler<HTMLButtonElement> | undefined
  text: string
  className?: string
  actionType: keyof typeof ACTIONTYPE
  isDisabled?: boolean
}


const ACTIONTYPE = {
  ACTION: 'text-white border-primary bg-primary hover:bg-primary-400 active:bg-primary-600',
  SAVE: 'text-white border-terciary bg-terciary hover:bg-terciary600 active:bg-terciary-800',
  CANCEL: 'text-gray-400 border-gray-500 bg-gray-500 hover:bg-gray-400 active:bg-gray-600',
  DELETE: 'text-white border-quaternary bg-quaternary hover:bg-quaternary-500 active:bg-quaternary-quaternary-700',
  CLOSE: 'text-white border-secondary bg-secondary-800 hover:bg-secondary-700 active:bg-secondary-950'
} as const

export default function Button({ text, type, className, handle, isDisabled = false, actionType = 'ACTION', ...props }: Props) {
  return (
    <button
      type={type}
      onClick={handle}
      className={`w-max h-min py-2 px-4 font-medium text-base align-middle text-center text-white rounded-md cursor-pointer border border-solid border-transparent transition-all duration-150 ease-in disabled:opacity-70 disabled:cursor-not-allowed ${className} ${ACTIONTYPE[actionType]}`}
      disabled={isDisabled}
      aria-label={`${text}`}
      title={`${text}`}
      {...props}
    >
      {text}
    </button>
  )
}