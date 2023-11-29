import { Card } from '@prisma/client'
import { Draggable } from '@hello-pangea/dnd'
type Props = {
    card:Card,
    index: number
}

const CardItem = ({
    card,
    index
}:Props) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {
        (provided) => (
          <div 
          role={"button"}
            className='bg-white rounded-md p-2 mb-2 cursor-pointer shadow-sm font-semibold'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {card.title}
          </div>
        )
      }
    </Draggable>
  )
}

export default CardItem