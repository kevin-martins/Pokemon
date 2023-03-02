type Props = {
    type: 'button' | 'submit' | 'reset',
    text: string,
    className?: string,
    handleClick: Function,
}

const Button = ({ type = 'button', text, className = "", handleClick }: Props) => {
  return (
    <button
      type={type}
      className={`px-3 py-2 bg-white hover:bg-gray-400 ${className}`}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  )
}

export default Button