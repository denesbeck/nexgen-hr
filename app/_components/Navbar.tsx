import Link from 'next/link'
import { HamburgerMenu, Header } from '@/_components'

const Navbar = () => {
  return (
    <nav className="flex top-0 z-10 justify-between items-start py-4 px-8 w-full lg:justify-around xl:fixed h-[20vh] bg-neutral-900 xl:h-[40vh]">
      <Header />
      <div className="block lg:hidden">
        <HamburgerMenu>
          <Link
            href="/pricing"
            className="text-2xl text-white transition-all duration-200 ease-in-out hover:text-4xl hover:text-sky-300"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-2xl text-white transition-all duration-200 ease-in-out hover:text-4xl hover:text-sky-300"
          >
            Docs
          </Link>
          <Link
            href="/about"
            className="text-2xl text-white transition-all duration-200 ease-in-out hover:text-4xl hover:text-sky-300"
          >
            About
          </Link>
        </HamburgerMenu>
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
