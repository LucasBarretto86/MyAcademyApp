import React from 'react'
import { useSession } from '../../../contexts/SessionContext'
import Accordion from '../../common/Accordion'
import Logo from '../../../assets/./vectors/logo.svg'
import Menu from '../../../assets/./vectors/menu.svg'

const NavMenu = () => {
  const { signOut } = useSession()
  return (
    <nav className="w-full">
      <Accordion
        heading={(
          <a href="/">
            <img src={Logo} alt="my-academy-logo" className="h-[3rem] w-auto" />
          </a>
        )}
        content={(
          <div className="absolute top-0 left-0 flex flex-col items-center gap-2 w-full h-dvh bg-white z-50 text-marine font-bold">
            <div className="flex flex-col items-center justify-between w-full p-4" style={{ height: 'calc(100dvh - 5rem)' }}>
              <div className="flex flex-col items-center gap-2 w-full">
                <a href="/courses" className="flex items-center justify-center w-full hover:opacity-50 p-2">Courses</a>
                <a href="/settings" className="flex items-center justify-center w-full hover:opacity-50 p-2">Settings</a>
                <a href="/about" className="flex items-center justify-center w-full hover:opacity-50 p-2">About</a>
              </div>

              <div className="flex flex-col items-center gap-2 w-full">
                <a href="/" onClick={signOut} className="flex items-center justify-center w-full hover:opacity-50 p-2">
                  <div className="flex justify-center gap-2">
                    <span>Sign Out</span>
                    <span className="text-2l">↪</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
        icon={<img src={Menu} alt="menu-icon" className="h-[1.5rem] w-auto" />}
      />
    </nav>
  )
}

export default NavMenu
