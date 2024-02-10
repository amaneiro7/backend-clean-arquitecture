import { useState, type FC, type ChangeEvent } from 'react'

interface NumberInputProps {
  value: number
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  min?: number
  max?: number
  step?: number
  error?: boolean
  errorMessage?: string
  placeholder: string
  label: string
}

const NumberInput: FC<NumberInputProps> = ({
  value,
  name,
  onChange,
  min,
  max,
  step,
  error,
  errorMessage,
  placeholder,
  label
}) => {
  const [isFocused, setIsFocused] = useState(false)

  //   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const newValue = parseFloat(e.target.value)
  //     onChange(newValue)
  //   }

  return (
    <div className="relative">
      <label
        className={`absolute top-0 left-2 transition-all duration-300 ${
          isFocused || (value !== 0) ? 'text-xs text-gray-500' : 'text-base'
        }`}
      >
        {label}
      </label>
      <input
      name={name}
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        onFocus={() => { setIsFocused(true) }}
        onBlur={() => { setIsFocused(false) }}
        className={`block w-full px-4 py-2 mt-1 text-base border ${
          (error ?? false) ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {(error ?? false) && <p className="text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default NumberInput
