import { useCallback, useState } from 'react'
import { tostPromise } from '../utils/toaster'

export function useGenericForm2<T>({ create }: { create: (formData: T) => Promise<unknown> }): {
    submitForm: (formData: T) => Promise<void>
    processing: boolean
    success: boolean
} {
    const [processing, setProcessing] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const submitForm = useCallback(async (formData: T) => {
        setProcessing(true)
        tostPromise(create(formData), {
            loading: 'Procesando...',
            success: () => {
                setProcessing(false)
                setSuccess(true)
                return 'Operacion exitosa'
            },
            error() {
                setProcessing(false)
                return `Ha ocurrido un error`
            },
            description(data) {
                return `${data?.message}`
            },
            duration: 3500,
            onAutoClose: () => {
                setSuccess(false)
            },
            onDismiss() {

            },
        })
    }, [create])
    return {
        submitForm,
        processing,
        success
    }
}
