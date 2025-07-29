import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/Tasking-Background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Welcome to Taskify
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-8 font-stretch-200%">
          A space to manage your tasks and boost your productivity. Organize
          all your tasks in one place.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white  py-3 px-8 rounded-lg text-lg transition-transform transition-color transform hover:scale-105"
        >
         Go to Dashboard
        </Link>
      </div>
    </div>
  );
}