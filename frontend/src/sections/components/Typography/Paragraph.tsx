interface Props {
    variant?: 'p' | 'span'
    color?: keyof typeof COLOR
    text: string
}

const COLOR = {
    orange: 'text-primary',
    blue: 'text-secondary',
    green: 'text-terciary',
    red: 'text-quaternary',
    black: 'text-black',
    white: 'text-white',
  } as const

export function Paragraph({ variant, text }: Props) {
    const Tag = variant || 'p'
    return (
      <Tag className='text-xs md:text-sm lg:text-base'>{text}</Tag>
    )
}