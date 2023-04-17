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
      <head>
        <title>
          Chat App
        </title>
      </head>
      <body>
        <header className='py-7'>
          <nav className='container items-center mx-auto flex justify-between'>
            <div className='logo text-xl ml-6'>Chat App</div>
            <ul className='flex items-center'>
              <li className='mr-6'>
                  <Link href='https://github.com/Naik-Bharat/chat-app' target={"_blank"}>
                    <button className='rounded-md bg-blue-800 px-3 py-1'>Star project on Github</button>
                  </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
