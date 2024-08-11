import { lazy, useEffect, useImperativeHandle, forwardRef, useRef, useState } from "react"
import './filterContainer.css'

const CloseIcon = lazy(async () => import("../icon/CloseIcon").then(m => ({ default: m.CloseIcon })))

interface Props extends React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> { }

export type FilterContainerRef = {
  handleClose: () => void
  handleOpen: () => void
} 

const Component = ({ children, ...props }: Props, ref: React.Ref<FilterContainerRef>) => {
  const filterContainerRef = useRef(null)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  useImperativeHandle(ref, () => ({
    handleClose,
    handleOpen
  }))
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }
    // const handleClickOutside = (event: MouseEvent) => {
    //   event.stopPropagation()
    //   if (open && !event.target.closest('.filterContainerAside')) {
    //     console.log('close')
    //     handleClick()
    //   }
    // }

    document.addEventListener('keydown', handleKeyDown)
    // document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  
    return (
      <aside
        ref={filterContainerRef}
        style={{
          maxHeight: '80vh'
        }}
        className={`filterContainerAside z-20 -top-20 w-[450px] flex flex-col gap-4 will-change-transform rounded-md mb-2 max-h-min bg-white pl-10 p-4 pb-8 overflow-hidden border drop-shadow-md shadow-lg absolute -right-[514px] transition-all duration-75 ease-in-out ${open ? '-translate-x-[450px] opacity-100' : 'none'}`}
        {...props}
      >
        <button
          className='block top-0 left-0 z-30 self-start p-1'
          onClick={handleClose}
          title='Cerrar panel de filtros'
          tabIndex={1}
          aria-label='Cerrar Filtros'
        >
          <CloseIcon className='w-8 h-8 p-1 text-gray-800/55 rounded-full hover:bg-gray-200 transition-colors' />
        </button>
        <div className='p-1 w-full flex flex-col gap-4 overflow-auto overscroll-contain pr-6'>
          {children}
        </div>
      </aside>
    )
}

export const FilterContainer = forwardRef(Component)