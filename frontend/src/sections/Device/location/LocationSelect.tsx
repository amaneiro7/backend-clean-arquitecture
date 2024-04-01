import { type FC, Suspense, lazy, useMemo } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: Primitives<LocationId>
  typeOfSiteId?: string
  onChange: OnHandleChange
  isRequired?: boolean
  isForm?: boolean
}

const LocationSelect: FC<Props> = ({ value, onChange, isRequired = false, typeOfSiteId = '' }) => {
  const { location: { locations } } = useAppContext()

  const filterLocation = useMemo(() => {
    return locations.filter(location => {
      const typeOfSite = location.typeOfSiteId === typeOfSiteId || (typeOfSiteId === undefined || typeOfSiteId === '')
      return typeOfSite
    })
  }, [locations])

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

export default LocationSelect
