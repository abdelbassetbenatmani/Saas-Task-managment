import db from '@/lib/db';
import React from 'react'
import Form from './form';

const OrganizationPage = () => {
  async function handleOrganizationChange(formData:FormData) {
    "use server";
    await db.board.create({
      data: {
        title: formData.get("title") as string,
      }
    
    })
  }
  return (
    <div>
       
      <Form/>
    </div>
  )
}

export default OrganizationPage