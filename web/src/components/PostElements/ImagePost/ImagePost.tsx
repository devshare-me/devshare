import Modal from 'src/components/Modal'

const ImagePost = ({ url = '' }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {url && (
        <>
          <button
            className="flex items-center justify-center bg-gray-800 aspect-w-3 aspect-h-2 w-full"
            onClick={() => setIsOpen(true)}
          >
            <img src={url} alt="" className="object-cover" />
          </button>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} full={true}>
            <div className="flex items-center justify-center bg-gray-800">
              <img
                src={url}
                alt=""
                className="max-h-screen max-w-screen h-auto w-auto"
              />
            </div>
          </Modal>
        </>
      )}
    </>
  )
}

export default ImagePost
