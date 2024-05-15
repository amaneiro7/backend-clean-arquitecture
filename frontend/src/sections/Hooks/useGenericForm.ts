import { useState } from 'react'
import { toastMessage } from '../utils/toaster'


export const enum FormStatus {
    Loading,
    Success,
    Error,
    Initial
}

export function useGenericForm<T>({ create }: { create: (formData: T) => Promise<void> }): {
    formStatus: FormStatus
    submitForm: (formData: T) => Promise<void>
    resetFormStatus: () => void
} {
    const [formStatus, setFormStatus] = useState(FormStatus.Initial)

    async function submitForm(formData: T) {
        setFormStatus(FormStatus.Loading)
        toastMessage({ type: 'loading', message: 'Cargando...' })

        try {
            await create(formData)
            setFormStatus(FormStatus.Success)
            toastMessage({ type: 'success', message: 'Marca Creada exitosamente' })
        } catch (error) {
            setFormStatus(FormStatus.Error)
            toastMessage({ type: 'error', message: 'Ha ocurrido un error' })
        }
    }

    function resetFormStatus() {
        setFormStatus(FormStatus.Initial)
    }

    return {
        formStatus,
        submitForm,
        resetFormStatus
    }
}
