import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header"

export default function MainLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  const backgroundImage = isHomePage
    ? "/Tasking-Background.jpg"
    : "/main-Background.webp"

  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
