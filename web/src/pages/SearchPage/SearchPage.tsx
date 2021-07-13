import SearchCell from 'src/components/SearchCell'

const SearchPage = ({ q }) => {
  return <>{q && <SearchCell query={q} />}</>
}

export default SearchPage
