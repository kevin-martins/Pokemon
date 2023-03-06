import { Link } from 'react-router-dom'

type Props = {
  to: string,
  className?: string,
  children: string | JSX.Element | JSX.Element[],
}

const Redirection = ({ to, className = "", children }: Props): JSX.Element => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export default Redirection