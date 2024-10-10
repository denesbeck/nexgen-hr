'use client'

const Navbar = () => {
  return (
    <nav className="flex fixed top-0 z-10 justify-around items-start py-4 px-14 w-full h-[20vh] bg-neutral-900 backdrop-blur-md">
      <div className="grid">
        <h1 className="flex items-center text-5xl font-[DepartureMono] text-sky-300">
          NexGen HR
        </h1>
        <p className="text-white text-end">
          Where Simplicity Fuels Performance.
        </p>
      </div>
      <ul className="flex gap-8 items-center text-lg text-sky-100">
        <li>
          <button className="hover:brightness-125">Pricing</button>
        </li>
        <li>
          <button className="hover:brightness-125">Docs</button>
        </li>
        <li>
          <button className="hover:brightness-125">About</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
