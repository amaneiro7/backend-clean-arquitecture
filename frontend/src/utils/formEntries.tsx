interface Props {
  targetReference: EventTarget
  formReference: 'deviceForm' | 'brandForm' | 'categoryForm' | 'modelForm'
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
  ),
  categoryForm: (entrKey: [FormDataEntryValue]) => (
    entrKey.includes('name')
  ),
  brandForm: (entrKey: [FormDataEntryValue]) => (
    entrKey.includes('name')
  ),
  modelForm: (entrKey: [FormDataEntryValue]) => (
    entrKey.includes('name') ||
    entrKey.includes('categoryId') ||
    entrKey.includes('brandId')
  )
}
