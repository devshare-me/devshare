import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  HiddenField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'
import { filters } from 'src/utils/filters'
import { FiCornerUpRight } from 'react-icons/fi'

const PostForm = (props) => {
  const type = props.type ? props.type : props.post.type

  const onSubmit = (data) => {
    data.type = type
    props.onSave(data, props?.post?.id)
  }

  let filter = filters.find(
    (x) => x.singular === type.charAt(0).toUpperCase() + type.slice(1)
  )

  if (filter === undefined) {
    filter = {
      name: 'Reshares',
      singular: 'Reshare',
      icon: FiCornerUpRight,
      color: 'gray',
    }
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

        {['article'].includes(type) && (
          <>
            <Label name="title" className="sr-only" errorClassName="sr-only">
              Title
            </Label>
            <TextField
              name="title"
              defaultValue={props.post?.title}
              className="rw-input text-lg font-bold"
              errorClassName="rw-input text-lg font-bold rw-input-error"
              placeholder="Article title"
              validation={{ required: true }}
            />
            <FieldError name="title" className="rw-field-error" />
          </>
        )}

        {['link', 'image', 'video'].includes(type) && (
          <>
            <Label name="url" className="sr-only" errorClassName="sr-only">
              Url
            </Label>
            <TextField
              name="url"
              defaultValue={props.post?.url}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              placeholder={`${type} URL`}
              validation={{ required: true }}
            />
            <FieldError name="url" className="rw-field-error" />
          </>
        )}

        {['update', 'article', 'snippet'].includes(type) && (
          <>
            <Label name="content" className="sr-only" errorClassName="sr-only">
              Content
            </Label>
            <TextAreaField
              name="content"
              defaultValue={props.post?.content}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              placeholder={
                type === 'update'
                  ? 'What are you up to?'
                  : type === 'article'
                  ? 'Write your article...'
                  : 'Snippet content'
              }
              validation={{ required: true }}
            />
            <FieldError name="content" className="rw-field-error" />
          </>
        )}

        {['snippet', 'link', 'image', 'video', 'share'].includes(type) && (
          <>
            <Label
              name="description"
              className="sr-only"
              errorClassName="sr-only"
            >
              Description
            </Label>
            <TextAreaField
              name="description"
              defaultValue={props.post?.description}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: false }}
              placeholder={`${type} description (optional)`}
            />
            <FieldError name="description" className="rw-field-error" />
          </>
        )}

        {type === 'share' && (
          <>
            <HiddenField
              name="sharedPostId"
              value={
                props.sharedPostId
                  ? props.sharedPostId
                  : props.post.sharedPostId
              }
            />
          </>
        )}

        <div className="flex md:items-center justify-between flex-col md:flex-row mt-6 p-6 -mx-6 -mb-6 bg-gray-50 border-t border-solid border-gray-200">
          <div
            className={`${
              type === 'share' ? 'hidden ' : ''
            }mb-4 md:mb-0 md:max-w-xs`}
          >
            <div className="flex items-center text-sm font-semibold">
              <CheckboxField
                name="private"
                defaultChecked={props.post?.private}
                className="mr-2"
                errorClassName="mr-2"
              />
              <Label name="private" className="" errorClassName="">
                Private
              </Label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              When marked as private, comments are disabled and only you can see
              the private {filter.singular.toLowerCase()}
            </p>
          </div>

          <Submit
            disabled={props.loading}
            className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-${filter.color}-900 bg-${filter.color}-200 border border-transparent rounded-md transition-colors duration-300 hover:bg-${filter.color}-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${filter.color}-500`}
          >
            {`${props.edit ? 'Save' : 'Post'} ${filter.singular}`}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm
