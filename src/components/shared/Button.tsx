type Props = {
  type?: 'button' | 'submit' | 'reset',
  children: JSX.Element | string,
  className?: string,
  addClassName?: string,
  handleClick: Function,
}

const Button = ({ type = 'button', children, className = "px-3 py-2 bg-white mx-auto hover:bg-gray-400", addClassName = "", handleClick }: Props) => {
  return (
    <button
      type={type}
      className={`${className} ${addClassName}`}
      onClick={() => handleClick()}
    >
      {typeof children === "string" ? children : {...children}}
    </button>
  )
}

export default Button