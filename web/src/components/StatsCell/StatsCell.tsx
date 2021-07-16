import type { StatsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { roundNumber, percentage } from 'src/utils/numbers'

export const QUERY = gql`
  query StatsQuery {
    stats {
      users {
        total
        pastWeek
        pastMonth
        pastYear
      }
      posts {
        total
        updates
        snippets
        articles
        links
        images
        videos
        shares
        private
      }
      comments
      bookmarks
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ stats }: CellSuccessProps<StatsQuery>) => {
  console.log(stats)
  return (
    <>
      <StatSection title="Users">
        <StatBox title="Total Users" value={stats.users.total} />
        <StatBox title="New Users (This Week)" value={stats.users.pastWeek} />
        <StatBox title="New Users (This Month)" value={stats.users.pastMonth} />
        <StatBox title="New Users (This Year)" value={stats.users.pastYear} />
      </StatSection>
      <StatSection title="Posts">
        <StatBox title="Total Posts" value={stats.posts.total} />
        <StatBox
          title="Posts per User"
          value={stats.posts.total / stats.users.total}
        />
        <StatBox
          title="Private Posts"
          value={stats.posts.private}
          percent={stats.posts.private / stats.posts.total}
          percentageLabel="of posts"
        />
      </StatSection>
      <StatSection title="Post Types">
        <StatBox
          title="Total Updates"
          value={stats.posts.updates}
          percent={stats.posts.updates / stats.posts.total}
          percentageLabel="of posts"
        />
        <StatBox
          title="Total Snippets"
          value={stats.posts.snippets}
          percent={stats.posts.snippets / stats.posts.total}
          percentageLabel="of posts"
        />
        <StatBox
          title="Total Links"
          value={stats.posts.links}
          percent={stats.posts.links / stats.posts.total}
          percentageLabel="of posts"
        />
        <StatBox
          title="Total Images"
          value={stats.posts.images}
          percent={stats.posts.images / stats.posts.total}
          percentageLabel="of posts"
        />
        <StatBox
          title="Total Videos"
          value={stats.posts.videos}
          percent={stats.posts.videos / stats.posts.total}
          percentageLabel="of posts"
        />
        <StatBox
          title="Total Articles"
          value={stats.posts.articles}
          percent={stats.posts.articles / stats.posts.total}
          percentageLabel="of posts"
        />
        <StatBox
          title="Total Shares"
          value={stats.posts.shares}
          percent={stats.posts.shares / stats.posts.total}
          percentageLabel="of posts"
        />
      </StatSection>
      <StatSection title="Bookmarks">
        <StatBox title="Total Bookmarks" value={stats.bookmarks} />
        <StatBox
          title="Bookmarks per Post"
          value={stats.bookmarks / stats.posts.total}
        />
      </StatSection>
      <StatSection title="Comments">
        <StatBox title="Total Comments" value={stats.comments} />
        <StatBox
          title="Comments per Post"
          value={stats.comments / stats.posts.total}
        />
      </StatSection>
    </>
  )
}

const StatSection = ({ title, children }) => (
  <>
    <h2 className="mb-2 mt-10 font-bold text-xl">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {children}
    </div>
  </>
)

const StatBox = ({ title, size = 1, percent, percentageLabel, value }) => {
  console.log(value)
  const number = roundNumber(value)
  const thePercent = percentage(percent)
  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 md:col-span-${size}`}
    >
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="flex flex-wrap items-center">
        <span className="text-3xl font-bold font-mono">{number}</span>
        {percent && (
          <span className="text-xs ml-2">{`(${thePercent} ${percentageLabel})`}</span>
        )}
      </div>
    </div>
  )
}
