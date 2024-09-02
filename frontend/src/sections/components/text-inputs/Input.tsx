import './InputError.css'

interface InputProps<T extends string | number | readonly string[]> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string
  value: T
  isRequired?: boolean
  error?: boolean
  valid?: boolean
  errorMessage?: string
  className?: string
}
export function Input<T extends string | number | readonly string[]>({ error, valid, value, errorMessage, type, label, className, isRequired = false, ...props }: InputProps<T>) {
    return (
      <div
        className={`inputBox group after:text-error ${error ? 'error' : null} ${className ? className : undefined}`}
        data-error={errorMessage} 
      >
        <label 
          className={`
            ${(value || type === 'number') && 'transform'} 
            ${error && '!text-error'} 
            ${valid && '!text-success'} 
            group-focus-within:text-focus`}
        >
          {`${label} ${isRequired ? '*' : ''}`}
        </label>
        <div className='inputArea'>
          <input 
            {...props} 
            value={value}
            required={isRequired}
          />
          <fieldset
            aria-hidden
            className={`${error && '!border-2 !border-error'} ${valid && '!border-2 !border-success'} group-focus-within:border-focus group-focus-within:border-2`}
          >
            <legend className={(value || type === 'number') && 'transform'}>
              <span>{`${label} ${isRequired ? '*' : ''}`}</span>
            </legend>
          </fieldset>
        </div>
      </div>
    )
}
