import Gear from './gear.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function GearIcon({...props}:Props) {
  return (
    <i>
      <Gear {...props} />
    </i>
  )
}
