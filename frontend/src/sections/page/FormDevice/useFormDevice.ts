import { useCallback, useLayoutEffect } from "react"
import { useDeviceInitialState } from "../../Hooks/device/DeviceFormInitialState"
import { useGenericFormData } from "../../Hooks/useGenericFormData"
import { useDeviceContext } from "../../Context/DeviceProvider"
import { useGenericForm2 } from "../../Hooks/useGenericForm2"

export const useFormDevice = () => {
    const { createDevice } = useDeviceContext()

    const { preloadedDeviceState, setResetState, isAddForm } = useDeviceInitialState()
    const { formData, updateForm, resetForm } = useGenericFormData(preloadedDeviceState)
    const { processing, submitForm } = useGenericForm2({ create: createDevice })

    useLayoutEffect(() => {
        updateForm(preloadedDeviceState)
    }, [preloadedDeviceState, updateForm])


    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        const reset = () => {
            setResetState()
            resetForm()
        }
        await submitForm(formData, reset)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetForm, setResetState, submitForm])

    const handleClose = useCallback(() => {
        window.history.back()
    }, [])

    const handleChange = useCallback((name: string, value: string) => {
        updateForm({ [name]: value })
    }, [updateForm])

    return {
        isAddForm,
        formData,
        processing,
        handleSubmit,
        handleClose,
        handleChange
    }

}