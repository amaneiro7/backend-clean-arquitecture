import { lazy, useRef } from "react";
import { useUser } from "../../../Hooks/user/useUser";
import { type DialogRef } from "../../../components/Dialog/Modal";
import { tostPromise } from "../../../utils/toaster";
import { useNavigate } from "react-router-dom";

const ConfirmationDialog = lazy(async () => import("../../../components/Dialog/Modal").then(m => ({ default: m.ConfirmationDialog })))
const ConfirmationModal = lazy(async () => import("../../../components/Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const Button = lazy(async () => import("../../../components/button/button"))

export function DeleteHandle ({id}: {id: string}) {
    const dialogDeleteRef = useRef<DialogRef>(null)
    const { deleteUser } = useUser()
    const navigate = useNavigate()
    const handleClose = () => {
        dialogDeleteRef.current?.handleClose()
    }
    
    const handleOpen = () => {
        dialogDeleteRef.current?.handleOpen()
    }

    const hanleDelete = () => {
      tostPromise(deleteUser.run({id}), {
        loading: 'Procesando...',
        success: () => {
          navigate('/user-management')
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
        <Button actionType='DELETE' text='Eliminar Usuario' handle={handleOpen}  />
            
        <ConfirmationDialog ref={dialogDeleteRef}>
          <ConfirmationModal handleClose={handleClose} handle={hanleDelete} text='¿Está seguro que desea ' strongText='Eliminar este usuario?' />
        </ConfirmationDialog>
            
      </>
    )
}