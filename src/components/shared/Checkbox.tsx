type Props = {
  text: string,
  value: boolean,
  onChange: Function,
}

export const Checkbox = ({ text, value, onChange }: Props) => {
  return (
    <label className="text-white">
      <input type="checkbox" checked={value} onChange={() => onChange()} />
      {text}
    </label>
  )
}

export default Checkbox