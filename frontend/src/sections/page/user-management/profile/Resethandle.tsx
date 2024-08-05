import { lazy, useRef } from "react"
import { useUser } from "../../../Hooks/user/useUser"
import { type DialogRef } from "../../../components/Dialog/Modal"
import { tostPromise } from "../../../utils/toaster"

const ConfirmationDialog = lazy(async () => import("../../../components/Dialog/Modal").then(m => ({ default: m.ConfirmationDialog })))
const ConfirmationModal = lazy(async () => import("../../../components/Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const Button = lazy(async () => import("../../../components/button/button"))

export function ResetHandle ({id}: {id: string}) {
    const dialogResetRef = useRef<DialogRef>(null)
    const { resetPassword } = useUser()    
    const handleClose = () => {
        dialogResetRef.current?.handleClose()
    }
    
    const handleOpen = () => {
        dialogResetRef.current?.handleOpen()
    }

    const hanleReset = () => {
        tostPromise(resetPassword.reset({id}), {
            loading: 'Procesando...',
            success: () => {
                return 'Operacion exitosa'
            },
            error() {                
                return `Ha ocurrido un error`
            },
            description(data) {
                return `${data?.message}`
            },
            duration: 5000,
            onAutoClose: () => {

            },
            onDismiss() {

            },
        })
        handleClose()
    }
    return (
      <>
        <Button actionType='SAVE' text='Restablecer Contraseña' handle={handleOpen}  />
            
        <ConfirmationDialog ref={dialogResetRef}>
          <ConfirmationModal handleClose={handleClose} handle={hanleReset} text='¿Está seguro que desea ' strongText='Restablecer la Contraseña?' />
        </ConfirmationDialog>
            
      </>
    )
}