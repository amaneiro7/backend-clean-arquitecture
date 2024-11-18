import { lazy, useEffect, useImperativeHandle, forwardRef, useRef, useState, useCallback } from "react"
import './filterContainerStyle.css'

const CloseIcon = lazy(async () => import("../../icon/CloseIcon").then(m => ({ default: m.CloseIcon })))

type Props = React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

export type FilterContainerRef = {
  handleOpen: () => void
} 

const Component = ({ children, ...props }: Props, ref: React.Ref<FilterContainerRef>) => {
  const filterContainerRef = useRef(null)
  const [open, setOpen] = useState(false)
  
  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  useImperativeHandle(ref, () => ({
    handleOpen
  }))
  
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAndRemoveListener()
      }
    }
    
    function closeAndRemoveListener () {
      document.removeEventListener('keydown', handleKeyDown)
      handleOpen()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)      
    }
  }, [handleOpen, open])
  
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
          onClick={handleOpen}
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