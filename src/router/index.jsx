import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import DashboardPage from "../pages/DashboardPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}
