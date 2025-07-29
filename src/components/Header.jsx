import { NavLink } from "react-router-dom"

export default function Header() {
  const activeLinkStyle = "text-milky font-bold"
  const normalLinkStyle = "text-gray-300 hover:text-white"

  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">
              Taskify
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? activeLinkStyle : normalLinkStyle
                } px-3 py-2 rounded-md  text-md font-medium transition-colors`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${
                  isActive ? activeLinkStyle : normalLinkStyle
                } px-3 py-2 rounded-md text-md font-medium transition-colors`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
