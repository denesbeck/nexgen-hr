import type { Metadata } from 'next'
import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { AlertBox } from '@/_components'

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
        <AlertBox />
        <div className="flex flex-col justify-center items-center w-screen h-full min-h-screen bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400">
          {children}
        </div>
      </body>
    </html>
  )
}
