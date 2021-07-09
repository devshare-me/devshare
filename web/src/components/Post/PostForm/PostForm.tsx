import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const PostForm = (props) => {
  const type = props.type ? props.type : props.post.type

  const onSubmit = (data) => {
    data.type = type
    props.onSave(data, props?.post?.id)
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
            <Label
              name="title"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Title
            </Label>
            <TextField
              name="title"
              defaultValue={props.post?.title}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="title" className="rw-field-error" />
          </>
        )}

        {['link', 'image', 'video'].includes(type) && (
          <>
            <Label
              name="url"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Url
            </Label>
            <TextField
              name="url"
              defaultValue={props.post?.url}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="url" className="rw-field-error" />
          </>
        )}

        {['update', 'article', 'snippet'].includes(type) && (
          <>
            <Label
              name="content"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Content
            </Label>
            <TextField
              name="content"
              defaultValue={props.post?.content}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="content" className="rw-field-error" />
          </>
        )}

        {['snippet', 'link', 'image', 'video'].includes(type) && (
          <>
            <Label
              name="description"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Description
            </Label>
            <TextField
              name="description"
              defaultValue={props.post?.description}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: false }}
            />
            <FieldError name="description" className="rw-field-error" />
          </>
        )}

        <Label
          name="private"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Private
        </Label>
        <CheckboxField
          name="private"
          defaultChecked={props.post?.private}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="private" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm
