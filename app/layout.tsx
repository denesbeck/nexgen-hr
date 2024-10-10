import type { Metadata } from 'next'
import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

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
        <div className="flex h-full min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400">
          <div className="flex flex-1 items-start justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
