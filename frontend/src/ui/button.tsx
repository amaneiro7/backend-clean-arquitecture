interface Props {
  text: string
  type: 'button' | 'submit' | 'reset' | undefined
  handle: (event: React.MouseEventHandler<HTMLButtonElement>) => void
}
export function Button ({ text, type, handle }: Props) {
  return (
        <button
            type={type}
            onClick={handle}
            className="w-full text-white bg-secondary hover:bg-secondary/90 focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            {text}
        </button>
  )
}
