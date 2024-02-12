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
    <div className="relative w-full mb-4">
      <label
        className={`absolute text-center -top-2 left-2 z-10 px-2 bg-white transition-all duration-200 text-sm
        ${
          isFocused ? 'text-secondary-500' : 'text-black/25'
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
        className={`w-full h-auto px-4 py-4 mt-1 text-base border ${
          (error ?? false) ? 'border-red-500' : 'border-black/25'
        } rounded-md hover:border-black/60 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500`}
      />
      {(error ?? false) && <p className="text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default NumberInput
