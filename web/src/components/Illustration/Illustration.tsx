interface IllustrationProps {
  image: string
  message: string
}

const Illustration = (props: IllustrationProps) => {
  return (
    <div className="max-w-sm w-full mx-auto text-center py-12">
      <props.image className="w-full h-auto" />
      {props.message && (
        <p className="font-semibold mt-4 text-gray-500 dark:text-gray-400 text-lg">
          {props.message}
        </p>
      )}
    </div>
  )
}

export default Illustration
