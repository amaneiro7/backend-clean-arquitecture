import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormLocation } from './useFormLocation'



const FormContainer = lazy(async () => import('../../components/formContainer/formContainer'))
const LocationInputs = lazy(async () => import('./LocationInputs').then(m => ({ default: m.LocationInputs })))

export default function CreateLocationForm() {
    
    const location = useLocation()
    const { isAddForm, formData, handleChange, handleClose, handleSubmit, resetForm, processing } = useFormLocation()

    

    return (      
      <FormContainer
        key={location.key}
        title='Ubicación'
        description='Ingrese los datos de la nueva ubicación a registrar.'
        isAddForm={isAddForm}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        reset={!isAddForm ? resetForm : undefined}
        isDisabled={processing}
        lastUpdated={formData.updatedAt}
        url='/location/add'
      >
        <Suspense>
          <LocationInputs isAddForm={isAddForm} formData={formData} onChange={handleChange} />
        </Suspense>
      </FormContainer>   
    )
}
