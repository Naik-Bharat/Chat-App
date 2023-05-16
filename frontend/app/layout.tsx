import './globals.css'
import Link from 'next/link'

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
        <header className='py-7'>
          <nav>
            <div className='items-center flex justify-between'>
              <div className='logo text-2xl font-bold'>Chat App</div>
                <Link href='https://github.com/Naik-Bharat/chat-app' target={"_blank"}>
                  <button className='rounded-md bg-blue-800 px-3 py-1 text-white'>Star project on Github</button>
                </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
