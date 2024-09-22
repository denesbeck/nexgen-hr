import type { Metadata } from 'next'
import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Footer, Navbar } from './_components'

export const metadata: Metadata = {
  title: 'NexGen HR | Home',
  description: 'Simplicity in HR. Power in Performance.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400">
          <Navbar />
          <div className="flex flex-1 justify-center items-center px-8 overflow mt-[80px]">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
