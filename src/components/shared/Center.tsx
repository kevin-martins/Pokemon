type Props = {
  children: JSX.Element
}

export const Center = ({ children }: Props): JSX.Element => {
  return (
    <div className="grid h-full place-items-center">
      {children}
    </div>
  )
}

export default Center