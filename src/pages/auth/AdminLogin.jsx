import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield, ArrowLeft, Key } from "lucide-react";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginAdmin } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin(formData.email, formData.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
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
            <Shield className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("adminLoginTitle")}
          </h2>
          <p className="text-gray-600">{t("adminLoginSubtitle")}</p>
        </div>

        {/* Login Form */}
        <div className="card p-8 border-2 border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="admin@university.edu"
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
                placeholder="Enter your password"
                value={formData.password}
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
                  {t("loggingIn")}
                </div>
              ) : (
                t("login")
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Student?{" "}
              <Link
                to="/student/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {t("login")} here
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <Key className="h-5 w-5 text-amber-600 mt-0.5 mr-3 rtl:ml-3 rtl:mr-0" />
            <div>
              <h4 className="font-medium text-amber-900">Demo Credentials</h4>
              <p className="text-sm text-amber-700 mt-1">
                Email: admin@university.edu
                <br />
                Password: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
