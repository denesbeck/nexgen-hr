import Link from 'next/link'
import { HamburgerMenu } from '@/_components'

const Navbar = () => {
  return (
    <nav className="flex top-0 z-10 justify-between items-start py-4 px-8 w-full lg:justify-around xl:fixed h-[20vh] bg-neutral-900 xl:h-[40vh]">
      <div className="grid">
        <h1 className="flex items-center text-5xl font-[DepartureMono] text-sky-300">
          NexGen HR
        </h1>
        <p className="text-white text-start xl:text-end">
          Where Simplicity Fuels Performance.
        </p>
      </div>
      <div className="block lg:hidden">
        <HamburgerMenu />
      </div>
      <ul className="hidden gap-8 items-center text-lg lg:flex text-sky-100">
        <li>
          <Link href="/pricing" className="hover:text-sky-300">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/docs" className="hover:text-sky-300">
            Docs
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-sky-300">
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
