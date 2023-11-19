import React from 'react'
import OrganizationController from './_components/OrganizationController'

const OrganizationLayoutId = (
    {children}:{
        children:React.ReactNode
    }
) => {
  return (
    <>
        <OrganizationController/>
        {children}
    </>
  )
}

export default OrganizationLayoutId