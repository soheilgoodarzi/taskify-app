import Header from "../components/Header"
import DashboardPage from "../pages/DashboardPage"

export default function MainLayout() {
  return (
    <div className=" min-h-screen">
      <Header />
      <main>
        <DashboardPage />
      </main>
    </div>
  )
}
