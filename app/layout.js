// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.min.css'

import Head from 'next/head'
import Nav from '@/components/Nav'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Avasa | Dashboard',
  description: 'Todas sus estadísticas en un mismo Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head></Head>
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
