import './globals.css'
import Link from 'next/link'
import Header from '@/components/Header'

export const metadata = {
  title: 'Chat App',
  description: 'An Anonymous Chat App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='container mx-auto px-6 bg-white dark:bg-black text-black dark:text-white'>
        <Header />
        {children}
      </body>
    </html>
  )
}
