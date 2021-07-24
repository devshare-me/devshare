import ReactMarkdown from 'react-markdown'
import markdownFile from 'src/lib/md-pages/privacy.md'

const PrivacyPage = () => {
  // eslint-disable-next-line react/no-children-prop
  return <ReactMarkdown className="markdown" children={`${markdownFile}`} />
}

export default PrivacyPage
