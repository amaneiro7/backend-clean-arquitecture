import { lazy, Suspense, useLayoutEffect, useMemo, useState } from "react"

import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { OnHandleChange } from "../../../modules/shared/domain/types/types"
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { LocationId } from "../../../modules/location/locations/domain/locationId"
import { useSiteLocation } from "../../Hooks/locations/useLocation"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"
import { TypeOfSiteId } from "../../../modules/location/typeofsites/domain/typeOfSiteId"
import { DeviceLocation } from "../../../modules/devices/devices/devices/domain/DeviceLocation"
import { LocationApiResponse } from "../../../modules/shared/domain/types/responseTypes"
import { LocationPrimitives } from "../../../modules/location/locations/domain/location"
import { defaultInitialLocationState, DefaultLocationProps } from "../../Hooks/locations/useLocationInitialState"

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
  const { locations, loading, createLocation } = useSiteLocation()
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState<DefaultLocationProps>(defaultInitialLocationState)

  const initialValue = useMemo(() => {
    return locations.find(location => location.id === value)
  }, [locations, value])

  const filterLocation = useMemo(() => {
    return locations.filter(location => {
      const typeOfSite = location.typeOfSiteId === typeOfSiteId || !typeOfSiteId
      const status = !statusId ? true : statusId === StatusId.StatusOptions.INUSE ? (location.typeOfSiteId === TypeOfSiteId.SitesOptions.ADMINISTRATIVE || location.typeOfSiteId === TypeOfSiteId.SitesOptions.AGENCY) : location.typeOfSiteId === TypeOfSiteId.SitesOptions.ALMACEN
      return typeOfSite && status
    })
  }, [locations, typeOfSiteId, statusId])

  useLayoutEffect(() => {
    if (type !== 'form') return


    if (!value || !initialValue) {
      return
    }
    const isValid = DeviceLocation.isValid({ typeOfSite: initialValue.typeOfSiteId, status: statusId })


    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceLocation.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, statusId, typeOfSiteId])

  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <ComboBox
        id='locationId'
        initialValue={initialValue}
        label="Ubicación"
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
          // onChange('locationId', newValue ? newValue.id : '', Operator.EQUAL)
        }}
        options={filterLocation as LocationApiResponse[]}
        isDisabled={false}
        isRequired={type === 'form'}
        loading={loading}
        isError={isError}
        errorMessage={errorMessage}
      >
        {type === 'form' && (
          <Suspense>
            <LocationDialog createLocation={createLocation}  dialogValue={dialogValue} open={open} toggleOpen={toggleOpen} />
          </Suspense>
        )}
      </ComboBox>
    </Suspense>
  )
}