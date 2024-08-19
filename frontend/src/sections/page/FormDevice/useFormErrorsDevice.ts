import { useRef, useState } from "react"

export function useFormErrosDevice() {
    const [errors, setErrors] = useState({
        serial: '',
        activo: '',
        employeeId: '',
        locationId: '',
        stockNumber: ''
    })
    const isSerialFirstInput = useRef(null)
    const isActivoFirstInput = useRef(null)
    const isStockNumberFirstInput = useRef(null)

    return {
        errors
    }
}