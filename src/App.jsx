import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import HomePage from './pages/HomePage'
import StudentLogin from './pages/auth/StudentLogin'
import AdminLogin from './pages/auth/AdminLogin'
import StudentDashboard from './pages/student/StudentDashboard'
import ActivitySection from './pages/student/ActivitySection'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/student/dashboard" element={
              <ProtectedRoute userType="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/student/activities/:section" element={
              <ProtectedRoute userType="student">
                <ActivitySection />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/dashboard" element={
              <ProtectedRoute userType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App