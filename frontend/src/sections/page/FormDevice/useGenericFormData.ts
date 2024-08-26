import { useCallback, useEffect, useReducer } from "react"
import { useDeviceInitialState } from "../../Hooks/device/DeviceFormInitialState"
import { useGenericForm2 } from "../../Hooks/useGenericForm2"
import { useDeviceContext } from "../../Context/DeviceProvider"
import { type DefaultProps } from "../../Hooks/device/DefaultInitialState"
import { MemoryRam } from "../../../modules/devices/fetures/computer/domain/MemoryRam"
import { useErrorManagement } from "./useErrorManagement"

interface InitialState {
    formData: DefaultProps
}

const initialState: InitialState = {
    formData: {
        id: undefined,
        statusId: '',
        categoryId: '',
        brandId: '',
        modelId: '',
        serial: '',
        activo: '',
        employeeId: '',
        locationId: '',
        typeOfSiteId: '',
        stockNumber: '',
        observation: '',
        computerName: '',
        processorId: '',
        memoryRamSlotQuantity: undefined,
        memoryRamType: '',
        memoryRamCapacity: 0,
        memoryRam: [],
        hardDriveCapacityId: '',
        hardDriveTypeId: '',
        operatingSystemArqId: '',
        operatingSystemId: '',
        ipAddress: '',
        macAddress: '',
        health: 100,
        updatedAt: undefined,
        history: []
    }
}

export type Action =
    | { type: 'INIT_STATE', payload: { formData: DefaultProps } }
    | { type: 'reset', payload: { formData: DefaultProps } }
    | { type: 'statusId', payload: { value: string } }
    | { type: 'categoryId', payload: { value: string } }
    | { type: 'brandId', payload: { value: string } }
    | { type: 'modelId', payload: { value: string, memoryRamSlotQuantity: number, memoryRamType: string } }
    | { type: 'serial', payload: { value: string } }
    | { type: 'activo', payload: { value: string } }
    | { type: 'employeeId', payload: { value: string } }
    | { type: 'locationId', payload: { value: string, typeOfSiteId: string } }
    | { type: 'stockNumber', payload: { value: string } }
    | { type: 'observation', payload: { value: string } }
    | { type: 'computerName', payload: { value: string } }
    | { type: 'processorId', payload: { value: string } }
    | { type: 'memoryRam', payload: { value: string, index: number } }
    | { type: 'hardDriveCapacityId', payload: { value: string } }
    | { type: 'hardDriveTypeId', payload: { value: string } }
    | { type: 'operatingSystemArqId', payload: { value: string } }
    | { type: 'operatingSystemId', payload: { value: string } }
    | { type: 'ipAddress', payload: { value: string } }
    | { type: 'macAddress', payload: { value: string } }
    | { type: 'health', payload: { value: number } }

