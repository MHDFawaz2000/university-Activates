import { useLanguage } from "../../contexts/LanguageContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, Calendar, Target } from "lucide-react";
import {
  useAnalyticsOverview,
  useCategoryDistribution,
  useMonthlyAnalytics,
  useTopActivities,
} from "../../hooks/allHook";

const AnalyticsDashboard = () => {
  const { t, isRTL } = useLanguage();
  const { data: monthlyData } = useMonthlyAnalytics();
  const { data: categoryData } = useCategoryDistribution();
  const { data: topActivitiesData } = useTopActivities();
  const { data: overview } = useAnalyticsOverview();

  const topActivities = topActivitiesData?.data ?? [];
  console.log("Analytics Overview Data:", topActivities);

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
      icon: Calendar, // ✅ أضف هذا
      color: "bg-blue-500",
    },
    {
      label: t("activeStudents"),
      value: overview?.data?.total_attendees ?? "-",
      change: calculateChange(
        overview?.data?.total_attendees,
        overview?.data?.total_attendees_prev
      ),
      icon: Users, // ✅
      color: "bg-green-500",
    },
    {
      label: t("studentRegistrations"),
      value: overview?.data?.total_participants ?? "-",
      change: calculateChange(
        overview?.data?.total_participants,
        overview?.data?.total_participants_prev
      ),
      icon: TrendingUp, // ✅
      color: "bg-purple-500",
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
      icon: Target, // ✅
      color: "bg-red-500",
    },
  ];

  const COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7"];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats?.map((stat, index) => (
          <div key={index} className="card p-6 border-2 border-green-100">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg mr-4 rtl:ml-4 rtl:mr-0`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Registrations */}
        <div className="card p-6 border-2 border-green-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t("monthlyRegistrations")}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="registrations"
                  fill="#059669"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card p-6 border-2 border-green-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t("activitiesByCategory")}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Activities */}
      <div className="card p-6 border-2 border-green-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {t("topPerformingActivities")}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  {t("activity")}
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  {t("registrations")}
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  {t("completionRateLabel")}
                </th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">
                  {t("performance")}
                </th>
              </tr>
            </thead>
            <tbody>
              {topActivities &&
                topActivities?.map((activity, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 font-medium text-gray-900">
                      {activity?.name}
                    </td>
                    <td className="py-4 text-gray-600">
                      {activity?.registrations}
                    </td>
                    <td className="py-4 text-gray-600">
                      {activity?.completion}%
                    </td>
                    <td className="py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${activity?.completion}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
