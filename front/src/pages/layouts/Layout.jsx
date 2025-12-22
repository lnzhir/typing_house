import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../componets/MainNav'
import Footer from '../componets/Footer'

const Layout = () => {
  return (
    <div>
      <MainNav/>
      
      <main className='h-full px-4 mt-2 mx-auto'>

      <Outlet/>
      </main>
      {/*<Footer/>*/}
    </div>
  )
}

export default Layout
