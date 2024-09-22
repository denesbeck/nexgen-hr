'use client'
import { Login } from '@/_components'

const Navbar = () => {
  return (
    <nav className="flex fixed top-0 justify-around items-center py-4 px-14 w-full backdrop-blur-md">
      <h1 className="text-2xl text-white">NexGen HR</h1>
      <ul className="flex gap-8 items-center text-lg text-sky-100">
        <li>
          <button className="hover:brightness-125">Pricing</button>
        </li>
        <li>
          <button className="hover:brightness-125">Docs</button>
        </li>
        <li>
          <Login />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
