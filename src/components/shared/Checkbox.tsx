type Props = {
  text: string,
  value: boolean,
  className: string,
  onChange: () => void,
}

export const Checkbox = ({ text, value, className, onChange }: Props) => {
  return (
    <label
      className={className}
    >
      <input type="checkbox" checked={value} onChange={() => onChange()} />
      {text}
    </label>
  )
}

export default Checkbox