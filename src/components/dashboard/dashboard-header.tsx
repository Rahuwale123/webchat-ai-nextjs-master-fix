import { LogOut, LucideUser } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardHeaderProps {
  user: {
    id: string
    email: string
    username: string
  }
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/")
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg"><img src="image.png" alt="" /></span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BAAP AI
            </h1>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <LucideUser className="w-5 h-5" />
              <span className="font-medium">{user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
