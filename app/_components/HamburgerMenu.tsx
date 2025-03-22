'use client'
import MenuIcon from '@mui/icons-material/Menu'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AppHeader } from '@/_components'

interface MenuProps {
  children: React.ReactNode
  close: () => void
}

const Menu = ({ children, close }: MenuProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return createPortal(
    <div className="flex fixed top-0 left-0 z-50 flex-col gap-4 justify-center items-center w-screen h-screen bg-linear-to-tr from-cyan-300 via-indigo-500 to-blue-400 lg:hidden animate-textFocus">
      <div className="absolute top-4 left-8">
        <AppHeader />
      </div>
      <button
        className="absolute top-4 right-8 p-3 rounded-full transition-all duration-200 ease-in-out rotate-90 animate-textFocus hover:backdrop-brightness-110"
        onClick={close}
      >
        <MenuIcon className="text-white min-h-8 min-w-8" />
      </button>
      {children}
    </div>,
    document.body
  )
}

interface HamburguerMenuProps {
  children: React.ReactNode
}

const HamburguerMenu = ({ children }: HamburguerMenuProps) => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen((prevState) => !prevState)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <button
        className={`${open && 'rotate-90'} relative z-50 rounded-full p-3 transition-all duration-200 ease-in-out hover:backdrop-brightness-150`}
        onClick={handleClick}
      >
        <MenuIcon className="text-white min-h-8 min-w-8" />
      </button>
      {open && <Menu close={handleClose}>{children}</Menu>}
    </>
  )
}

export default HamburguerMenu
