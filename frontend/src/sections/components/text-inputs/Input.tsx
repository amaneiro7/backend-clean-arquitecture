import './InputError.css'

interface InputProps<T extends string | number | readonly string[]> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string
  value: T
  isRequired?: boolean
  error?: boolean
  valid?: boolean
  errorMessage?: string
}
export function Input<T extends string | number | readonly string[]>({ error, valid, value, errorMessage, label, isRequired = false, ...props }: InputProps<T>) {
    return (
      <div
        className='inputBox group after:text-error'
        data-error={errorMessage} 
      >
        <label 
          className={`
            ${value && 'transform'} 
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
            <legend className={value && 'transform'}>
              <span>{`${label} ${isRequired ? '*' : ''}`}</span>
            </legend>
          </fieldset>
        </div>
      </div>
    )
}
// export function Input({ error, errorMessage, label, isRequired = false, ...inputProps }: InputProps) {
//   const [isFocused, setIsFocused] = useState(false)
//   return (
//     <div 
//       data-error={errorMessage} 
//       className='inline-flex flex-col relative min-w-0 p-0 m-0 border-none align-top w-full min-h-10 after:text-error inputError'
//     >
//       <label        
//         className='labelline'
//       >
//         {`${label} ${isRequired ? '*' : ''}`}
//       </label>
//       <div 
//         className='font-normal text-base text-black/85 cursor-text inline-flex items-center w-full relative rounded'
//         // className={`w-full p-1 pr-2 border rounded-md outline-none select-all ${isFocused && 'ring-1'} ${error ? `border-error hover:border-error ${isFocused && 'ring-error'} ` : `${isFocused ? 'ring-focus border-focus' : 'border-black/25 hover:border-black read-only:hover:border-black/25'}`}`}
//       >
//         <input
//           {...inputProps}
//           className='inputArea border-0 box-content h-6 m-0 bg-none block min-w-0 w-full py-2 px-4 '
//           required={isRequired}
//         />
//         <fieldset
//           aria-hidden
//           className='fieldsetArea text-left absolute bottom-0 right-0 left-0 -top-1 m-0 py-0 px-2 pointer-events-none min-w-0 border-solid border overflow-hidden border-black/25'
//         >
//           <legend
//             className='legendArea float-[unset] w-auto overflow-hidden block p-0 h-[11px] text-xs invisible max-w-[0.01px] whitespace-nowrap'
//           >
//             <span
//               className='visible px-1 inline-block opacity-0'
//             >
//               {`${label} ${isRequired ? '*' : ''}`}
//             </span>
//           </legend>
//         </fieldset>
//       </div>
//     </div>
//   )
// }
