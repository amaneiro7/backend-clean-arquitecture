interface Props {
  text: string
  color: 'action' | 'cancel'
  type: 'button' | 'submit' | 'reset' | undefined
  handle?: ((event: React.MouseEventHandler<HTMLButtonElement>) => void) | undefined
  isDisabled?: boolean
}

export function Button ({ text, type, handle, isDisabled = false, color = 'action' }: Props) {
  return (
        <button
            type={type}
            onClick={handle}
            className={`w-full text-white ${color === 'action' ? 'bg-secondary hover:bg-secondary/90' : 'bg-slate-500 hover:bg-slate-500/90'} focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 `}
            disabled={isDisabled}
        >
            {text}
        </button>
  )
}
