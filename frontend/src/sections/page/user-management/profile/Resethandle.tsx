import { lazy, Suspense, useRef } from "react"
import { useResetUserPassword } from "../../../Hooks/user/useResetPassword"
import { type DialogRef } from "../../../components/Dialog/Modal"
import { tostPromise } from "../../../utils/toaster"


const ConfirmationDialog = lazy(async () => import("../../../components/Dialog/Modal").then(m => ({ default: m.ConfirmationDialog })))
const ConfirmationModal = lazy(async () => import("../../../components/Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const Button = lazy(async () => import("../../../components/button/button"))
const ResetIcon = lazy(async () => import("../../../components/icon/ResetIcon").then(m => ({ default: m.ResetIcon })))

export function ResetHandle ({id}: {id: string}) {
    const dialogResetRef = useRef<DialogRef>(null)
    const { resetUserPassword } = useResetUserPassword()    
    const handleClose = () => {
        dialogResetRef.current?.handleClose()
    }
    
    const handleOpen = () => {
        dialogResetRef.current?.handleOpen()
    }

    const hanleReset = () => {
        tostPromise(resetUserPassword({id}), {
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
        <Button 
          color='orange' 
          text='Restablecer Contraseña' 
          onClick={handleOpen}
          buttonSize='medium'
          size='content'
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
              <ResetIcon width={16} className='aspect-square' />                      
            </Suspense>
            }
        />
            
        <ConfirmationDialog ref={dialogResetRef}>
          <ConfirmationModal handleClose={handleClose} handle={hanleReset} text='¿Está seguro que desea ' strongText='Restablecer la Contraseña?' />
        </ConfirmationDialog>
            
      </>
    )
}