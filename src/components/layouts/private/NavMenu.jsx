import React, { useState } from 'react'
import { useSession } from '../../../contexts/SessionContext'
import Logo from '../../../assets/./vectors/logo.svg'
import Menu from '../../../assets/./vectors/menu.svg'

const NavMenu = () => {
  const { signOut } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav className="w-full">
      <details className="nav-menu" open={open}>
        <summary className="nav-menu-trigger">
          <h6 className="nav-menu-heading text-marine">
            <a href="/">
              <img src={Logo} alt="my-academy-logo" className="h-[3rem] w-auto" />
            </a>
          </h6>
          <span className="nav-menu-trigger-icon" onClick={() => setOpen(!open)}>
            <img src={Menu} alt="menu-icon" className="h-[1.5rem] w-auto" />
          </span>
        </summary>
        <div className="nav-menu-body">
          <div className="absolute top-0 left-0 flex flex-col items-center gap-2 w-full h-dvh bg-white z-50 text-marine font-bold">
            <div className="flex flex-col items-center justify-between w-full p-4" style={{ height: 'calc(100dvh - 5rem)' }}>
              <div className="flex flex-col items-center gap-2 w-full">
                <a href="/about" className="flex items-center justify-center w-full p-2">About</a>
                <a href="/settings" className="flex items-center justify-center w-full p-2">Settings</a>
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <a href="/" onClick={signOut} className="flex items-center justify-center w-full p-2">
                  <div className="flex justify-center gap-2">
                    <span>Sign Out</span>
                    <span className="text-2l">↪</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </details>
    </nav>
  )
}

export default NavMenu
