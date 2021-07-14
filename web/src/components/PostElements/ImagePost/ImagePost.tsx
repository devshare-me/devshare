const ImagePost = ({ url = '' }) => {
  return (
    <>
      {url && (
        <div className="flex items-center justify-center bg-gray-800 w-full">
          <img src={url} alt="" className="max-h-screen" />
        </div>
      )}
    </>
  )
}

export default ImagePost
