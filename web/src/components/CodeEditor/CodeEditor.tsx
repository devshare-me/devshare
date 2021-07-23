import { HiddenField } from '@redwoodjs/forms'
import { DarkModeContext } from 'src/layouts/DefaultLayout'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/juejin.css'
import 'codemirror/mode/javascript/javascript'

const CodeEditor = ({ readOnly = false, name = 'content', content = '' }) => {
  const { isDarkMode } = React.useContext(DarkModeContext)
  const theme = isDarkMode ? 'dracula' : 'juejin'

  const prefix = 'DEVSHARE_SNIPPET'
  const savedValue = localStorage.getItem(prefix)

  const [value, setValue] = React.useState(
    savedValue ? savedValue : '// Add your code here...'
  )
  const [language, setLanguage] = React.useState('javascript')

  React.useEffect(() => {
    if (!readOnly) localStorage.setItem(prefix, value)
  }, [readOnly, value])

  return (
    <>
      {!readOnly && (
        <HiddenField
          name={name}
          className="hidden"
          value={value}
          validation={{ required: true }}
        />
      )}
      <CodeMirror
        value={content ? content : value}
        options={{
          mode: language,
          theme,
          lineNumbers: true,
          indentUnit: 4,
          indentWithTabs: true,
          lineWrapping: true,
          readOnly,
        }}
        onChange={(editor, data, value) => {
          if (!readOnly) setValue(value)
        }}
      />
    </>
  )
}

export default CodeEditor
