'use client'
import { createPortal } from 'react-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { useEffect, useState } from 'react'

const Menu = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  if (!mounted) return null
  return createPortal(
    <div className="fixed top-0 left-0 z-20 w-screen h-screen animate-textFocus bg-neutral-900">
      {' '}
      hello
    </div>,
    document.body
  )
}

const HamburguerMenu = () => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    function preventTab(e: KeyboardEvent) {
      e = e || window.event
      if (e.keyCode === 9) {
        e.preventDefault()
      }
    }
    document.addEventListener('keydown', preventTab)
    return () => document.removeEventListener('keydown', preventTab)
  }, [])

  return (
    <>
      <button
        className={`${open && 'rotate-90'} rounded-full p-3 transition-all duration-200 ease-in-out hover:backdrop-brightness-150`}
        onClick={() => setOpen((prevState: boolean) => !prevState)}
      >
        <MenuIcon className="text-white min-h-8 min-w-8" />
      </button>
      {open && <Menu />}
    </>
  )
}

export default HamburguerMenu
