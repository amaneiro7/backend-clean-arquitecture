import { type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: Primitives<LocationId>
  onChange: OnHandleChange
  isRequired?: boolean
  isForm?: boolean
}

const LocationSelect: FC<Props> = ({ value, onChange, isRequired = false }) => {
  const { location: { locations } } = useAppContext()

  return (
        <Suspense>
            <Select
                 label='Ubicación'
                 name='locationId'
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value, Operator.EQUAL)
                 }}
                 options={locations}
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
