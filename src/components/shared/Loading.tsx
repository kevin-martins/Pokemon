import Center from './Center'
import '../../styles/loading.css'

const Loading = (): JSX.Element => {
  return (
    <div className="relative grid place-items-center min-w-screen">
      <div className="pokeball pulse" />
    </div>
  )
}

export default Loading