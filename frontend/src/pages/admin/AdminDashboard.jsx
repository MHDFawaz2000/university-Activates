import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Header from "../../components/Header";
import ActivityManagement from "../../components/admin/ActivityManagement";
import AnalyticsDashboard from "../../components/admin/AnalyticsDashboard";
import { BarChart3, Calendar, Users } from "lucide-react";
import {
  useAnalyticsOverview,
  usePopularActivities,
  useRecentRegistrations,
} from "../../hooks/allHook";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const { data: overview } = useAnalyticsOverview();
  const { data: recentRegistrations } = useRecentRegistrations();
  const { data: popularActivities } = usePopularActivities();
  console.log("Admin Dashboard Data:", popularActivities);

  const tabs = [
    { id: "overview", label: t("overview"), icon: BarChart3 },
    { id: "activities", label: t("manageActivities"), icon: Calendar },
    { id: "analytics", label: t("analytics"), icon: BarChart3 },
  ];

  const calculateChange = (current, previous) => {
    if (current == null || previous == null || previous === 0) return "+0%";
    const diff = ((current - previous) / previous) * 100;
    const sign = diff >= 0 ? "+" : "";
    return `${sign}${diff.toFixed(1)}%`;
  };

  const stats = [
    {
      label: t("totalActivities"),
      value: overview?.data?.total_activities ?? "-",
      change: calculateChange(
        overview?.data?.total_activities,
        overview?.data?.total_activities_prev
      ),
    },
    {
      label: t("studentRegistrations"),
      value: overview?.data?.total_participants ?? "-",
      change: calculateChange(
        overview?.data?.total_participants,
        overview?.data?.total_participants_prev
      ),
    },
    {
      label: t("activeStudents"),
      value: overview?.data?.total_attendees ?? "-",
      change: calculateChange(
        overview?.data?.total_attendees,
        overview?.data?.total_attendees_prev
      ),
    },
    {
      label: t("completionRate"),
      value:
        overview?.data?.avg_completion_rate != null
          ? `${overview.data.avg_completion_rate}%`
          : "-",
      change: calculateChange(
        overview?.data?.avg_completion_rate,
        overview?.data?.avg_completion_rate_prev
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("adminDashboard")}
          </h1>
          <p className="text-gray-600">
            {t("welcomeBack")}, {user?.name}. {t("adminWelcome")}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="card p-2 mb-8 border-2 border-green-100">
          <nav className="flex space-x-2 rtl:space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            {/* Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats &&
                stats?.map((stat, index) => (
                  <div
                    key={index}
                    className="card p-6 border-2 border-green-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat?.value}
                        </p>
                        <p className="text-gray-600">{stat?.label}</p>
                      </div>
                      <span className="text-green-600 text-sm font-medium">
                        {stat?.change}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card p-6 border-2 border-green-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("recentRegistrations")}
                </h3>
                <div className="space-y-4">
                  {(recentRegistrations || [])?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item?.student}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item?.activity}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(item?.time).toLocaleString("en-US", { // إذا باللغة العربية "ar-EG"
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6 border-2 border-green-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("popularActivities")}
                </h3>
                <div className="space-y-4">
                  {popularActivities?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {item?.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {t(item?.category_title?.toLowerCase())}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">
                          {item?.registrations}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activities" && <ActivityManagement />}
        {activeTab === "analytics" && <AnalyticsDashboard />}
      </main>
    </div>
  );
};

export default AdminDashboard;
