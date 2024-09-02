import { useEffect, useRef, useState } from "react"
import { LocationName } from "@/modules/location/locations/domain/LocationName"
import { type DefaultLocationProps, type FormLocationDisabled, type FormLocationErrors, type FormLocationRequired } from "@/sections/Hooks/locations/DefaultInitialState"


export function useErrorLocationManagement({ siteName }: DefaultLocationProps) {
    const isFirstSiteNameInput = useRef(true)
    const [error, setError] = useState<FormLocationErrors>({
        typeOfSiteId: '',
        regionId: '',
        stateId: '',
        cityId: '',
        siteId: '',
        siteName: '',
        name: '',
        subnet: '',
    })
    const [disabled, setDisabled] = useState<FormLocationDisabled>({
        typeOfSiteId: false,
        regionId: false,
        stateId: false,
        cityId: false,
        siteId: false,
        siteName: false,
        name: false,
        subnet: false,
    })

    const [required, setRequired] = useState<FormLocationRequired>({
        typeOfSiteId: true,
        regionId: true,
        stateId: true,
        cityId: true,
        siteId: true,
        name: true,
        siteName: true,
        subnet: false,
    })

    useEffect(() => {
        if (isFirstSiteNameInput.current || siteName === '') {
            isFirstSiteNameInput.current = siteName.length < LocationName.NAME_MIN_LENGTH
        }
        setError(prev => ({
            ...prev,
            siteName: isFirstSiteNameInput.current ? '' : LocationName.isValid(siteName) ? '' : LocationName.invalidMessage()
        }))
        setDisabled(prev => ({
            ...prev
        }))
        setRequired(prev => ({
            ...prev
        }))
    }, [siteName])

    return {
        error,
        required,
        disabled
    }
}