import { createContext, useContext, useState, useEffect } from "react";
import { useLoginAdmin } from "../hooks/allHook";
import { useAxiosInstance } from "../hooks/axiosInstance"; // ← تأكد من المسار الصحيح

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const axiosInstance = useAxiosInstance();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const registerStudent = async (formData) => {
    try {
      // Send registration data to the backend
      const response = await axiosInstance.post("/api/auth/student/register", {
        name: formData.name,
        student_id: formData.studentId,
        email: formData.email,
        password: formData.password,
      });

      // Get the response data
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set authorization header
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return response.data;
    } catch (err) {
      console.error("Registration error:", err);
      throw new Error(err.response?.data?.error || "Registration failed");
    }
  };

  const loginStudent = async (studentId) => {
    try {
      const res = await axiosInstance.post("/auth/student/login", {
        student_id: studentId,
      });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      setUser(user);
      return user;
    } catch (err) {
      console.error("Student login error:", err);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const { mutateAsync: loginAdminRequest } = useLoginAdmin();

  const loginAdmin = async (email, password) => {
    try {
      const res = await loginAdminRequest({ email, password });
      const { token, user } = res.data;

      // حفظ التوكن والمستخدم
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      setUser(user);
      return user;
    } catch (err) {
      console.log("Login error:", err);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = {
    user,
    loginStudent,
    loginAdmin,
    registerStudent,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
