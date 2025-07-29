import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DashboardPage from "../pages/DashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}