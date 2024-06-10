
import { useSearchParams } from 'react-router-dom'
interface inputDataType {
    name: string
    value: string
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_, setSearchParams] = useSearchParams()
export const updateSearchParams = (
    setSearchParams: (
      newParams: Parameters<typeof setSearchParams>[0],
      options?: Parameters<typeof setSearchParams>[1]
    ) => void
  ) => ({ name, value }: inputDataType) => {
    if (value === '') {
      setSearchParams(prev => {
        prev.delete(name)
        return prev
      })
    } else {
      setSearchParams(prev => {
        prev.set(name, value)
        return prev
      }, { replace: true })
    }
  }
