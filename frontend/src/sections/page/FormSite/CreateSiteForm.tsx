import React, { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '@/sections/components/skeleton/inputSkeletonLoading'
import { useFormSite } from './useFormSite'
import { useLocation } from 'react-router-dom'

const FormContainer = lazy(async () => await import('@/sections/components/formContainer/formContainer'))
const Input = lazy(async () => await import('@/sections/components/text-inputs/Input').then(m => ({ default: m.Input })))

export default function CreateEmployeeForm() {
  const location = useLocation()
  const { disabled, error, formData, handleChange, handleClose, handleSubmit, isAddForm, processing, required, resetForm } = useFormSite()

  return (
    <Suspense>
      <FormContainer
        key={location.key}
        title='Sitio'
        description='Ingrese los datos del sitio el cual desea registar.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        lastUpdated={formData.updatedAt}
        url='/site/add'
      >
        <Suspense fallback={<InputSkeletonLoading />}>
          <Input
            id='site-address'            
            name='address'
            type='text'
            label='Dirección del sitio'
            isRequired={required.address}
            disabled={disabled.address}
            value={formData.address}
            error={!!error.address}
            errorMessage={error.address}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target
              handleChange('address', value)
            }}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <Input
            id='site-name'            
            name='name'
            type='text'
            label='Nombre del sitio'
            isRequired={required.name}
            disabled={disabled.name}
            value={formData.name}
            error={!!error.name}
            errorMessage={error.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target
              handleChange('name', value)
            }}
          />
        </Suspense>
      </FormContainer>
    </Suspense>
  )
}
