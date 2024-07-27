import { forwardRef, useImperativeHandle, useRef, useState} from "react"

export type DialogRef = {
    handleClose: () => void
    handleOpen: () => void
} 
function Dialog({ children }: React.PropsWithChildren, ref: React.Ref<DialogRef>) {
    const modalRef = useRef(null)
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
        setTimeout(() => {
            modalRef.current?.close()            
        }, 150);
    }
    const handleOpen = () => {
        modalRef.current?.showModal()
        setOpen(true)
    }

    useImperativeHandle(ref, () => ({
        handleClose,
        handleOpen
     }))

    return (
      <dialog ref={modalRef} className={`w-1/2 shadow-lg shadow-slate-500 rounded transition ease-out duration-300 ${open ? 'translate-y-0' : '-translate-y-96'} backdrop:bg-black/35`}>
        {children}
      </dialog>
    )
}
export const ConfirmationDialog = forwardRef(Dialog)