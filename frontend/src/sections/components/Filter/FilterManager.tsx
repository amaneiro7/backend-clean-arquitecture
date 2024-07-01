import { useState } from 'react'
import { Filter } from './Filter'
import { SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import Button from '../button/button'

export interface FilterState {
    field: string
    operator: string
    value: string
}

interface Props {
    handleFilter: (payload: SearchByCriteriaQuery) => void
}

export function FilterManager({ handleFilter, children }: React.PropsWithChildren<Props>) {
    const [filters, setFilters] = useState<FilterState[]>([])

    return (
      <form
        id='courses-filters'
        name='filter-courses'
        className='flex flex-col gap-4 text-left'
        action='#'
        onSubmit={e => e.preventDefault()}
      >
        <div className='flex gap-6'>
          <Button actionType='CLOSE' type='button' text='Añadir Filtro' handle={() => setFilters([...filters, { field: '', operator: '', value: '' }])} />
          <Button actionType='ACTION' type='button' text='Buscar' handle={async () => { await handleFilter({ filters }) }} />
          {children}
        </div>
        {filters.map((_, index) => (
          <Filter
            key={index}
            onFieldSelected={event => {
                        filters[index] = {
                            ...filters[index],
                            field: `${event.target.value}`
                        }
                        setFilters(filters)
                    }}
            onOperatorSelected={event => {
                        filters[index] = {
                            ...filters[index],
                            operator: `${event.target.value}`
                        }
                        setFilters(filters)
                    }}
            onValueChanged={event => {
                        filters[index] = { ...filters[index], value: event.target.value }
                        setFilters(filters)
                    }}
          />
            ))}
      </form>
    )
}