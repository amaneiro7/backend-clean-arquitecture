import debounce from 'just-debounce-it'
import { useCallback } from 'react'

export const useDebounceGetdevices = (trigger: () => void) => useCallback(
  debounce(() => {
    trigger()
  }, 300),
  [trigger]
)
