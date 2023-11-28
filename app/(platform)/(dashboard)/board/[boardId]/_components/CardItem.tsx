import { Card } from '@prisma/client'
import React from 'react'

type Props = {
    card:Card,
    index: number
}

const CardItem = ({
    card,
    index
}:Props) => {
  return (
    <div 
        role={"button"}
        className='bg-white rounded-md p-2 mb-2 cursor-pointer shadow-sm font-semibold'
    >
        {card.title}
    </div>
  )
}

export default CardItem