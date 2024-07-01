import { lazy, Suspense, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { useLocation } from 'react-router-dom'
import { useGenericForm, FormStatus } from '../../Hooks/useGenericForm'
import { useSiteLocation } from '../../Hooks/locations/useLocation'
import { useLocationInitialState } from '../../Hooks/locations/useLocationInitialState'


const Main = lazy(async () => import('../../components/Main'))
const FormContainer = lazy(async () => import('../../components/formContainer/formContainer'))
const LocationInputs = lazy(async () => import('./LocationInputs').then(m => ({ default: m.LocationInputs })))

export default function CreateLocationForm() {
    const { createLocation } = useSiteLocation()
    const location = useLocation()
    const { preloadedLocationState, isAddForm } = useLocationInitialState()
    const { formData, updateForm, resetForm } = useGenericFormData(preloadedLocationState)
    const { formStatus, submitForm, resetFormStatus } = useGenericForm({ create: createLocation })

    useEffect(() => {
        updateForm(preloadedLocationState)

        return () => {
            resetForm()
        }
    }, [preloadedLocationState])

    useEffect(() => {
        if (formStatus === FormStatus.Success) {
            resetFormStatus()
            resetForm()
            handleClose()
        }
        if (formStatus === FormStatus.Error) {
            resetFormStatus()
        }
    }, [formStatus])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await submitForm(formData)
    }

    const handleClose = () => {
        window.history.back()
    }

    const handleChange = (name: string, value: string) => {
        updateForm({ [name]: value })
    }

    return (
      <Main content='max' overflow={false}>
        <Suspense>
          <FormContainer
            key={location.key}
            title='Ubicación'
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            isDisabled={formStatus === FormStatus.Loading}
            lastUpdated={formData.updatedAt}
            url='/location/add'
          >
            <Suspense>
              <LocationInputs isAddForm={isAddForm} formData={formData} onChange={handleChange} />
            </Suspense>
          </FormContainer>
        </Suspense>
      </Main>
    )
}
