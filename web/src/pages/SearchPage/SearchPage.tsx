import SearchCell from 'src/components/SearchCell'

const SearchPage = ({ q }) => {
  return (
    <>
      {q && (
        <>
          <h1 className="font-bold text-2xl mb-8">
            Search results for {`'${q}'`}
          </h1>
          <SearchCell query={q} />
        </>
      )}
    </>
  )
}

export default SearchPage
