import Link from 'next/link'
import { HamburgerMenu, Header } from '@/_components'

const Navbar = () => {
  const ITEMS = [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: '/docs' },
    { name: 'About', href: '/about' },
  ]
  return (
    <nav className="flex top-0 z-10 justify-between items-start py-4 px-8 w-full lg:justify-around xl:fixed h-[20vh] bg-neutral-900 xl:h-[40vh]">
      <Header />
      <div className="block lg:hidden">
        <HamburgerMenu>
          {ITEMS.map((el) => {
            return (
              <Link
                key={el.href}
                href={el.href}
                className="text-2xl text-white transition-all duration-200 ease-in-out hover:text-4xl hover:text-sky-300"
              >
                {el.name}
              </Link>
            )
          })}
        </HamburgerMenu>
      </div>
      <ul className="hidden gap-8 items-center text-lg lg:flex text-sky-100">
        {ITEMS.map((el) => {
          return (
            <li key={el.href}>
              <Link href={el.href} className="hover:text-sky-300">
                {el.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
