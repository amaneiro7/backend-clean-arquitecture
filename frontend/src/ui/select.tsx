interface Props {
  name: string
  value: string
  options: Options[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  placeholder: string
  isDisabled: boolean
  isAutoFocus: boolean
  hidden: boolean
  disabled: boolean
}

interface Options {
  id: string
  name: string
}

export const Select = ({
  name,
  value,
  options,
  onChange,
  placeholder,
  isDisabled,
  isAutoFocus = false,
  hidden = true,
  disabled = true
}: Props) => {
  return (
        <div>
            <select
                name={name}
                value={value}
                onChange={onChange}
                autoFocus={isAutoFocus ? true : undefined}
                disabled={isDisabled}
                className="w-[300px] h-[50px] text-xl font-normal text-secondary-950 px-2 py-0 capitalize outline-none rounded border border-gray-400 transition-all focus:outline-0 focus:border-primary focus:shadow-sm focus:shadow-primary"
            >
                <option value="" disabled={disabled} hidden={hidden}>{placeholder}</option>
                {options?.map(elem =>
                    <option
                        key={elem.id}
                        value={elem?.id}
                    >
                        {elem?.name}
                    </option>
                )}
            </select>
        </div>
  )
}
