import {
  Form,
  FieldError,
  Label,
  TextAreaField,
  HiddenField,
  Submit,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { Helmet } from 'react-helmet'

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ReportPage = ({ type, id }) => {
  const commentRef = React.useRef(null)
  const [reason, setReason] = React.useState('')
  const { currentUser } = useAuth()

  React.useEffect(() => {
    commentRef.current.focus()
  }, [])

  const onSubmit = (data) => {
    data.id = id
    data.type = type
    data.reporterEmail = currentUser?.email ? currentUser.email : ''

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...data }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error))
  }

  return (
    <>
      <Helmet>
        <title>Report {type}</title>
      </Helmet>
      <h1 className="capitalize font-bold text-3xl mb-4">Report {type}</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="rw-form-wrapper">
          <Form onSubmit={onSubmit} data-netlify="true">
            <div>
              <Label
                name="reason"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                {`Reason (optional)`}
              </Label>
              <TextAreaField
                name="reason"
                ref={commentRef}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="rw-input max-h-96"
                errorClassName="rw-input max-h-96 rw-input-error"
                validation={{ required: false }}
                placeholder={`I'm reporting this ${type} because...`}
                style={{ minHeight: '100px' }}
              />
              <FieldError name="reason" className="rw-field-error" />
            </div>
            <HiddenField name="form-name" value="report" />
            <Submit
              className={`inline-flex justify-center px-4 py-2 text-sm font-semibold text-yellow-900 dark:text-yellow-100 bg-yellow-200 dark:bg-yellow-600 dark:hover:bg-yellow-700 border border-transparent rounded-md transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-yellow-400`}
            >
              Report {type}
            </Submit>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ReportPage
