import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { UserPlus, ArrowLeft, GraduationCap } from "lucide-react";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useRegisterStudent } from "../../hooks/allHook";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  
  // Use the registration mutation hook
  const { mutateAsync: registerStudent, isPending: loading } = useRegisterStudent();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate student ID
    if (!/^\d{9}$/.test(formData.studentId)) {
      setError("Student ID must be exactly 9 digits");
      return;
    }

    // Validate name
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Format the data according to the backend expectations
      await registerStudent({
        name: formData.name,
        student_id: formData.studentId,
        // Include email and password, though they're not used in current backend implementation
        email: formData.email,
        password: formData.password
      });
      
      // Navigate to login page after successful registration
      navigate("/student/login");
    } catch (err) {
      console.error("Registration error details:", err);
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-green-600 hover:text-green-700"
            >
              <ArrowLeft
                className={`h-5 w-5 ${isRTL ? "rotate-180" : ""} ${
                  isRTL ? "ml-2" : "mr-2"
                }`}
              />
              {t("home")}
            </Link>
            <LanguageSwitcher />
          </div>

          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <UserPlus className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("studentRegisterTitle")}
          </h2>
          <p className="text-gray-600">{t("studentRegisterSubtitle")}</p>
        </div>

        {/* Registration Form */}
        <div className="card p-8 border-2 border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field focus:ring-green-500 focus:border-green-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("studentId")}
              </label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                required
                className="input-field focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your 9-digit student ID"
                value={formData.studentId}
                onChange={handleChange}
                maxLength="9"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field focus:ring-green-500 focus:border-green-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field focus:ring-green-500 focus:border-green-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("confirmPassword")}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="input-field focus:ring-green-500 focus:border-green-500"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t("registering")}
                </div>
              ) : (
                t("register")
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("alreadyHaveAccount")}{" "}
              <Link
                to="/student/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {t("login")}
              </Link>
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <GraduationCap className="h-5 w-5 text-blue-600 mt-0.5 mr-3 rtl:ml-3 rtl:mr-0" />
            <div>
              <h4 className="font-medium text-blue-900">
                Important Information
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Please ensure all information is accurate. Your student ID must
                match your university records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
