import { lazy, Suspense } from "react"
import { UserPassword } from "@/modules/user/user/domain/UserPassword"
import { useAppContext } from "@/sections/Context/AppContext"
import { useChangePassword } from "./useChangePassword"
import { InputSkeletonLoading } from "@/sections/components/skeleton/inputSkeletonLoading"
import { type UserApiResponse } from "@/sections/../modules/shared/domain/types/responseTypes"

const StepsToFollow = lazy(async () => import("@/sections/components/stepsToFollow/StepsToFollow").then(m => ({ default: m.StepsToFollow })))
const ChangePasswordStepsToFollow = lazy(async () => import("./ChangePasswordStepsToFollow").then(m => ({ default: m.ChangePasswordStepsToFollow })))
const ConfirmationModal = lazy(async () => import("@/sections/components/Dialog/ConfirmationModal").then(m => ({ default: m.ConfirmationModal })))
const DetailsWrapper = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsWrapper").then(m => ({ default: m.DetailsWrapper })))
const DetailsInfo = lazy(async () => import("@/sections/components/DetailsWrapper/DetailsInfo").then(m => ({ default: m.DetailsInfo })))
const DescriptionListElement = lazy(async () => import('@/sections/components/DetailsWrapper/DescriptionListElement').then(m => ({ default: m.DescriptionListElement })))
const DescriptionDesc = lazy(async () => import('@/sections/components/DetailsWrapper/DescriptionDesc').then(m => ({ default: m.DescriptionDesc })))
const Main = lazy(async () => import("@/sections/components/Main"))
const PageTitle = lazy(async () => import("@/sections/components/Typography/PageTitle"))
const Input = lazy(async () => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))
const Button = lazy(async () => await import('@/sections/components/button/button'))
const Modal = lazy(async () => import('@/sections/components/Dialog/Modal').then(m => ({default: m.Modal })))
const CancelIcon = lazy(() => import('@/sections/components/icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() => import('@/sections/components/icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon })))

export default function ProfilePage () {
    const { useAuth: { user }} = useAppContext()
    const { user: { name, email, lastName, role } } = user as unknown as UserApiResponse
    
    const { errors, formData, handleChange, handleSubmit, handleClose, dialogRef, handleCloseModal, handleOpenModal, isDisabled } = useChangePassword()
    return (
      <Main content='max' overflow={false} className='pr-8'>
        <Suspense>
          <PageTitle title='Perfil de usuario' />
          <DetailsWrapper title='A continuación le indicamos los datos de contacto'>          
            <DetailsInfo title='Datos de Contacto'>
              <DescriptionListElement title='Nombre'><DescriptionDesc desc={name} /></DescriptionListElement>
              <DescriptionListElement title='Apellido'><DescriptionDesc desc={lastName} /></DescriptionListElement>
              <DescriptionListElement title='Correo'><DescriptionDesc desc={email} /></DescriptionListElement>
              <DescriptionListElement title='Role'><DescriptionDesc desc={role?.name} /></DescriptionListElement>        
            </DetailsInfo>

          
            <form className='p-4 rounded-2xl shadow bg-white grid md:grid-cols-2 gap-4' action='' method='post' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-4'>
                <Suspense fallback={<InputSkeletonLoading />}>
                  <Input
                    label='Clave Actual'
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={formData.password}
                    errorMessage={errors.password}
                    error={errors.password ? true : false}                  
                    isRequired
                  />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                  <Input
                    label='Nueva Clave'
                    type='password'
                    name='newPassword'
                    onChange={handleChange}
                    value={formData.newPassword}
                    errorMessage={errors.newPassword}
                    error={errors.newPassword ? true : false}                  
                    isRequired
                  />
                </Suspense>
                <Suspense fallback={<InputSkeletonLoading />}>
                  <Input
                    label='Confirmación de Clave'
                    type='password'
                    name='reTypePassword'
                    onChange={handleChange}
                    value={formData.reTypePassword}
                    errorMessage={errors.reTypePassword}
                    error={errors.reTypePassword ? true : false}                  
                    isRequired
                  />
                </Suspense>
              </div>
              <div className='rounded text-sm bg-gray-200 p-4'>
                <p><strong>Nota:</strong> Su nueva clave debe cumplir las siguientes condiciones:</p>
                <ol className='ml-2'>
                  <li>1. Debe ser de mínimo {UserPassword.HAS_MIN_LENGTH} carácteres.</li>
                  <li>2. Debe incluir caracteres alfabéticos (sensitivos a mayúsculas y minúsculas), numéricos y especiales.</li>
                  <li>3. Los caracteres especiales válidos son ! . @ # $ % ^ & *</li>
                </ol>
              </div>
              <div />
              <div className='flex gap-4 justify-center'>
                <Button
                  color='green'
                  type='button'
                  disabled={isDisabled}
                  onClick={handleOpenModal}
                  size='content'                
                  text='Continuar'
                  hoverTranslation
                  buttonSize='large'
                  icon={
                    <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
                      <RightArrowIcon width={20} className='aspect-square fill-white' />                      
                    </Suspense>
                  }
                />
                <Button
                  type='button'
                  color='gray'
                  text='Reset'
                  onClick={handleClose}
                  size='content'                
                  hoverTranslation
                  buttonSize='large'
                  icon={
                    <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                      <CancelIcon width={20} className='aspect-square' />
                    </Suspense>
                  }
                />

              </div>
              <Suspense>
                <Modal key='profilePageModal' ref={dialogRef}>
                  <Suspense>
                    <ConfirmationModal 
                      handleClose={handleCloseModal} 
                      text='¿Seguro que desea cambiar la contraseña?' 
                    />
                  </Suspense>
                </Modal>
              </Suspense>
            </form>        
          </DetailsWrapper>
          <Suspense>
            <StepsToFollow>
              <ChangePasswordStepsToFollow />
            </StepsToFollow>
          </Suspense>
        </Suspense>
      </Main>

    )
}