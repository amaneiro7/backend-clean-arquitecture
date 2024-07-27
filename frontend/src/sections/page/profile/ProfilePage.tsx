import { lazy, Suspense } from "react"
import { UserApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { useAppContext } from "../../Context/AppContext"
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"
import { useChangePassword } from "./useChangePassword"
import { UserPassword } from "../../../modules/user/user/domain/UserPassword"
import { ConfirmationModal } from "../../components/Dialog/ConfirmationModal"

const Main = lazy(async () => import("../../components/Main"))
const PageTitle = lazy(async () => import("../../components/PageTitle"))
const Input = lazy(async () => import('../../components/text-inputs/Input').then(m => ({ default: m.Input })))
const Button = lazy(async () => await import('../../components/button/button'))
const ConfirmationDialog = lazy(async () => import('../../components/Dialog/Modal').then(m => ({default: m.ConfirmationDialog })))
const CancelIcon = lazy(() => import('../../components/icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() => import('../../components/icon/RighArrowIcon').then(m => ({ default: m.RightArrowIcon })))

export default function ProfilePage () {
    const { useAuth: { user }} = useAppContext()
    const { user: userInfo } = user as unknown as UserApiResponse
    
    const { errors, formData, handleChange, handleSubmit, handleClose, valid, dialogRef, handleCloseModal, handleOpenModal, isDisabled } = useChangePassword()
    return (
      <Main content='max' overflow={false}>
        <PageTitle title='Perfil de usuario' />
        <section className='w-11/12 flex flex-col gap-4 p-4 border-t-2 border-secondary rounded bg-gray-200'>
          <p className='p-4 bg-white shadow'>A continuación le indicamos los datos de contacto</p>
          <div className='p-4 flex justify-center bg-white rounded shadow'>
            <div className='w-1/2 h-full rounded shadow-lg shadow-slate-400'>
              <p className='w-full rounded-t px-4 py-2 bg-secondary text-white'>Datos de Contacto</p>
              <dl className='divide-y divide-gray-300'>
                <div className='px-4 py-2 grid grid-cols-3 gap-4'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>Nombre</dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{userInfo?.name}</dd>
                </div>
                <div className='px-4 py-2 grid grid-cols-3 gap-4'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>Apellido</dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{userInfo?.lastName}</dd>
                </div>
                <div className='px-4 py-2 grid grid-cols-3 gap-4'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>Correo Electrónico</dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{userInfo?.email}</dd>
                </div>
                <div className='px-4 py-2 grid grid-cols-3 gap-4'>
                  <dt className='text-sm font-medium leading-6 text-gray-900'>Cargo</dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{userInfo?.role?.name}</dd>
                </div>
              </dl>
            </div>
          </div>
          <form className='p-4 rounded shadow bg-white grid md:grid-cols-2 gap-4' action='' method='post' onSubmit={handleSubmit}>
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
                  valid={valid.password}
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
                  valid={valid.newPassword}
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
                  valid={valid.reTypePassword}
                  isRequired
                />
              </Suspense>
            </div>
            <div className='rounded text-sm bg-gray-200 p-4'>
              <p><strong>Nota:</strong> Su nueva clave debe cumplir las siguientes condiciones:</p>
              <ol className='ml-2'>
                <li>1. Debe ser de mínimo {UserPassword.HAS_MIN_LENGTH} carácteres.</li>
                <li>2. Debe incluir caracteres alfabéticos (sensitivos a mayúsculas y minúsculas), numéricos y especiales.</li>
                <li>3. Los caracteres especiales válidos son ! @ # $ % ^ & *</li>
              </ol>
            </div>
            <div />
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
        </section>
      </Main>

    )
}