const reducer = (state: InitialState, action: Action): InitialState => {
    if (action.type === 'INIT_STATE') {
        const { formData } = action.payload
        return {
            ...state,
            formData: formData
        }
    }
    if (action.type === 'reset') {
        const { formData } = action.payload
        return {
            ...state,
            formData: formData
        }
    }
    if (action.type === 'statusId') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                statusId: value,
                employeeId: '',
                locationId: '',
                stockNumber: '',
                computerName: '',
                operatingSystemId: '',
                operatingSystemArqId: '',
                ipAddress: '',
            }
        }
    }
    if (action.type === 'categoryId') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                categoryId: value,
                brandId: '',
                modelId: '',
                computerName: '',
                processorId: '',
                memoryRamSlotQuantity: undefined,
                memoryRamType: '',
                memoryRamCapacity: 0,
                memoryRam: [],
                hardDriveCapacityId: '',
                hardDriveTypeId: '',
                operatingSystemArqId: '',
                operatingSystemId: '',
                ipAddress: '',
                macAddress: '',
                health: 100
            }
        }
    }
    if (action.type === 'brandId') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                brandId: value,
                modelId: '',
                memoryRamSlotQuantity: undefined,
                memoryRamType: '',
                memoryRamCapacity: 0,
                memoryRam: [],
            }
        }
    }
    if (action.type === 'modelId') {
        const { value, memoryRamSlotQuantity, memoryRamType } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                modelId: value,
                memoryRamSlotQuantity,
                memoryRamType
            }
        }
    }
    if (action.type === 'serial') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                serial: value
            }
        }
    }
    if (action.type === 'activo') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                activo: value
            }
        }
    }
    if (action.type === 'employeeId') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                employeeId: value
            }
        }
    }
    if (action.type === 'locationId') {
        const { value, typeOfSiteId } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                locationId: value,
                typeOfSiteId,
                stockNumber: ''
            }
        }
    }
    if (action.type === 'stockNumber') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                stockNumber: value
            }
        }
    }
    if (action.type === 'observation') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                observation: value
            }
        }
    }
    if (action.type === 'computerName') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                computerName: value
            }
        }
    }
    if (action.type === 'processorId') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                processorId: value
            }
        }
    }
    if (action.type === 'memoryRam') {
        const { value, index } = action.payload
        const parsedValue = parseFloat(value)

        const updatedMemoryRamSlot = initialState.formData.memoryRam
        updatedMemoryRamSlot[index] = isNaN(parsedValue) ? 0 : parsedValue
        const memoryRamCapacity = MemoryRam.totalAmount(updatedMemoryRamSlot)

        return {
            ...state,
            formData: {
                ...state.formData,
                memoryRam: updatedMemoryRamSlot,
                memoryRamCapacity
            }
        }
    }
    if (action.type === 'hardDriveCapacityId') {
        const { value } = action.payload
        const hardDriveTypeId = value ? initialState.formData.hardDriveTypeId : ''
        const operatingSystemId = value ? initialState.formData.operatingSystemId : ''
        const operatingSystemArqId = value ? initialState.formData.operatingSystemArqId : ''
        return {
            ...state,
            formData: {
                ...state.formData,
                hardDriveCapacityId: value,
                hardDriveTypeId,
                operatingSystemId,
                operatingSystemArqId
            }
        }
    }
    if (action.type === 'hardDriveTypeId') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                hardDriveTypeId: value
            }
        }
    }
    if (action.type === 'operatingSystemId') {
        const { value } = action.payload
        const operatingSystemArqId = value ? initialState.formData.operatingSystemArqId : ''
        return {
            ...state,
            formData: {
                ...state.formData,
                operatingSystemId: value,
                operatingSystemArqId
            }
        }
    }
    if (action.type === 'operatingSystemArqId') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                operatingSystemArqId: value,
            }
        }
    }
    if (action.type === 'ipAddress') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                ipAddress: value,
            }
        }
    }
    if (action.type === 'macAddress') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                macAddress: value,
            }
        }
    }
    if (action.type === 'health') {
        const { value } = action.payload
        return {
            ...state,
            formData: {
                ...state.formData,
                health: value,
            }
        }
    }
    return state
}

export function useFormDevice() {
    const { createDevice } = useDeviceContext()
    const { isAddForm, preloadedDeviceState, setResetState } = useDeviceInitialState()
    const [{ formData }, dispatch] = useReducer(reducer, initialState)
    const { error, disabled, required } = useErrorManagement(formData)
    const { processing, submitForm } = useGenericForm2({ create: createDevice })

    useEffect(() => {
        dispatch({ type: 'INIT_STATE', payload: { formData: preloadedDeviceState } })
    }, [preloadedDeviceState])

    const resetForm = useCallback(() => {
        setResetState()
        dispatch({ type: 'reset', payload: { formData: preloadedDeviceState } })
    }, [preloadedDeviceState, setResetState])

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        await submitForm(formData, resetForm)

    }, [formData, submitForm, resetForm])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (name: Action['type'], value: any) => {
        if (name === 'INIT_STATE' || name === 'reset' || name === 'modelId' || name === 'memoryRam' || name === 'locationId') return
        dispatch({ type: name, payload: { value } })
    }

    const handleModel = ({ value, memoryRamSlotQuantity, memoryRamType }: { value: string, memoryRamSlotQuantity?: number, memoryRamType?: string }) => {
        dispatch({ type: 'modelId', payload: { value, memoryRamSlotQuantity, memoryRamType } })
    }
    const handleLocation = ({ value, typeOfSiteId }: { value: string, typeOfSiteId?: string }) => {
        dispatch({ type: 'locationId', payload: { value, typeOfSiteId } })
    }
    const handleMemory = (value: string, index: number) => {
        dispatch({ type: 'memoryRam', payload: { value, index } })
    }

    const handleClose = () => { window.history.back() }

    return {
        formData,
        isAddForm,
        processing,
        error,
        disabled,
        required,
        handleSubmit,
        handleClose,
        handleChange,
        handleMemory,
        handleModel,
        handleLocation
    }
}