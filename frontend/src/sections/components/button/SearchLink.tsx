import { lazy } from "react";
import { Link, LinkProps } from "react-router-dom";

interface Props extends LinkProps {
    title: string
    isDisabled?: boolean
}

const SearchIcon = lazy(async () => import('../icon/SearchIcon').then(m => ({ default: m.SearchIcon })))
export function SearchLink ({ to, title, isDisabled, ...props }: Props) {
    return (
      <span className='relative'>
        <Link 
          className={`absolute w-full h-full ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
          to={isDisabled ? '#' : to} 
          title={title} 
          aria-disabled={isDisabled}
          {...props}
        />
        <SearchIcon width={24} className={`aspect-square ${isDisabled ? 'stroke-secondary/5' : 'stroke-secondary'} stroke-[3px]`} />

      </span>
    )
}