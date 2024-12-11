import React from 'react'
import { useSession } from '../../../contexts/SessionContext'
import Logo from '../../../assets/images/logo.svg'

const NavBar = () => {
  const { signOut } = useSession()
  return (
    <nav className="flex justify-between py-2 px-4 border-b border-1 border-gray-300 p-2">
      <a href="/">
        <img src={Logo} alt="my-academy-logo" className="h-[3rem] w-auto" />
      </a>
      <div className="flex gap-2 items-center text-marine font-bold">
        <a href="/courses" className="hover:opacity-50 p-2">Courses</a>
        <a href="/about" className="hover:opacity-50 p-2">About</a>
        <a href="/settings" className="hover:opacity-50 p-2">Settings</a>
        <a href="/" onClick={signOut} className="hover:opacity-50 p-2">Sign Out</a>
      </div>
    </nav>
  )
}

export default NavBar
