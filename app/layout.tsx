import type { Metadata } from 'next'
import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Footer, Navbar } from './_components'
import Providers from './providers'

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
      <Providers>
        <body>
          <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400">
            <Navbar />
            <div className="overflow mt-[80px] flex flex-1 items-center justify-center px-8">
              {children}
            </div>
            <Footer />
          </div>
        </body>
      </Providers>
    </html>
  )
}
