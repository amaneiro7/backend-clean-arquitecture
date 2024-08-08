import { lazy } from "react"
import { Link } from "react-router-dom"

const ThinRightIcon = lazy(async () => import("../icon/ThinRightIcon").then(m => ({ default: m.ThinRightIcon })))

export function InfoBoxTitle({ title, url, state }: { title: string, url?: string, state?: object }) {
    return (
      <h3
        className='inline-flex justify-between items-center font-sans font-bold text-secondary text-left text-xl mb-2'
      >
        <span>{title}</span>
        {url && 
          <span className='relative w-12 h-12'>
            <Link className='absolute w-full h-full' state={state} to={url} />
            <ThinRightIcon className='w-12 fill-secondary' />
          </span>}
      </h3>
    )
}