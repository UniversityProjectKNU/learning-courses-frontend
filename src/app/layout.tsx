import { MuiSetup } from '@/components/mui/setup'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Learning courses',
  description: 'App for learning courses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MuiSetup>{children}</MuiSetup>
      </body>
    </html>
  )
}
