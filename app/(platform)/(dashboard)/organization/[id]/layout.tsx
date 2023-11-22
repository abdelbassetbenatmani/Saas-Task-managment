import React from 'react'
import OrganizationController from './_components/OrganizationController'
import { auth } from '@clerk/nextjs'

export async function generateMetadata() {
  const {orgSlug} = auth()
  return {
    title: `${orgSlug}` ,
  }
}

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