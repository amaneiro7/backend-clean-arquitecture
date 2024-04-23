// import { Suspense, useState } from 'react'
// import { Autocomplete } from '../../mui/Autocomplete'
// import { TextField } from '../../mui/TextField'
// import { useAppContext } from '../../Context/AppContext'

// interface Props {
//   name: string
//   value: string
//   defaultValue?: string
//   label: string
//   options: Options[]
//   isHidden?: boolean
//   isDisabled?: boolean
//   onChange: (event: SelectChangeEvent, child: React.ReactNode) => void
//   placeholder: string
//   isRequired?: boolean
//   isError?: boolean
//   errorMessage?: string
// }

// interface Options {
//   id: string | number
//   name: string | number
// }

// export function Select ({ onChange, value, isRequired = true }: Props) {
//   const defaultProps = {
//     options: categories,
//     getOptionLabel: (option: Options) => option.name
//   }

//   return (
//         <Suspense>
//             <Autocomplete
//                 {...defaultProps}
//                 id="disable-close-on-select"
//                 disablePortal
//                 renderInput={(params) => (
//                 <TextField name='employee' onChange={(e) => { console.log(e.target.name, e.target.value) }} {...params} label="Usuario" />
//                 )}
//             />
//         </Suspense>
//   )
// }
