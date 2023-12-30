import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import { Theme, ThemePanel } from '@radix-ui/themes'; 
import './globals.css'
import NavBar from './NavBar'
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bookager',
  description: 'The ultimate bookmark manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Theme appearance="light" accentColor="violet" className='flex flex-col min-h-screen'>
            <NavBar />
            <main className='px-5'>{children}</main>
            <Footer />
          </Theme>
      </body>
    </html>
  )
}
