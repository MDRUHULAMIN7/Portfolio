import Link from "next/link"
import { Inter, Playfair_Display } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" })

export default function NotFound() {
  return (
    <div className={`${inter.className} bg-gray-900 flex items-center justify-center min-h-screen`}>
      <div className="text-center p-8 max-w-lg animate-fadeIn">
        {/* 404 Number */}
        <h1
          className={`${playfair.className} text-8xl font-extrabold text-red-400 mb-4 drop-shadow-lg`}
        >
          404
        </h1>
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
          Dashboard Page Not Found
        </h2>
        {/* Description */}
        <p className="text-gray-500 mb-8">
          The dashboard page you’re looking for doesn’t exist or has been removed.
        </p>
        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-500 transition-colors duration-300"
          >
            Back to Dashboard
          </Link>
          
        </div>
      </div>
    </div>
  )
}
