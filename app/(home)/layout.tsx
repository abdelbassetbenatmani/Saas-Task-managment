import React from 'react'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-full'>
        <Navbar />
        <main className='pt-40 bg-[#f2f5f8] h-full'>{children}</main>
        <Footer/>
    </div>
  )
}

export default layout