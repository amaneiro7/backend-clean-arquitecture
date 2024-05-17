import { lazy, Suspense, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { useLocation } from 'react-router-dom'
import { useGenericForm, FormStatus } from '../../Hooks/useGenericForm'
import { useSiteLocation } from '../../Hooks/locations/useLocation'
import { useLocationInitialState } from '../../Hooks/locations/useLocationInitialState'
import { SubnetInput } from '../../components/text-inputs/location/SubnetInput'
import { LocationNameInput } from '../../components/text-inputs/location/LocationNameInput'

const Main = lazy(async () => import('../../components/Main'))
const FormContainer = lazy(async () => import('../../components/formContainer'))
const TypeOfSiteComboBox = lazy(async () => import('../../components/combo_box/TypeOfSiteComboBox').then(m => ({ default: m.TypeOfSiteComboBox })))
const SiteComboBox = lazy(async () => import('../../components/combo_box/location/SiteComboBox').then(m => ({ default: m.SiteComboBox })))

export default function CreateLocationForm() {
    const { createLocation } = useSiteLocation()
    const location = useLocation()
    const { preloadedLocationState } = useLocationInitialState()
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
        <Main>
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
                        <TypeOfSiteComboBox
                            onChange={handleChange}
                            value={formData.typeOfSiteId}
                            type='form'
                        />
                    </Suspense>
                    <Suspense>
                        <SiteComboBox
                            onChange={handleChange}
                            type='form'
                            value={formData.siteId}
                        />

                    </Suspense>
                    <Suspense>
                        <SubnetInput
                            onChange={handleChange}
                            value={formData.subnet}
                            type='form'
                        />
                    </Suspense>
                    <Suspense>
                    <LocationNameInput
                        onChange={handleChange}
                        value={formData.name}
                        type='form'
                    />
                    </Suspense>
                </FormContainer>
            </Suspense>
        </Main>
    )
}
