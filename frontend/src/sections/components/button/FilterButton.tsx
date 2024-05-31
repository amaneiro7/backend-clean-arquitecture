import { FilterIcon } from "../icon/FilterIcon";
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { }
export function FilterButon({ ...props }: Props) {
    return (
        <button
            className="self-end place-self-end h-10 px-4 w-min p-1 rounded-md flex items-center border border-secondary-800 text-secondary-800 hover:text-secondary"
            type="button"
            {...props}
        >
            <FilterIcon />
            Filtros
        </button>
    )
}