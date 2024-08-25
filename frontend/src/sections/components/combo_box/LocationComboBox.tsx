import { lazy, useEffect, useMemo, useRef, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { defaultInitialLocationState, type DefaultLocationProps } from "../../Hooks/locations/useLocationInitialState"
import { DeviceLocation } from "../../../modules/devices/devices/devices/domain/DeviceLocation"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { TypeOfSiteId } from "../../../modules/location/typeofsites/domain/typeOfSiteId"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type LocationId } from "../../../modules/location/locations/domain/locationId"
import { type LocationApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { type LocationPrimitives } from "../../../modules/location/locations/domain/location"

interface Props {
  value?: Primitives<LocationId>
  typeOfSiteId?: Primitives<LocationId>
  statusId?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

interface NewValue extends LocationPrimitives {
  inputValue: string
}

const ComboBox = lazy(async () => import("./combo_box"))
const LocationDialog = lazy(async () => import("../Dialog/LocationDialog").then(m => ({ default: m.LocationDialog })))

export default function LocationComboBox({ value, statusId, typeOfSiteId, onChange, type = 'search' }: Props) {
  const { useSiteLocation: { locations, loading, createLocation } } = useAppContext()
  const firstRender = useRef(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState<DefaultLocationProps>(defaultInitialLocationState)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isRequired, setIsRequired] = useState(true)

  
  const filterLocation = useMemo(() => {
    return locations.filter(location => {
      const typeOfSite = location.typeOfSiteId === typeOfSiteId || !typeOfSiteId
      const status = !statusId ? true : [
        StatusId.StatusOptions.INUSE,
        StatusId.StatusOptions.PRESTAMO,
        StatusId.StatusOptions.CONTINGENCIA,
        StatusId.StatusOptions.GUARDIA,
        StatusId.StatusOptions.DISPONIBLE,
      ].includes(statusId) ? ([TypeOfSiteId.SitesOptions.ADMINISTRATIVE, TypeOfSiteId.SitesOptions.AGENCY].includes(location.typeOfSiteId)) : [TypeOfSiteId.SitesOptions.ALMACEN].includes(location.typeOfSiteId)
      return typeOfSite && status
    })
  }, [locations, typeOfSiteId, statusId])
  
  const initialValue = useMemo(() => {
    return filterLocation.find(location => location.id === value)
  }, [filterLocation, value])
  
  useEffect(() => {
    if (type !== 'form') return

    setIsDisabled([StatusId.StatusOptions.DESINCORPORADO].includes(statusId))
    setIsRequired(![StatusId.StatusOptions.DESINCORPORADO].includes(statusId) && type === 'form')
    // if (initialValue === undefined) return

    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const isValid = DeviceLocation.isValid({ typeOfSite: initialValue?.typeOfSiteId, status: statusId })


    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceLocation.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, statusId, typeOfSiteId, type, initialValue])

  return (
    <>
      <ComboBox
        id='locationId'
        initialValue={initialValue}
        label='Ubicación'
        name='locationId'
        type={type}
        onChange={(_, newValue: NewValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true)
              setDialogValue(prev => ({ ...prev, value: newValue }))
            })
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true)
            setDialogValue(prev => ({ ...prev, name: newValue.inputValue }))
          } else {
            onChange('locationId', newValue ? newValue.id : '', Operator.EQUAL)
          }
        }}
        options={filterLocation as LocationApiResponse[]}
        isDisabled={isDisabled}
        isRequired={isRequired}
        loading={loading}
        isError={isError}
        errorMessage={errorMessage}
      >
        {type === 'form' ? <LocationDialog createLocation={createLocation} dialogValue={dialogValue} open={open} toggleOpen={toggleOpen} /> : null}
      </ComboBox>
    </>
  )
}