import { type FC, Suspense, lazy } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnChange } from '../../../modules/shared/domain/types/types'
import { type LocationId } from '../../../modules/location/locations/domain/locationId'

const Select = lazy(async () => await import('../../ui/select'))

interface Props {
  value: Primitives<LocationId>
  onChange: OnChange
  isRequired?: boolean
}

const LocationSelect: FC<Props> = ({ value, onChange, isRequired = false }) => {
  const { location: { locations } } = useAppContext()

  return (
        <Suspense>
            <Select
                 label='Ubicación'
                 name='locationId'
                 onChange={onChange}
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
