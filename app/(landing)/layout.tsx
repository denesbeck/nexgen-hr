import { Footer, Navbar } from '@/_components'

interface LandingLayoutProps {
  children: React.ReactNode
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="overflow flex h-screen items-center justify-center">
        {children}
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default LandingLayout
