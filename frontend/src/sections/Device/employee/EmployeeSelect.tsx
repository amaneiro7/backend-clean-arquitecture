import { Suspense, useState } from 'react'
import { type EmployeeId } from '../../../modules/employee/employee/domain/EmployeeId'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'

import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Autocomplete, TextField } from '@mui/material'
import { useAppContext } from '../../Context/AppContext'

interface Props {
  value: Primitives<EmployeeId>
  onChange: OnHandleChange
  isRequired?: boolean
}

interface Options {
  id: string
  name: string
}

export function EmployeeSelect ({ onChange, value, isRequired = true }: Props) {
  const { category: { categories } } = useAppContext()
  const defaultProps = {
    options: categories,
    getOptionLabel: (option: Options) => option.name
  }
  const flatProps = {
    options: top100Films.map((option) => option.title)
  }
  const [value2, setValue] = useState<FilmOptionType | null>(null)

  return (
        <Suspense>
            <Autocomplete
                {...defaultProps}
                id="disable-close-on-select"
                disablePortal
                renderInput={(params) => (
                <TextField name='employee' onChange={(e) => { console.log(e.target.name, e.target.value) }} {...params} label="Usuario" />
                )}
            />
        </Suspense>
  )
}
