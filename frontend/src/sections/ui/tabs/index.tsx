import * as Tabs from '@radix-ui/react-tabs'
import { type FC, useState } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { useAppContext } from '../../Context/AppContext'
import { useDebounceGetdevices } from '../../Hooks/useDebounceGetDevices'

interface Props {
  value: Primitives<CategoryId>
  onChange: (field, value) => void
}
const TabsComponent: FC<Props> = ({
  value,
  onChange
}) => {
  const { category: { categories: tabItems }, device: { handleHasUrlSearch } } = useAppContext()
  const [selectedTab, setSelectedTab] = useState('')

  return (
    <Tabs.Root
      className="max-w-screen-xl mt-2 mx-auto px-4 md:px-8"
      value={value}
      onValueChange={(value => {
        onChange('categoryId', value)
        useDebounceGetdevices(handleHasUrlSearch)
      })}
    >
      <Tabs.List
        className="hidden gap-x-3 py-1 overflow-x-auto px-px text-sm sm:flex"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
        value=''
        >
            Todos
        </Tabs.Trigger>
        {tabItems.map((item) => (
          <Tabs.Trigger
            key={item.id}
            className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 data-[state=active]:shadow-sm outline-gray-800 py-1.5 px-3 rounded-lg duration-150 text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-100 font-medium"
            value={item.id}
          >
            {item.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="relative text-gray-500 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <select
          value={selectedTab}
          className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-gray-800 text-sm"
          onChange={(e) => { setSelectedTab(e.target.value) }}
        >
          {tabItems.map((item) => (
            <option key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </Tabs.Root>
  )
}

export default TabsComponent
