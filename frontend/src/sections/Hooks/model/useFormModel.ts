import { useLayoutEffect, useReducer, useState } from "react"
import { useAppContext } from "@/sections/Context/AppProvider"
import { useModelInitialState } from "./ModelFormInitialState"
import { useErrorModelManagement } from "./useErrorModelManagement"
import { useGenericForm2 } from "../useGenericForm2"
import { MemoryRamSlotQuantity } from "@/modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity"
import { ScreenSize } from "@/modules/devices/model/ModelCharacteristics/modelMonitor/ScreenSize"
import { type DefaultModelProps } from "./DefaultInitialModelState"

export const initialModelState: DefaultModelProps = {
    id: undefined,
    name: '',
    categoryId: '',
    brandId: '',
    generic: false,
    hasBluetooth: false,
    hasDVI: false,
    hasHDMI: false,
    hasVGA: true,
    hasWifiAdapter: false,
    hasFingerPrintReader: false,
    memoryRamSlotQuantity: MemoryRamSlotQuantity.MIN,
    memoryRamTypeId: '',
    batteryModel: '',
    screenSize: ScreenSize.MIN,
    cartridgeModel: '',
    inputTypeId: '',
    updatedAt: undefined
}

export type Action =
    | { type: 'init', payload: { formData: DefaultModelProps } }
    | { type: 'reset', payload: { formData: DefaultModelProps } }
    | { type: 'name', payload: { value: string } }

const reducer = (state: DefaultModelProps, action: Action): DefaultModelProps => {
    if (action.type === 'init') {
        return {
            ...state,
            ...action.payload.formData
        }
    }
    if (action.type === 'reset') {
        return {
            ...state,
            ...action.payload.formData
        }
    }
    if (action.type === 'name') {
        return {
            ...state,
            name: action.payload.value
        }
    }

}

export function useFormModel(defaultInitialState?: DefaultModelProps) {
    const { useModel: { createModel } } = useAppContext()
    const { preloadedModelState, isAddForm, setResetState } = useModelInitialState(defaultInitialState ?? initialModelState)
    const [prevFormData, setPrevFormData] = useState(preloadedModelState)
    const [formData, dispatch] = useReducer(reducer, initialModelState)
    const { disabled, error, required } = useErrorModelManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createModel })

    useLayoutEffect(() => {
        dispatch({ type: 'init', payload: { formData: structuredClone(preloadedModelState) } })
        setPrevFormData(structuredClone(preloadedModelState))
    }, [preloadedModelState])

    const resetForm = () => {
        dispatch({ type: 'reset', payload: { formData: structuredClone(prevFormData) } })
    }

    const handleChange = (name: Action['type'], value: string) => {
        if (name === 'init' || name === 'reset') return
        dispatch({ type: name, payload: { value } })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await submitForm(formData, setResetState)
    }

    const handleClose = () => { window.history.back() }

    return {
        formData,
        isAddForm,
        processing,
        disabled,
        error,
        required,
        handleSubmit,
        resetForm,
        handleChange,
        handleClose
    }
}