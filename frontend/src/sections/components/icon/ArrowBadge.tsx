import ArrowBadge from './arrow-badge.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function ArrowBadgeIcon({...props}:Props) {
  return (
    <i>
      <ArrowBadge {...props} />
    </i>
  )
}
