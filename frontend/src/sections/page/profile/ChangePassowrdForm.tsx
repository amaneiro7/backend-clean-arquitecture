import { lazy, Suspense } from "react"
import { InputSkeletonLoading } from "@/sections/components/skeleton/inputSkeletonLoading"
import { UserPassword } from "@/modules/user/user/domain/UserPassword"
import { type ChangePasswordParams } from "@/modules/user/user/application/changePassoword"

interface Props {
    formId?: string
    errors: ChangePasswordParams
    formData: ChangePasswordParams
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (event: React.FormEvent) => Promise<void>
    handleClose: () => void
    handleOpenModal: () => void
    isDisabled: boolean
}

const Input = lazy(async () => import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))
const Button = lazy(async () => await import('@/sections/components/button/button'))
const CancelIcon = lazy(() => import('@/sections/components/icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() => import('@/sections/components/icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon })))

export function ChangePassowrdForm({
    errors,
    formId,
    formData,
    handleChange,
    handleSubmit,
    handleClose,
    handleOpenModal,
    isDisabled
}: Props) {
    return (
      <form
        className='p-4 rounded-2xl shadow bg-white grid md:grid-cols-2 gap-4'
        method='post'
        id={formId}
        onSubmit={handleSubmit}
      >
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
      </form>
    )
}
