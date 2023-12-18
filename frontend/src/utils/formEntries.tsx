interface Props {
  targetReference: EventTarget
  formReference: 'deviceForm'
}

export const formEntries = ({ targetReference, formReference }: Props) => {
  const form = targetReference
  const formData = new FormData(form)

  const entries = formData.entries()
  const data = {}
  for (const entry of entries) {
    if (isValidEntry[formReference](entry[0])) {
      data[entry[0]] = entry[1]
    }
  }
  return data
}

const isValidEntry = {
  deviceForm: (entryKey: [FormDataEntryValue]) => (
    entryKey.includes('activo') ||
    entryKey.includes('serial') ||
    entryKey.includes('modelId') ||
    entryKey.includes('status')
  )
}
// (entryKey: [string, FormDataEntryValue]) => {
//   return (
//     entryKey.includes('activo') ||
//       entryKey.includes('serial') ||
//       entryKey.includes('modelId') ||
//       entryKey.includes('status')
//   )
// }
