import { useEffect, useRef, useState } from "react"
import { type DefaultModelProps, type FormModelDisabled, type FormModelErrors, type FormModelRequired } from "./DefaultInitialModelState"
import { ModelName } from "@/modules/devices/model/model/domain/ModelName"


export function useErrorModelManagement({
    name,
    categoryId,
    brandId,
    generic,
    memoryRamTypeId,
    memoryRamSlotQuantity,
    hasBluetooth,
    hasWifiAdapter,
    hasDVI,
    hasHDMI,
    hasVGA,
    batteryModel,
    screenSize,
    cartridgeModel,
    inputTypeId,
    hasFingerPrintReader
}: DefaultModelProps) {
    const isFistNameInput = useRef(true)
    const isFirstBatteryModelInput = useRef(true)
    const isFirstCartridgeModel = useRef(true)

    const [error, setError] = useState<FormModelErrors>({
        name: '',
        categoryId: '',
        brandId: '',
        memoryRamSlotQuantity: '',
        memoryRamTypeId: '',
        batteryModel: '',
        screenSize: '',
        cartridgeModel: '',
        inputTypeId: '',
    })
    const [disabled, setDisabled] = useState<FormModelDisabled>({
        name: false,
        categoryId: false,
        brandId: false,
        generic: false,
        memoryRamTypeId: false,
        memoryRamSlotQuantity: false,
        hasBluetooth: false,
        hasWifiAdapter: false,
        hasDVI: false,
        hasHDMI: false,
        hasVGA: false,
        batteryModel: false,
        screenSize: false,
        cartridgeModel: false,
        inputTypeId: false,
        hasFingerPrintReader: false
    })

    const [required, setRequired] = useState<FormModelRequired>({
        name: true,
        categoryId: true,
        brandId: true,
        generic: true,
        memoryRamTypeId: true,
        memoryRamSlotQuantity: true,
        hasBluetooth: true,
        hasWifiAdapter: true,
        hasDVI: true,
        hasHDMI: true,
        hasVGA: true,
        batteryModel: true,
        screenSize: true,
        cartridgeModel: true,
        inputTypeId: true,
        hasFingerPrintReader: true
    })

    useEffect(() => {
        if (isFistNameInput.current || name === '') {
            isFistNameInput.current = name.length < ModelName.NAME_MIN_LENGTH
        }
        if (isFirstBatteryModelInput.current || name === '') {
            isFirstBatteryModelInput.current = batteryModel.length < .NAME_MIN_LENGTH
        }
        if (isFirstCartridgeModel.current || name === '') {
            isFirstCartridgeModel.current = name.length < ProcessorName.NAME_MIN_LENGTH
        }
        setError(prev => ({
            ...prev,
            name: isFirstProcessorNameInput.current ? '' : ProcessorName.isValid(name) ? '' : ProcessorName.invalidMessage(name),


        }))
        setDisabled(prev => ({
            ...prev
        }))
        setRequired(prev => ({
            ...prev
        }))
    }, [name])

    return {
        error,
        required,
        disabled
    }
}