import { Navbar } from '@/_components'

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="hidden fixed top-0 -left-10 xl:block h-[95vh] w-[60vw] rounded-[3rem] bg-neutral-900"></div>
      {children}
    </>
  )
}

export default LandingLayout
