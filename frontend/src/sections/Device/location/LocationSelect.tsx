import { Suspense, lazy, useMemo } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { useLocation } from './useLocation'

const Select = lazy(async () => await import('../../ui/Select'))

interface Props {
  value: Primitives<LocationId>
  typeOfSiteId?: Primitives<LocationId>
  statusId?: Primitives<StatusId>
  onChange: OnHandleChange
  isRequired?: boolean
  isForm?: boolean
}

export default function LocationSelect ({ value, onChange, isRequired = false, typeOfSiteId, statusId }: Props) {
  const { repository } = useAppContext()
  const { locations } = useLocation(repository)

  const filterLocation = useMemo(() => {
    return locations.filter(location => {
      const typeOfSite = location.typeOfSiteId === typeOfSiteId || (typeOfSiteId === undefined || typeOfSiteId === '')
      const status = statusId === undefined ? true : statusId === '1' ? (location.typeOfSiteId === '1' || location.typeOfSiteId === '2') : location.typeOfSiteId === '3'
      return typeOfSite && status
    })
  }, [locations, typeOfSiteId, statusId])

  return (
        <Suspense>
            <Select
                 label='Ubicación'
                 name='locationId'
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value, Operator.EQUAL)
                 }}
                 options={filterLocation}
                 placeholder='-- Filtre por Ubicación --'
                 isHidden={true}
                 isDisabled={false}
                 isRequired={isRequired}
                 value={value}
            />
        </Suspense>
  )
}
