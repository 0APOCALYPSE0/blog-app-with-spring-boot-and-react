import React from 'react'
import CustomNavbar from './CustomNavbar'

const Layout = ({ title="Welcome to our website", children }) => {
  return (
    <>
      <header className='mb-3'>
        <CustomNavbar />
      </header>
      {children}
      <footer>
        <h3>This is footer</h3>
      </footer>
    </>
  )
}

export default Layout