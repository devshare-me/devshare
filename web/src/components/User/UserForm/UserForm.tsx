import {
  Form,
  FormError,
  CheckboxField,
  SelectField,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { DarkModeContext, DefaultTypeContext } from 'src/layouts/DefaultLayout'
import { filters } from 'src/utils/filters'

const UserForm = (props) => {
  const { currentUser } = useAuth()
  const { isDarkMode, setIsDarkMode } = React.useContext(DarkModeContext)
  const { defaultPostType, setDefaultPostType } =
    React.useContext(DefaultTypeContext)

  const onSubmit = (data) => {
    setDefaultPostType(data.defaultPostType)
    props.onSave(data, props?.user?.id)
  }

  const cancelEdit = () => {
    setIsDarkMode(props.user?.darkMode)
    navigate(routes.profile({ username: currentUser.username }))
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <div className="group-wrapper">
          <Label
            name="name"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Name
          </Label>
          <TextField
            name="name"
            defaultValue={props.user?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        </div>

        <div className="group-wrapper">
          <Label
            name="location"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Location
          </Label>
          <TextField
            name="location"
            defaultValue={props.user?.location}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: false }}
          />
        </div>

        <div className="group-wrapper">
          <Label
            name="github"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            GitHub Username
          </Label>
          <div className="mt-1 flex rounded-md">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-100 sm:text-sm">
              @
            </span>
            <TextField
              name="github"
              defaultValue={props.user?.github}
              className="flex-1 min-w-0 rounded-none rounded-r-md rw-input"
              errorClassName="flex-1 min-w-0 rounded-none rounded-r-md rw-input rw-input-error"
              validation={{ required: false }}
            />
          </div>
        </div>

        <div className="group-wrapper">
          <Label
            name="twitter"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Twitter Username
          </Label>
          <div className="mt-1 flex rounded-md">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-100 sm:text-sm">
              @
            </span>
            <TextField
              name="twitter"
              defaultValue={props.user?.twitter}
              className="rw-input"
              errorClassName="flex-1 min-w-0 rounded-none rounded-r-md rw-input rw-input-error"
              validation={{ required: false }}
            />
          </div>
        </div>

        <div>
          <Label
            name="website"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Website
          </Label>
          <TextField
            name="website"
            defaultValue={props.user?.website}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: false }}
          />
        </div>

        <div>
          <Label
            name="defaultPostType"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Default Post Type
          </Label>
          <SelectField
            name="defaultPostType"
            defaultValue={props.user?.defaultPostType}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          >
            {filters.map(
              (filter, i) =>
                filter?.singular && (
                  <option key={i} value={filter.singular.toLowerCase()}>
                    {filter.singular}
                  </option>
                )
            )}
          </SelectField>
        </div>

        <div className="flex items-center text-sm font-semibold">
          <CheckboxField
            name="darkMode"
            defaultChecked={props.user?.darkMode}
            className={`mr-2 focus:outline-none focus:ring-offset-0 focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-400 dark:bg-gray-700 dark:checked:bg-yellow-600 rounded`}
            onChange={(e) => setIsDarkMode(e.target.checked)}
          />
          <Label name="darkMode" className="" errorClassName="">
            Dark Mode
          </Label>
        </div>

        <div className="flex items-center justify-end space-x-2 mt-6">
          <button
            onClick={cancelEdit}
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 border border-transparent rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <Submit
            disabled={props.loading}
            className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-yellow-900 bg-yellow-200 border border-transparent rounded-md transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
