import AppHeader from '@/components/header'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Unlock a World of Entertainment with Day2Movies',
  description: '"Day2Movies: Your ultimate destination for movies and series. Experience seamless streaming, explore a diverse catalog, and keep pace with the latest releases.',
  openGraph: {
    title: 'day2movies - watch movies & series online for free',
    description: 'Discover the ultimate online destination for movies and web series at Day2Movies. Explore a vast library of content, enjoy seamless streaming, and stay updated with the latest releases. Join us for an unparalleled entertainment experience!',
    url: 'https://day2movies.fun',
    siteName: 'day2movies',
    images: [
      {
        url: 'https://day2movies.fun/',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
      // className={inter.className}
      >
      <AppHeader />
        {children}
        <footer class="bg-gray-800 p-4">
        <div class="container mx-auto text-center">
          <p>&copy; 2023 Day2Movies. All rights reserved.</p>
        </div>
      </footer>
      </body>
    </html>
  )
}
