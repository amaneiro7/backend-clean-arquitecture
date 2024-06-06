import { lazy, Suspense } from "react"
import { Link } from "react-router-dom"
const ArrowBadgeIcon = lazy(async () => import("../icon/ArrowBadge").then((m) => ({ default: m.ArrowBadgeIcon })))

interface Props {
    label: string
    url: string
}
export function TilesInvisibleInfo({label, url}: Props) {
  return (
    <li className='list-item pb-3'>
      <Link style={{ textShadow: "0 1px 2px #00000099" }} className='flex font-light' to={url}>
        <Suspense>
          <ArrowBadgeIcon size='w-6' color='white' />
        </Suspense>
        {label}
      </Link>
    </li>
  );
}
