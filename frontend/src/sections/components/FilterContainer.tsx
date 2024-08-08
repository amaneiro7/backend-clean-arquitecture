import { lazy } from "react"

const CloseIcon = lazy(async () => import("./icon/CloseIcon").then(m => ({ default: m.CloseIcon })))

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    open: boolean
    handleClick: () => void
}

export function FilterContainer({ open, handleClick, children, ...props }: React.PropsWithChildren<Props>) {
    return (
      <aside
        style={{
          height: '75vh'
        }}
        className={`z-20 top-0 w-[450px] flex flex-col gap-4 will-change-transform rounded-md mb-2 max-h-min bg-white pl-10 p-4 overflow-hidden border drop-shadow-md shadow-lg absolute -right-[450px] transition-all duration-75 ease-in-out scroll-smooth  ${open ? '-translate-x-[450px] opacity-100' : 'opacity-0'}`}
        {...props}
      >
        <button
          className='block top-0 left-0 z-30 self-start p-1'
          onClick={handleClick}
          title='Cerrar'
          tabIndex={1}
          aria-label='Cerrar Filtros'
        >
          <CloseIcon className='w-8 h-8 p-1 text-black rounded-full hover:bg-gray-200 transition-colors' />
        </button>
        <div className='p-1 w-full flex flex-col gap-4 overflow-auto overscroll-contain pr-6'>
          {children}
        </div>
      </aside>
    )
}