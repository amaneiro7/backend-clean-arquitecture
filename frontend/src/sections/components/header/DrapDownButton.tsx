import { type Navigation } from '../../Routes/routes'

interface Props {
  route: Navigation
  drapdownState: { isActive: boolean, index: number | null }
  index: number
  handleDrapdownState: (index: number) => void
}
export const DrapDownButton: React.FC<Props> = ({ index, handleDrapdownState, drapdownState, route }) => {
  return (
    <button
        className="w-full flex items-center justify-between gap-1 text-gray-700 hover:text-indigo-600"
        onClick={() => { handleDrapdownState(index) }}
    >
        {route.name}
    {
        drapdownState.index === index && drapdownState.isActive
          ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
            </svg>

            )
          : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
            )
    }
    </button>
  )
}