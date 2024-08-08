import { useEffect } from "react"
import { useDeviceInitialState } from "../../Hooks/device/DeviceFormInitialState"
import { useDevice } from "../../Hooks/device/useDevice"
import { FormStatus, useGenericForm } from "../../Hooks/useGenericForm"
import { useGenericFormData } from "../../Hooks/useGenericFormData"

export const useFormDevice = () => {
    const { createDevice } = useDevice()
    const { preloadedDeviceState, setResetState, isAddForm } = useDeviceInitialState()
    const { formData, updateForm, resetForm } = useGenericFormData(preloadedDeviceState)
    const { formStatus, submitForm, resetFormStatus } = useGenericForm({ create: createDevice })

    useEffect(() => {
        updateForm(preloadedDeviceState)
        return () => {
            resetForm()
        }
    }, [preloadedDeviceState, resetForm, updateForm])

    useEffect(() => {
        if (formStatus === FormStatus.Success) {
            setResetState()
            resetFormStatus()
            resetForm()
        }
        if (formStatus === FormStatus.Error) {
            resetFormStatus()
        }
    }, [formStatus, resetForm, resetFormStatus, setResetState])

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

    return {
        isAddForm,
        formData,
        formStatus,
        handleSubmit,
        handleClose,
        handleChange
    }

}