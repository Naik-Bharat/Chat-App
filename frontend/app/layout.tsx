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
      <body className='container mx-auto px-6'>
        <header className='py-7'>
          {/* <nav className='hidden sm:block'> */}
          <nav>
            <div className='items-center flex justify-between'>
              <div className='logo text-xl'>Chat App</div>
              <ul className='justify-between'>
                <li className=''>
                    <Link href='https://github.com/Naik-Bharat/chat-app' target={"_blank"}>
                      <button className='rounded-md bg-blue-800 px-3 py-1'>Star project on Github</button>
                    </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
