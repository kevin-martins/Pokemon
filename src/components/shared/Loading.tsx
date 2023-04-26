import Center from './Center'
import '../../styles/loading.css'

type Props = {
  index: number
}

const Loading = ({ index }: Props): JSX.Element => {
  return (
    <div className="grid h-full place-items-center min-w-screen">
      <div className="pokeball pulse" />
    </div>
  )
}

export default Loading