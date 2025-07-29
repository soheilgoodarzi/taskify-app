import { Link } from "react-router-dom"
export default function HomePage() {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center text-center text-white p-4 ">
      <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
        Welcome to Taskify
      </h1>
      <p className="max-w-2xl text-lg md:text-xl mb-8 drop-shadow-md">
        A space to manage your tasks and boost your productivity.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform  transform hover:scale-105"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
