import { useState } from 'react'
import { tostPromise } from '../utils/toaster'


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
        tostPromise(create(formData), {
            loading: 'Procesando...',
            success: () => {
                setFormStatus(FormStatus.Success)
                return `Operacion exitosa`
            },
            error() {
                setFormStatus(FormStatus.Error)
                return `Ha ocurrido un error`
            },
            description: (data) => {
                return `${data?.message}`                
            },
            duration: 3000,
            onAutoClose: () => {

            },
            onDismiss() {

            },
        })
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
