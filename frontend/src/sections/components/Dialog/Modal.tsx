import { forwardRef, useImperativeHandle, useRef} from "react"
import './Modal.css'
export type ModalRef = {
    handleClose: () => void
    handleOpen: () => void
} 
function Dialog({ children }: React.PropsWithChildren, ref: React.Ref<ModalRef>) {
    const modalRef = useRef(null)
    
    const handleOpen = () => { modalRef.current?.showModal() }
    const handleClose = () => { modalRef.current?.close() }

    useImperativeHandle(ref, () => ({
        handleClose,
        handleOpen
     }))

    return (
      <dialog ref={modalRef} className='modalDialog w-1/2 shadow-lg shadow-slate-500 rounded backdrop:bg-black/35'>
        {children}
      </dialog>
    )
}
export const Modal = forwardRef(Dialog)