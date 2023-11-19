import React from 'react'
import Sidbar from '../_components/Sidbar'

type Props = {}

const OrganizationLayout = (
    {children}:{
        children:React.ReactNode
    }
) => {
  return (
    <div className='pt-20 mx-auto'>
        <div className='flex space-x-7 '>
        {/* Sidebar */}
        <div className='w-64 shrink-0 hidden md:block md:ps-6'>
          <Sidbar/>  
        </div>
        {children}
        </div>
    </div>
  )
}

export default OrganizationLayout