// Import global styles and fonts
import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' })

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-900 flex items-center justify-center min-h-screen">
        <div className="text-center p-8 max-w-lg animate-fadeIn">
          {/* 404 Number */}
          <h1
            className={`${playfair.className} text-9xl font-extrabold text-gray-400 mb-4 drop-shadow-lg`}
          >
            404
          </h1>
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
            Oops! Page Not Found
          </h2>
          {/* Description */}
          <p className="text-gray-500 mb-8">
            The page you are looking for might have been moved, deleted, or never existed.
          </p>
          {/* Button */}
          <Link
            href="/"
            className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-gray-600 transition-colors duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </body>
    </html>
  )
}
