import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const CommentForm = (props) => {
  const [comment, setComment] = React.useState(
    props?.comment?.comment ? props.comment.comment : ''
  )
  const onSubmit = (data) => {
    props.onSave(data, props?.comment?.id)
    setComment('')
  }

  return (
    <div className="rw-form-wrapper post-dialog -mb-6 -mx-6 mt-6 border-t dark:border-gray-600">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <div>
          <Label name="comment" className="sr-only">
            Comment
          </Label>
          <TextAreaField
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
            placeholder="Add your comment..."
          />
          <FieldError name="comment" className="rw-field-error" />
        </div>

        {comment && (
          <div className="pt-2 pb-6 px-6">
            <Submit
              disabled={props.loading}
              className="px-4 py-2 -mt-2 text-sm bg-yellow-500 dark:bg-yellow-400 rounded-md font-semibold text-gray-900 w-full transition-colors duration-300"
            >
              Add comment
            </Submit>
          </div>
        )}
      </Form>
    </div>
  )
}

export default CommentForm
