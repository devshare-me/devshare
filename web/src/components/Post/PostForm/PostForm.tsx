import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  HiddenField,
  Submit,
} from '@redwoodjs/forms'
import CodeEditor from 'src/components/CodeEditor'
import { useForm } from 'react-hook-form'
import { filters } from 'src/utils/filters'
import ReactPlayer from 'react-player'
import Modal from 'src/components/Modal'
import Toggle from 'src/components/Toggle'
import VideoPost from 'src/components/PostElements/VideoPost'
import ImagePost from 'src/components/PostElements/ImagePost'
import LinkPostCell from 'src/components/PostElements/LinkPostCell'
import { FiCornerUpRight } from 'react-icons/fi'

const PostForm = (props) => {
  const type = props.type ? props.type : props.post.type
  const formMethods = useForm()

  const [linkUrl, setLinkUrl] = React.useState(props.post?.url)
  const [imageUrl, setImageUrl] = React.useState(props.post?.url)
  const [videoUrl, setVideoUrl] = React.useState(props.post?.url)
  const [urlWorks, setUrlWorks] = React.useState(true)
  const [isPrivate, setIsPrivate] = React.useState(props?.post?.private)
  const [isPrivateOpen, setIsPrivateOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({})

  const titleRef = React.useRef(null)
  const urlRef = React.useRef(null)
  const contentRef = React.useRef(null)
  const descriptionRef = React.useRef(null)

  const isValidUrl = (url: string) => {
    const regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/

    if (regexp.test(url)) {
      return true
    } else {
      return false
    }
  }

  React.useEffect(() => {
    formMethods.clearErrors()
    if (type === 'article') {
      titleRef.current.focus()
    } else if (['link', 'image', 'video'].includes(type)) {
      urlRef.current.focus()
    } else if (['update'].includes(type)) {
      contentRef.current.focus()
    } else if (type === 'share') {
      descriptionRef.current.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const onSubmit = (data) => {
    data.type = type
    data.private = isPrivate ? true : false

    setFormData(data)

    if (props.edit && !props?.post?.private && data.private) {
      setIsPrivateOpen(true)
    } else {
      onConfirmSubmit(data)
    }
  }

  const onConfirmSubmit = (data) => {
    props.onSave(data, props?.post?.id)
  }

  const setUrl = (e) => {
    const value = e.target.value
    setUrlWorks(true)

    if (type === 'video') {
      setVideoUrl(value)
      setUrlWorks(ReactPlayer.canPlay(value))
    } else if (type === 'image') {
      setImageUrl(value)
    } else {
      setLinkUrl(value)
    }
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
      <Form onSubmit={onSubmit} error={props.error} formMethods={formMethods}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        {['article'].includes(type) && (
          <div>
            <Label name="title" className="sr-only" errorClassName="sr-only">
              Title
            </Label>
            <TextField
              name="title"
              ref={titleRef}
              defaultValue={props.post?.title}
              className="rw-input font-bold"
              errorClassName="rw-input font-bold rw-input-error"
              placeholder="Article title"
              validation={{ required: true }}
            />
            <FieldError name="title" className="rw-field-error" />
            <hr />
          </div>
        )}

        {['link', 'image', 'video'].includes(type) && (
          <div>
            <Label name="url" className="sr-only" errorClassName="sr-only">
              Url
            </Label>
            <TextField
              name="url"
              ref={urlRef}
              defaultValue={props.post?.url}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              placeholder={`${filter.singular} URL`}
              validation={{ required: true }}
              onChange={(e) => setUrl(e)}
            />
            <FieldError name="url" className="rw-field-error" />

            {(linkUrl || imageUrl || videoUrl) && (
              <>
                {!urlWorks && (
                  <div className="text-red-700 px-6 py-2 font-semibold">
                    URL is not valid or is not compatible. Please check the URL
                    and try again.
                  </div>
                )}
                {type === 'video' &&
                  videoUrl &&
                  isValidUrl(videoUrl) &&
                  urlWorks && <VideoPost url={videoUrl} />}
                {type === 'image' &&
                  imageUrl &&
                  isValidUrl(imageUrl) &&
                  urlWorks && <ImagePost url={imageUrl} />}
                {type === 'link' &&
                  linkUrl &&
                  isValidUrl(linkUrl) &&
                  urlWorks && <LinkPostCell url={linkUrl} />}
              </>
            )}
            <hr />
          </div>
        )}

        {['update', 'article', 'snippet'].includes(type) && (
          <div>
            <Label name="content" className="sr-only" errorClassName="sr-only">
              Content
            </Label>

            {type === 'snippet' ? (
              <CodeEditor />
            ) : (
              <TextAreaField
                name="content"
                ref={contentRef}
                defaultValue={props.post?.content}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                placeholder={
                  type === 'update'
                    ? 'What are you up to?'
                    : 'Write your article...'
                }
                validation={{ required: true }}
              />
            )}
            <FieldError name="content" className="rw-field-error" />
            {type === 'snippet' && <hr className="px-6" />}
          </div>
        )}

        {['snippet', 'link', 'image', 'video', 'share'].includes(type) && (
          <div>
            <Label
              name="description"
              className="sr-only"
              errorClassName="sr-only"
            >
              Description
            </Label>
            <TextAreaField
              name="description"
              ref={descriptionRef}
              defaultValue={props.post?.description}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: false }}
              placeholder={`Description (optional)`}
            />
            <FieldError name="description" className="rw-field-error" />
          </div>
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

        <div className="post-confirm flex md:items-center justify-between flex-col md:flex-row p-6 bg-gray-50 dark:bg-gray-800 border-t border-solid border-gray-200 dark:border-gray-700">
          <div
            className={`${
              type === 'share' ? 'hidden ' : ''
            }mb-4 md:mb-0 md:max-w-xs`}
          >
            <div>
              <Toggle
                enabled={isPrivate}
                setEnabled={setIsPrivate}
                label="Private"
                flex={true}
                color={filter.color}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              When marked as private, comments are disabled and only you can see
              the private {filter.singular.toLowerCase()}
            </p>
          </div>

          <Modal
            isOpen={isPrivateOpen}
            setIsOpen={setIsPrivateOpen}
            title="Warning: Switching to private post"
            color="red"
          >
            <div className="space-y-2">
              <p>
                Are you sure you want to switch this to a private post? If you
                switch from a public post to a private post all comments,
                bookmarks, and shares with be deleted.
              </p>
              <p>
                <strong>These cannot be recovered!</strong>
              </p>
              <div className="flex items-center justify-end space-x-2 pt-6">
                <button
                  onClick={() => {
                    setIsPrivateOpen(false)
                  }}
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-md transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onConfirmSubmit(formData)}
                  className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-red-900 dark:text-red-100 bg-red-200 dark:bg-red-800 border border-transparent rounded-md transition-colors duration-300 hover:bg-red-300 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Confirm private post
                </button>
              </div>
            </div>
          </Modal>

          <Submit
            disabled={props.loading}
            className={`inline-flex justify-center px-4 py-2 text-sm font-semibold text-${filter.color}-900 dark:text-${filter.color}-100 bg-${filter.color}-200 dark:bg-${filter.color}-600 dark:hover:bg-${filter.color}-700 border border-transparent rounded-md transition-colors duration-300 hover:bg-${filter.color}-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${filter.color}-500 dark:focus:ring-${filter.color}-400`}
          >
            {`${props.edit ? 'Save' : 'Post'} ${filter.singular}`}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm
