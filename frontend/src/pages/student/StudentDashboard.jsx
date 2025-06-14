import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import Header from "../../components/Header";
import {
  Trophy,
  Palette,
  Microscope,
  Star,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  useStudentStats,
  useCategoryStats,
  useRecentStudentActivities,
} from "../../hooks/allHook";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const { data: statsData } = useStudentStats();
  const { data: categoryStats, isLoading: categoryLoading } =
    useCategoryStats();

  const { data: recentActivities, isLoading: recentLoading } =
    useRecentStudentActivities();
  console.log("Recent Activities Data:", recentActivities);

  const categoryIcons = {
    sports: Trophy,
    cultural: Palette,
    scientific: Microscope,
    extracurricular: Star,
  };

  const categoryColors = {
    sports: { color: "bg-red-500", bgColor: "bg-red-50" },
    cultural: { color: "bg-purple-500", bgColor: "bg-purple-50" },
    scientific: { color: "bg-blue-500", bgColor: "bg-blue-50" },
    extracurricular: { color: "bg-green-500", bgColor: "bg-green-50" },
  };

  const sections =
    categoryStats?.map((category) => {
      const matchingRecent = recentActivities?.find(
        (ra) =>
          ra.section.toLowerCase() === "cultural" ||
          ra.section.toLowerCase() === category.title?.toLowerCase()
      );

      const id = category.title?.toLowerCase();
      const defaultColors = {
        color: "bg-gray-500",
        bgColor: "bg-gray-100",
      };
      const colors = categoryColors[id] || defaultColors;
      const Icon = categoryIcons[id] || Star;

      return {
        id: category.id,
        title: matchingRecent?.section || t(id),
        icon: Icon,
        ...colors,
        title2: matchingRecent?.activity || t(id),
        description: matchingRecent?.description || t(`${id}Desc`),
        image: matchingRecent?.image,
        count: category.count,
        upcoming: category.upcoming,
      };
    }) || [];

  console.log("Category Stats Data:", sections);

  const stats = [
    {
      label: t("activitiesAttended"),
      value: statsData?.activitiesAttended || "0",
      icon: Calendar,
    },
    {
      label: t("registeredEvents"),
      value: statsData?.registeredEvents || "0",
      icon: Users,
    },
    {
      label: t("pointsEarned"),
      value: statsData?.pointsEarned || "0",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("welcomeBack")}, {user?.name}!
          </h1>
          <p className="text-gray-600">{t("discoverActivities")}</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6 border-2 border-green-100">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4 rtl:ml-4 rtl:mr-0">
                  <stat.icon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t("activityCategories")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.id}
                  to={`/student/activities/${section.id}`}
                  className="card p-6 hover:scale-105 transition-all duration-300 group border-2 border-green-100 hover:border-green-300"
                >
                  <div
                    className={`${section.bgColor} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className={`h-8 w-8 ${
                        section.color
                          ? section.color.replace("bg-", "text-")
                          : "text-gray-400"
                      }`}
                    />
                  </div>

                  {section.image && (
                    <img
                      src={section.image}
                      alt={section.title}
                      className="rounded mb-3 w-full h-32 object-cover"
                    />
                  )}

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t(section.title.toLowerCase())}
                  </h3>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {section.title2}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {section.description}
                  </p>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      {section.count} {t("activities")}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {t(section.upcoming)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card p-6 border-2 border-green-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t("recentActivity")}
          </h3>
          <div className="space-y-4">
            {recentLoading ? (
              // Loading skeleton for recent activities
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0 animate-pulse"
                  >
                    <div>
                      <div className="h-5 w-48 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                ))
            ) : recentActivities?.length > 0 ? (
              recentActivities?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.activity}</p>
                    <p className="text-sm text-gray-600">
                      {t(item.section.toLowerCase())} • {item.date}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "attend"
                        ? "bg-green-100 text-green-700"
                        : item.status === "register"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {t(item.status)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                {t("noRecentActivities")}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
