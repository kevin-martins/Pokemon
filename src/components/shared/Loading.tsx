import '../../styles/loading.css'

const Loading = (): JSX.Element => {
  return (
    <div className="grid h-full place-items-center min-w-screen pt-5 pb-10">
      <div className="pokeball pulse" />
    </div>
  )
}

export default Loading