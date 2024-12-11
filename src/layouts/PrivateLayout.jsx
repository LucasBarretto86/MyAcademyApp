import React from 'react'
import NavBar from '../components/layouts/private/NavBar'
import NavMenu from '../components/layouts/private/NavMenu'
import { isMobile } from '../utils/device'

const PrivateLayout = ({ children }) => {
  console.log(isMobile)
  return (<>
    {
      isMobile
        ? <NavMenu />
        : <NavBar />
    }

    <main className="flex flex-col items-center justify-self-center gap-x-1 py-5 px-8 w-[100%]">{children}</main>

    <footer className="flex justify-center items-center p-6">
      <small><span>My App</span> is offered by <a href="https://lucasbarretto.com">Lucas Barretto</a>.</small>
    </footer>
  </>)
}

export default PrivateLayout
