import { Select as SelectMui } from '../../mui/Select'
import { InputLabel as InputLabelMui } from '../../mui/InputLabel'
import { MenuItem as MenuItemMui } from '../../mui/MenuItem'
import { FormControl } from '../../mui/FormControl'
import { type FC } from 'react'
import { type OnChange } from '../../../modules/shared/domain/types/types'

interface Props {
  name: string
  value: string | number
  defaultValue?: string | number
  label: string
  options: Options[]
  isHidden?: boolean
  isDisabled?: boolean
  onChange: OnChange
  placeholder: string
  isRequired?: boolean
}

interface Options {
  id: string | number
  name: string | number
}

const Select: FC<Props> = ({
  name,
  value,
  defaultValue,
  label,
  options,
  isHidden = true,
  isDisabled = true,
  onChange,
  placeholder,
  isRequired = false
}) => {
  return (
      <FormControl size='small' className='w-full'>
          <InputLabelMui className='p-0' id='simple-select-label'>{label}</InputLabelMui>
              <SelectMui
                  labelId='simple-select-label'
                  id='simple-select'
                  value={value}
                  label={label}
                  name={name}
                  onChange={onChange}
                  defaultValue={defaultValue}
                  required={isRequired}
                  disabled={isDisabled}
              >
                  <MenuItemMui value='' hidden={isHidden} disabled={isDisabled}><em>{placeholder}</em></MenuItemMui>
                  {options?.map(elem =>
                      <MenuItemMui
                          key={elem.id}
                          value={elem?.id}
                      >
                          {elem?.name}
                      </MenuItemMui>
                  )}
              </SelectMui>
      </FormControl>
  )
}

export default Select
