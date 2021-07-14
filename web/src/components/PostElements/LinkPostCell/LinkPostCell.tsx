import type { FindLinkPostQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query GetOgData($url: String!) {
    ogData(url: $url) {
      title
      description
      image
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => {
  console.error(error)
  return (
    <div className="text-red-700 px-6 py-2 font-semibold">
      URL is not valid or is not compatible. Please check the URL and try again.
    </div>
  )
}

export const Success = ({
  ogData,
  url,
}: CellSuccessProps<FindLinkPostQuery>) => {
  const [imageHeight, setImageHeight] = React.useState(null)
  const [imageWidth, setImageWidth] = React.useState(null)

  const img = new Image()
  img.src = ogData.image

  img.addEventListener('load', function () {
    setImageHeight(this.naturalHeight)
    setImageWidth(this.naturalWidth)
  })

  const horizontalImg =
    imageHeight && imageWidth ? (imageWidth > imageHeight ? true : false) : true

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`${
        horizontalImg ? 'flex-col' : 'flex-row'
      } flex bg-gray-900 group hover:text-gray-900`}
    >
      <div
        className={`${
          !horizontalImg ? 'w-1/4' : 'aspect-w-16 aspect-h-9'
        } transition-opacity duration-300 group-hover:opacity-80`}
      >
        <img src={ogData.image} alt="" className="content-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-center bg-gray-200 p-6 transition-colors duration-300 group-hover:bg-gray-300">
        <h3 className="font-bold">{ogData.title}</h3>
        <p>{ogData.description}</p>
      </div>
    </a>
  )
}
