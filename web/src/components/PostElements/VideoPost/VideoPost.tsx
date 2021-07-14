import ReactPlayer from 'react-player'

const VideoPost = ({ url = '' }) => {
  return (
    <>
      {url && (
        <div className="aspect-w-16 aspect-h-9">
          <ReactPlayer url={url} width="100%" height="100%" />
        </div>
      )}
    </>
  )
}

export default VideoPost
