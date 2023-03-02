import { Link } from 'react-router-dom'

type Props = {
  to: string,
  className?: string,
  children: string | JSX.Element,
  setHoverState?: Function,
}

const Redirection = ({ to, className = "", children, setHoverState = () => {} }: Props): JSX.Element => {
  return (
    <Link to={to} className={className} onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}>
      {children}
    </Link>
  )
}

export default Redirection