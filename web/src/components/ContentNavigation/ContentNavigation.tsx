import { useLocation, navigate } from '@redwoodjs/router'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi'

const ContentNavigation = ({ navItems, query, current = null, label = '' }) => {
  const { pathname, search } = useLocation()

  const params = new URLSearchParams(search)
  const term = params.get(query)
  const currentTerm = current ? current : term

  const filterAttr = currentTerm
    ? navItems.find(
        (x) =>
          x.singular ===
          currentTerm.charAt(0).toUpperCase() + currentTerm.slice(1)
      )
    : navItems[0]

  const [selectedItem, setSelectedItem] = React.useState(filterAttr)

  React.useEffect(() => {
    navigate(
      setUrlParams(
        selectedItem.singular ? selectedItem.singular.toLowerCase() : ''
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const setUrlParams = (value?: string) => {
    if (!value) {
      params.delete(query)
    } else {
      params.set(query, value)
    }

    const string = params.toString()

    let path = pathname

    if (string) path += '?' + string

    return path
  }

  const itemColor = (color: string) => {
    if (color) {
      return color
    } else {
      return 'gray'
    }
  }

  return (
    <>
      <nav className="flex items-center flex-wrap">
        <Listbox value={selectedItem} onChange={setSelectedItem}>
          <div className="relative">
            {label && (
              <Listbox.Label className="text-xs font-semibold ml-2 text-opacity-75">
                {label}
              </Listbox.Label>
            )}
            <Listbox.Button
              className={`${
                itemColor(selectedItem.color)
                  ? `bg-${itemColor(
                      selectedItem.color
                    )}-200 dark:bg-${itemColor(
                      selectedItem.color
                    )}-800 text-${itemColor(
                      selectedItem.color
                    )}-800 dark:text-${itemColor(
                      selectedItem.color
                    )}-200 border-${itemColor(
                      selectedItem.color
                    )}-200 dark:border-${itemColor(selectedItem.color)}-600`
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600'
              } relative rounded-full border flex items-center pl-3 pr-6 py-1 font-semibold focus:outline-none hover:bg-${itemColor(
                selectedItem.color
              )}-200 dark:hover:bg-${itemColor(
                selectedItem.color
              )}-800 text-sm hover:text-${itemColor(
                selectedItem.color
              )}-800 dark:hover:text-${itemColor(
                selectedItem.color
              )}-200 focus:ring-${itemColor(
                selectedItem.color
              )}-500 dark:focus:ring-offset-0`}
            >
              <span className="block truncate">{selectedItem.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="w-3 h-3" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute font-semibold text-sm z-30 w-48 py-1 mt-2 overflow-hidden max-h-60 bg-gray-200 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                {navItems.map((item, i) => (
                  <Listbox.Option key={i} value={item} as={Fragment}>
                    {({ active, selected }) => (
                      <div
                        className={`${
                          active || selected
                            ? `bg-${itemColor(
                                item.color
                              )}-100 dark:bg-${itemColor(item.color)}-800 `
                            : ''
                        }px-3 py-1 cursor-pointer`}
                      >
                        {item.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </nav>
    </>
  )
}

export default ContentNavigation
