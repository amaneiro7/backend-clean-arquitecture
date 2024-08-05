import { lazy, Suspense } from "react"
import { useAppContext } from "../../Context/AppContext"
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"
import { UserPassword } from "../../../modules/user/user/domain/UserPassword"
import { type UserApiResponse } from "../../../modules/shared/domain/types/responseTypes"

const ConfirmationModal = lazy(async () => import("../../components/Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const DetailsWrapper = lazy(async () => import("../../components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const DetailsInfo = lazy(async () => import("../../components/DetailsWrapper/DetailsInfo").then(m => ({ default: m.DetailsInfo })))
const Main = lazy(async () => import("../../components/Main"))
const PageTitle = lazy(async () => import("../../components/PageTitle"))
const Input = lazy(async () => import('../../components/text-inputs/Input').then(m => ({ default: m.Input })))
const Button = lazy(async () => await import('../../components/button/button'))
const ConfirmationDialog = lazy(async () => import('../../components/Dialog/Modal').then(m => ({default: m.ConfirmationDialog })))
const CancelIcon = lazy(() => import('../../components/icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() => import('../../components/icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon })))

export default function ResetPasswordProfilePage () {
    const { useAuth: { user }} = useAppContext()
    const { user: userInfo } = user as unknown as UserApiResponse
    
    const { errors, formData, handleChange, handleSubmit, handleClose, dialogRef, handleCloseModal, handleOpenModal, isDisabled } = useChangePassword()
    return (
      <Main content='max' overflow={false}>
        <PageTitle title='Perfil de usuario' />
        <DetailsWrapper title='A continuación le indicamos los datos de contacto'>          
          <DetailsInfo          
            email={userInfo?.email}
            lastName={userInfo?.lastName}
            name={userInfo?.name}
            role={userInfo?.role?.name}
          />
          <form className='p-4 rounded-2xl shadow bg-white grid md:grid-cols-2 gap-4' action='' method='post' onSubmit={handleSubmit}>
            <div className='flex gap-4 justify-center'>
              <Button
                actionType='SAVE'
                type='button'
                isDisabled={isDisabled}
                handle={handleOpenModal}
                text='Continuar'
                hoverTranslate
                icon={
                  <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
                    <RightArrowIcon width={20} className='aspect-square fill-white' />                      
                  </Suspense>
                  }
              />
              <Button
                type='button'
                actionType='CANCEL'
                text='Cancelar'
                handle={handleClose}
                hoverTranslate
                icon={
                  <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                    <CancelIcon width={20} className='aspect-square' />
                  </Suspense>
                  }
              />
            </div>
            <ConfirmationDialog key='profilePageModal' ref={dialogRef}>
              <ConfirmationModal handleClose={handleCloseModal} text='¿Seguro que desea cambiar la contraseña?' />
            </ConfirmationDialog>
          </form>        
        </DetailsWrapper>
      </Main>

    )
}