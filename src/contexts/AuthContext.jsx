import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const loginStudent = (studentId) => {
    const userData = {
      id: studentId,
      type: 'student',
      name: `Student ${studentId.slice(-4)}`
    }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return Promise.resolve(userData)
  }

  const loginAdmin = (email, password) => {
    // Simple validation for demo
    if (email === 'admin@university.edu' && password === 'admin123') {
      const userData = {
        id: email,
        type: 'admin',
        name: 'Administrator'
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return Promise.resolve(userData)
    }
    return Promise.reject(new Error('Invalid credentials'))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    loginStudent,
    loginAdmin,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}