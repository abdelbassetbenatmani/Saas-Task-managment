"use client"

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/hooks/useCardModal'
import { CardWithList } from '@/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CardHeader from './CardHeader'
import CardDescription from './CardDescription'
import Actions from './Actions'


const CardModal = () => {
    const id = useCardModal((state)=>state.id)
    const isOpen = useCardModal((state)=>state.isOpen)
    const onClose = useCardModal((state)=>state.onClose)


    const {data:CardData} = useQuery<CardWithList>({
        queryKey: ['card', id],
        queryFn: async () => {
            const res = await fetch(`/api/card/${id}`)
            return res.json()
        },
    })
  return (
    <Dialog
        open={isOpen}
        onOpenChange={onClose}
    >
        <DialogContent>
            {
              !CardData ? <CardHeader.Skeleton/> : <CardHeader data={CardData}/>
            }
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
              <div className='col-span-3 '>
                <div className="w-full space-y-6">
                  {
                    !CardData ? <CardDescription.Skeleton/> : <CardDescription data={CardData}/>
                  }
                </div>
              </div>
              {
                !CardData ? <Actions.Skeleton/> : <Actions data={CardData}/>
              }
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CardModal