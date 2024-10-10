import { Footer, Navbar } from '@/_components'

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex relative justify-center items-center h-screen overflow">
        <div className="fixed top-0 -left-10 h-[95vh] w-[60vw] rounded-[3rem] bg-neutral-900"></div>
        {children}
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default LandingLayout
