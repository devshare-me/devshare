const Wrapper = ({ children, full = false }) => {
  return (
    <div className={`${full ? 'max-w-6xl' : 'max-w-2xl'} w-full mx-auto`}>
      {children}
    </div>
  )
}

export default Wrapper
