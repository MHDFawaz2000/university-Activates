import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { GraduationCap, LogOut, User } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="bg-green-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {t("footerTitle")}
              </h1>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="bg-green-100 p-2 rounded-full">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-green-600 capitalize">
                  {user?.type}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 rtl:space-x-reverse text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">{t("logout")}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
