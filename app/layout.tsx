import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import { Theme } from '@radix-ui/themes'; 
import './globals.css'
import NavBar from './NavBar'
import Footer from './Footer';
import { Providers } from './providers';

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
				<Providers>
					<Theme accentColor="violet" className='flex flex-col min-h-screen'>
						<NavBar />
						<main className='px-5 mb-3'>{children}</main>
						<Footer />
					</Theme>
				</Providers>
      		</body>
		</html>
  	)
}
