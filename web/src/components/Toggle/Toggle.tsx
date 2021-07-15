import { Switch } from '@headlessui/react'

const Toggle = ({
  enabled,
  setEnabled,
  label,
  flex = false,
  color = 'green',
}) => {
  return (
    <Switch.Group>
      <div className={`${flex ? 'flex items-center' : ''}`}>
        <Switch.Label className="mr-3 rw-label">{label}</Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? `bg-${color}-500` : 'bg-gray-400 dark:bg-gray-600'
          }
          relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}

export default Toggle
