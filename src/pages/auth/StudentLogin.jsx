import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Users, ArrowLeft, GraduationCap } from "lucide-react";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useLoginStudent } from "../../hooks/allHook";

const StudentLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  // Use the login mutation hook
  const { mutateAsync: loginStudent, isPending: loading } = useLoginStudent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{9}$/.test(studentId)) {
      setError("Student ID must be exactly 9 digits");
      return;
    }

    try {
      const res = await loginStudent({ student_id: studentId });
      const { user, token } = res.data;

      // Save token and user locally
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate based on user type
      if (user.type === "admin") {
        navigate("/admin/dashboard");
      } else if (user.type === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/"); // fallback
      }
    } catch (err) {
      console.error("Login error details:", err);
      setError(err.message || "Login failed. Please try again.");
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
            <Users className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("studentLoginTitle")}
          </h2>
          <p className="text-gray-600">{t("studentLoginSubtitle")}</p>
        </div>

        {/* Login Form */}
        <div className="card p-8 border-2 border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("studentId")}
              </label>
              <input
                id="studentId"
                type="text"
                required
                className="input-field focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your 9-digit student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                maxLength="9"
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
                  {t("loggingIn")}
                </div>
              ) : (
                t("login")
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("firstTimeUser")}{" "}
              <Link
                to="/student/register"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {t("register")}
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Administrator?{" "}
              <Link
                to="/admin/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {t("login")} here
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
                First time using the platform?
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Use your official 9-digit student ID provided by the university
                registrar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
