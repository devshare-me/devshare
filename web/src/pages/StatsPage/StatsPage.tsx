import StatsCell from 'src/components/StatsCell'
import { Helmet } from 'react-helmet'

const StatsPage = () => {
  return (
    <>
      <Helmet>
        <title>Stats</title>
      </Helmet>
      <h1 className="text-2xl font-bold">DevShare Stats</h1>
      <StatsCell />
    </>
  )
}

export default StatsPage
