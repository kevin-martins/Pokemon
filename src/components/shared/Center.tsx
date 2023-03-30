type Props = {
  children: JSX.Element
}

// TODO: component too complex to use, why not just adjust CSS properties
export const Center = ({ children }: Props): JSX.Element => {
  return (
    <div className="grid h-full place-items-center">
      {children}
    </div>
  )
}

export default Center