import Logout from './logout.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function LogoutIcon({...props}:Props) {
  return (
    <i>
      <Logout {...props} />
    </i>
  )
}
