import ArrowBadge from './arrow-badge.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function ArrowBadgeIcon({...props}: Props) {
  return (
    <i className='grid place-content-center'>
      <ArrowBadge {...props} />
    </i>
  )
}
