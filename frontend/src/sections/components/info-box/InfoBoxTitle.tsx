import { Link } from "react-router-dom"
import { ThinRightIcon } from "../icon/ThinRightIcon"

export function InfoBoxTitle({ title, url, state }: { title: string, url?: string, state?: object }) {
    return (
        <h3
            className="flex justify-between items-center font-sans font-bold text-secondary text-left text-xl mb-2"
        >
            <span>{title}</span>
            {url && <ThinRightIcon color="secondary" size="w-12">
                <Link className="absolute w-full h-full" state={state} to={url}></Link>
            </ThinRightIcon>}
        </h3>
    )
}