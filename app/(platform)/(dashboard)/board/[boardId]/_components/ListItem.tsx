"use client"
import React from 'react'
import ListHeader from './ListHeader'
import { ListWithCards } from '@/types'

type Props = {
    data: ListWithCards
    index: number
}

const ListItem = ({
    data,
    index

}:Props) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
        <div className='w-full rounded-md bg-slate-300 pb-2'>   
        <ListHeader list={data} />
        </div>

    </li>
  )
}

export default ListItem