import { forwardRef, useImperativeHandle, useRef} from "react"

export type DialogRef = {
    handleClose: () => void
    handleOpen: () => void
} 
function Dialog({ children }: React.PropsWithChildren, ref: React.Ref<DialogRef>) {
    const modalRef = useRef(null)
    const handleClose = () => {
        modalRef.current?.close()
    }
    const handleOpen = () => {
        modalRef.current?.showModal()
    }

    useImperativeHandle(ref, () => ({
        handleClose,
        handleOpen
     }))

    return (
      <dialog ref={modalRef} className='w-1/2 shadow-lg shadow-slate-500 rounded'>
        {children}
      </dialog>
    )
}
export const ExitModal = forwardRef(Dialog)