import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
