import { Select as SelectMui } from '../../mui/Select'
import { InputLabel as InputLabelMui } from '../../mui/InputLabel'
import { MenuItem as MenuItemMui } from '../../mui/MenuItem'
import { FormControl } from '../../mui/FormControl'
import { type OnChangeInputs } from '../../../types/types'

interface Props {
  name: string
  value: string
  label: string
  options: Options[]
  isHidden?: boolean
  isDisabled?: boolean
  onChange: OnChangeInputs
  placeholder: string
}

interface Options {
  id: string
  name: string
}

const Select = ({
  name,
  value,
  label,
  options,
  isHidden = true,
  isDisabled = true,
  onChange,
  placeholder
}: Props) => {
  return (
      <FormControl className='w-full'>
          <InputLabelMui id='simple-select-label'>{label}</InputLabelMui>
              <SelectMui
                  labelId='simple-select-label'
                  id='simple-select'
                  value={value}
                  label={label}
                  name={name}
                  onChange={onChange}
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
