import { Link } from "react-router-dom"
export default function HomePage() {
  return (
    <div className="flex lg:h-[calc(100vh-64px)] flex-col items-center justify-center text-center text-white p-4 ">
      <h1 className="xs:text-2xl md:text-5xl lg:text-7xl 2xl:text-9xl font-bold md:mb-4 xs:mb-1 xs:mt-14 drop-shadow-lg">
        Welcome to Taskify
      </h1>
      <p className="max-w-2xl xs:text-lg md:text-xl lg:text-2xl 2xl:text-3xl md:mb-6 lg:mb-8 2xl:mb-12 xs:mb-4 drop-shadow-md">
        A space to manage your tasks and boost your productivity.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold lg:py-2 lg:px-4 xs:px-2 xs:py-2 sm:py-2 sm:px-3 2xl:py-5 2xl:rounded-2xl 2xl:px-8 rounded-lg xs:text-sm md:text-lg lg:text-xl 2xl:text-4xl transition-transform transform hover:scale-105"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
