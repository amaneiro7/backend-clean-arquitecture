import { useState } from 'react'
import { AddFilterButton } from './AddFilterButton'
import { Filter } from './Filter'
import { FilterButton } from './FilterButton'
import { SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export interface FilterState {
    field: string
    operator: string
    value: string
}

export function FilterManager({handleFilter}: {handleFilter:  (payload: SearchByCriteriaQuery) => void}) {
    const [filters, setFilters] = useState<FilterState[]>([])    

    return (
        <form
            id="courses-filters"
            name="filter-courses"
            className="text-left"
            action="#"
            onSubmit={e => e.preventDefault()}
        >
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

            <AddFilterButton onAdd={() => setFilters([...filters, { field: '', operator: '', value: '' }])} />
            <FilterButton
                onFilter={() => handleFilter({filters})}
            />
        </form>
    )
}