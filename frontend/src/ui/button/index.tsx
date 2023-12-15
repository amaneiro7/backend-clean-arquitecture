interface Props {
  type: 'button' | 'submit' | 'reset' | undefined
  handle?: React.MouseEventHandler<HTMLButtonElement> | undefined
  text: string
  actionType: keyof typeof ACTIONTYPE
  isDisabled?: boolean
}

const ACTIONTYPE = {
  ACTION: 'text-white border-primary bg-primary',
  SAVE: 'text-white border-terciary bg-terciary',
  CANCEL: 'text-gray-400 border-gray-500 bg-gray-500',
  DELETE: 'text-white border-quaternary bg-quaternary'
} as const

const Button = ({ text, type, handle, isDisabled = false, actionType = 'ACTION' }: Props) => {
  return (
        <button
            type={type}
            onClick={handle}
            className={`w-max h-min py-2 px-12 text-lg align-middle text-center text-white rounded-md cursor-pointer border border-solid border-transparent transition-all duration-300 ease-in hover:opacity-70 text-g  ${ACTIONTYPE[actionType]}  `}
            disabled={isDisabled}
        >
            {text}
        </button>
  )
}

export default Button
