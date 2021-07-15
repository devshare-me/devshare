import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const UserForm = (props) => {
  const { currentUser } = useAuth()

  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
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
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-700 sm:text-sm">
              @
            </span>
            <TextField
              name="github"
              defaultValue={props.user?.github}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm border-gray-200"
              errorClassName="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm border-gray-200 rw-input-error"
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
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-700 sm:text-sm">
              @
            </span>
            <TextField
              name="twitter"
              defaultValue={props.user?.twitter}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm border-gray-200"
              errorClassName="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm border-gray-200 rw-input-error"
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

        <div className="flex items-center justify-end space-x-2 mt-6">
          <Link
            to={routes.profile({ username: currentUser.username })}
            className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 border border-transparent rounded-md transition-colors duration-300 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </Link>
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
