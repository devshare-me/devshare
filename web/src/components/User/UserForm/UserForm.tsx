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

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

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
        <FieldError name="name" className="rw-field-error" />

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
        <FieldError name="location" className="rw-field-error" />

        <Label
          name="github"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Github Username
        </Label>
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center pl-2 text-sm">@</span>
          <TextField
            name="github"
            defaultValue={props.user?.github}
            className="rw-input flex-1 mt-0 pl-0"
            errorClassName="rw-input flex-1 mt-0 pl-0 rw-input-error"
            validation={{ required: false }}
          />
        </div>
        <FieldError name="github" className="rw-field-error" />

        <Label
          name="twitter"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Twitter Username
        </Label>
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center pl-2 text-sm">@</span>
          <TextField
            name="twitter"
            defaultValue={props.user?.twitter}
            className="rw-input flex-1 mt-0 pl-0"
            errorClassName="rw-input flex-1 mt-0 pl-0 rw-input-error"
            validation={{ required: false }}
          />
        </div>
        <FieldError name="twitter" className="rw-field-error" />

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
        <FieldError name="website" className="rw-field-error" />

        <div className="flex items-center justify-end space-x-2">
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
