interface Props {
    variant?: 'p' | 'span'
    color?: keyof typeof COLOR
    backgroundColor?: keyof typeof BGCOLOR
    className?: string
    text: string
    icon?: JSX.Element
}

const COLOR = {
    orange: 'text-primary-400',
    blue: 'text-secondary',
    green: 'text-terciary',
    red: 'text-error',
    black: 'text-black',
    gray: 'text-cancel',
    white: 'text-white',
  } as const

  const BGCOLOR = {
    orange: 'bg-primary-700',
    blue: 'bg-secondary-800',
    green: 'bg-terciary',
    red: 'bg-error',
    black: 'bg-black',
    gray: 'bg-cancel',
    white: 'bg-white',
    none: 'bg-transparent'
  } as const

export function Paragraph({ variant, icon, color = 'black', backgroundColor = 'none', text, className }: Props) {
    const Tag = variant || 'p'
    return (
      <Tag className={`${icon === undefined ? 'text-xs md:text-sm lg:text-base' : `w-fit text-xs md:text-xs lg:text-sm inline-flex items-center gap-1 rounded-md px-2 py-1 ${BGCOLOR[backgroundColor]}`} ${COLOR[color]} ${className}`}>{icon}{text}</Tag>
    )
}