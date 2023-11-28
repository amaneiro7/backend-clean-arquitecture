interface Props {
  type: 'button' | 'submit' | 'reset' | undefined
  handle?: React.MouseEventHandler<HTMLButtonElement> | undefined
  text: string
  actionType: typeof ACTIONTYPE[indexof ]
  isDisabled?: boolean
}

const ACTIONTYPE = {
  ACTION: 'text-white border-primary bg-primary',
  SAVE: 'text-white border-terciary bg-terciary',
  CANCEL: 'text-gray-400 border-gray-500 bg-gray-500',
  DELETE: 'text-white border-quaternary bg-quaternary'
} as const

export function Button ({ text, type, handle, isDisabled = false, actionType = 'action' }: Props) {
  return (
        <button
            type={type}
            onClick={handle}
            className={`w-max h-min py-2 px-12 text-lg align-middle text-center text-white rounded-md cursor-pointer border border-solid border-transparent transition-all duration-300 ease-in hover:opacity-70 text-g  ${actionType === 'action' ? 'bg-terciary hover:bg-secondary/90' : 'bg-slate-500 hover:bg-slate-500/90'}  `}
            // className={`w-max h-min py-2 px-12  text-white ${actionType === 'action' ? 'bg-secondary hover:bg-secondary/90' : 'bg-slate-500 hover:bg-slate-500/90'} focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 `}
            disabled={isDisabled}
        >
            {text}
        </button>
  )
}
