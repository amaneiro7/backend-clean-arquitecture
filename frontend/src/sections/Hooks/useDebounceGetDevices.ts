import debounce from 'just-debounce-it'
import { useCallback } from 'react'

export default function useDebouncedCallback (callback, delay: number) {
  const debouncedCallback = useCallback(
    debounce(callback, delay),
    [callback, delay]
  )
  return debouncedCallback
}
