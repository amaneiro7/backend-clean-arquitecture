interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    handle?: React.MouseEventHandler<HTMLButtonElement> | undefined
    text: string
    className?: string
    actionType: keyof typeof ACTIONTYPE
    isDisabled?: boolean
    icon?: JSX.Element
    color: Color
  }
  
  type Color = 'primary' | 'secondary' | 'terciary' | 'quaternary' | 'black' | 'white'
  
  const ACTIONTYPE = {
    PRIMARY: (color: Color) => `text-white border-${color} bg-${color} hover:brightness-95 active:brightness-90`,
    SECONDARY: (color: Color) => `text-${color} border border-${color} bg-white hover:text-white hover:bg-secondary`,
    TERCIARY: (color: Color) => `text-${color}/90 hover:text-${color}`
  } as const
  
  export function Button({ text, color, icon, className, handle, isDisabled = false, actionType, ...props }: Props) {
    return (
      <button      
        onClick={handle}      
        className={`flex gap-2 items-center w-max h-min py-2 px-4 font-medium text-base align-middle text-center rounded-md cursor-pointer border border-solid transition-all duration-100 ease-in disabled:opacity-70 disabled:cursor-not-allowed ${className} ${ACTIONTYPE[actionType](color)}`}
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