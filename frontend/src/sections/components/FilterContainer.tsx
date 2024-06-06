interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    open: boolean
    handleClick: () => void
}

export function FilterContainer({ open, handleClick, children, ...props }: React.PropsWithChildren<Props>) {
    return (
      <aside
        className={`z-20 top-11 h-[500px] rounded-md mb-2 max-h-min bg-white float-right pl-10 p-4 overflow-hidden border drop-shadow-md shadow-lg absolute right-0 transition-all duration-500 ease-in-out ${open ? 'inline-flex flex-col gap-4 w-[450px]' : 'opacity-0 w-0'}`}
        {...props}
      >
        <button
          className='bg-white block top-0 left-0 z-30 self-start p-1 rounded-full aspect-square transition-colors hover:bg-slate-200'
          onClick={handleClick}
          title='Cerrar'
          tabIndex={1}
          aria-label='Cerrar Filtros'
        >
          x
        </button>
        <div className='w-full flex flex-col gap-4 overflow-auto overscroll-contain pr-6'>
          {children}
        </div>
      </aside>
    )
}