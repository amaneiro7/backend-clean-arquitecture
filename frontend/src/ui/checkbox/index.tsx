interface Props {
  text: string
  label: string
}
export function Checkbox ({ text, label }: Props) {
  return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    id={label}
                    aria-describedby={label}
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
            </div>
            <div className="ml-3 text-sm">
                <label
                    htmlFor={label}
                    className="text-gray-500 dark:text-gray-300"
                >
                    {text}
                </label>
            </div>
        </div>
  )
}
