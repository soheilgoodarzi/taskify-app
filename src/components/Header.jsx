import { NavLink } from "react-router-dom"

export default function Header() {
  const activeLinkStyle = "text-milky font-bold"
  const normalLinkStyle = "text-gray-300 hover:text-white"

  return (
    <header>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 flex justify-between items-center xs:h-12 md:h-16 2xl:h-32">
        <div className="flex-shrink-0">
          <h1 className="xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl 2xl:text-6xl font-bold text-white drop-shadow-md">
            Taskify
          </h1>
        </div>

        <nav className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? activeLinkStyle : normalLinkStyle
              } px-3 py-2 rounded-md xs:text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-4xl font-medium transition-colors`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${
                isActive ? activeLinkStyle : normalLinkStyle
              } px-3 py-2 rounded-md xs:text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-4xl font-medium transition-colors`
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
