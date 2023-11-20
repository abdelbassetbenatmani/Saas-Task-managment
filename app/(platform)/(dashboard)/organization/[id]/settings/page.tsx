import { OrganizationProfile } from '@clerk/nextjs'
import React from 'react'

const SettingsPage = () => {
  return (
    <div className='w-full'>
        <OrganizationProfile
            appearance={{
                elements:{
                    rootBox:{
                        width: '100%',
                        boxShadow: 'none',
                    },
                    card:{
                        border:"1px sold #e5e7eb",
                        width: '100%',
                        boxShadow: 'none',
                    }
                }
            }}
        />
    </div>
  )
}

export default SettingsPage