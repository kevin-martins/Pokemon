import React from 'react'

type Props = {
  text: string,
}

const Title = ({ text }: Props) => {
  return (
    <h1 className="text-center text-7xl text-white pt-10 pb-3">
      {text}
    </h1>
  )
}

export default Title