import React from 'react'
import Center from '../shared/Center'

type Props = {
  message: string
}

const TeamCardMessage = ({ message }: Props) => {
  return (
    <div className='absolute text-center top-0 w-full bg-gray-900/70 h-full rounded-lg'>
      <div className='grid h-full place-items-center p-5'>
        <p className='text-white'>
          {message}
        </p>
      </div>
    </div>
  )
}

export default TeamCardMessage