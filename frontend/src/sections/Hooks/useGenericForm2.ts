import { useCallback, useState } from 'react'
import { tostPromise } from '../utils/toaster'

export function useGenericForm2<T>({ create }: { create: (formData: T) => Promise<unknown> }): {
    submitForm: (formData: T) => Promise<void>
    processing: boolean
} {
    const [processing, setProcessing] = useState<boolean>(false)

    const submitForm = useCallback(async (formData: T) => {
        setProcessing(true)
        tostPromise(create(formData), {
            loading: 'Procesando...',
            success: () => {
                setProcessing(false)
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

            },
            onDismiss() {

            },
        })
    }, [create])
    return {
        submitForm,
        processing
    }
}