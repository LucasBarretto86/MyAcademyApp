import React from 'react'
import Logo from '../assets/images/logo.svg'

const MainLayout = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center p-6 mb-6">
        <img src={Logo} alt="my-academy-logo" className="h-[8rem] w-auto" />
      </header>
      <main className="flex flex-col items-center justify-self-center gap-x-1 py-5 px-8 w-[100%]">{children}</main>
      <footer className="flex justify-center items-center p-6">
        <small><span>My App</span> is offered by <a href="https://lucasbarretto.com">Lucas Barretto</a>.</small>
      </footer>
    </>
  )
}

export default MainLayout
