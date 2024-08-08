import { lazy, Suspense, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDeleteUser } from "../../../Hooks/user/useDeleteUser"
import { tostPromise } from "../../../utils/toaster"
import { type DialogRef } from "../../../components/Dialog/Modal"

const ConfirmationDialog = lazy(async () => import("../../../components/Dialog/Modal").then(m => ({ default: m.ConfirmationDialog })))
const ConfirmationModal = lazy(async () => import("../../../components/Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const Button = lazy(async () => import("../../../components/button/button"))
const ThrashIcon = lazy(async () => import("../../../components/icon/ThrashIcon").then(m => ({ default: m.ThrashIcon })))

export function DeleteHandle ({id}: {id: string}) {
    const dialogDeleteRef = useRef<DialogRef>(null)
    const { deleteUser } = useDeleteUser()
    const navigate = useNavigate()
    const handleClose = () => {
        dialogDeleteRef.current?.handleClose()
    }
    
    const handleOpen = () => {
        dialogDeleteRef.current?.handleOpen()
    }

    const hanleDelete = () => {
      tostPromise(deleteUser({id}), {
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
        <Button 
          color='red' 
          text='Eliminar Usuario' 
          onClick={handleOpen}
          buttonSize='medium'
          size='content'
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
              <ThrashIcon width={16} className='aspect-square' />
            </Suspense>
          }
        />
            
        <ConfirmationDialog ref={dialogDeleteRef}>
          <ConfirmationModal handleClose={handleClose} handle={hanleDelete} text='¿Está seguro que desea ' strongText='Eliminar este usuario?' />
        </ConfirmationDialog>
            
      </>
    )
}