import { type FC, type PropsWithChildren } from 'react'
import CategorySelect from '../Device/category/CategorySelect'

interface Props {
}
const SearchInputs: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
        <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
            <CategorySelect />
            {children}
        </header>
  )
}

export default SearchInputs
