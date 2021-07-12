import BookmarksCell from 'src/components/BookmarksCell'
import { Helmet } from 'react-helmet'

const BookmarksPage = () => {
  return (
    <>
      <Helmet>
        <title>Bookmarks</title>
      </Helmet>
      <h1 className="font-bold text-2xl mb-4">Bookmarks</h1>
      <BookmarksCell />
    </>
  )
}

export default BookmarksPage
