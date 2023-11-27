interface Props {
  type: 'button' | 'submit' | 'reset' | undefined
  handle?: React.MouseEventHandler<HTMLButtonElement> | undefined
  text: string
  actionType: 'action' | 'cancel'
  isDisabled?: boolean
}

const ACTIONTYPE = {
  ACTION: '',
  SAVE: '',
  CANCEL: '',
  DELETE: ''
} as const

export function Button ({ text, type, handle, isDisabled = false, actionType = 'action' }: Props) {
  return (
        <button
            type={type}
            onClick={handle}
            className={`w-max h-min py-2 px-12  text-white ${actionType === 'action' ? 'bg-secondary hover:bg-secondary/90' : 'bg-slate-500 hover:bg-slate-500/90'} focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 `}
            disabled={isDisabled}
        >
            {text}
        </button>
  )
}
