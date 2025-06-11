import { useLanguage } from '../../contexts/LanguageContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, Calendar, Target } from 'lucide-react'

const AnalyticsDashboard = () => {
  const { t, isRTL } = useLanguage()
  
  const categoryData = [
    { name: t('sports'), value: 12, registrations: 456 },
    { name: t('cultural'), value: 8, registrations: 324 },
    { name: t('scientific'), value: 6, registrations: 189 },
    { name: t('extracurricular'), value: 15, registrations: 278 }
  ]

  const monthlyData = [
    { month: 'Jan', registrations: 120, activities: 8 },
    { month: 'Feb', registrations: 180, activities: 12 },
    { month: 'Mar', registrations: 150, activities: 10 },
    { month: 'Apr', registrations: 220, activities: 15 },
    { month: 'May', registrations: 190, activities: 13 },
    { month: 'Jun', registrations: 250, activities: 18 }
  ]

  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7']

  const topActivities = [
    { name: 'Football Championship', registrations: 156, completion: 89 },
    { name: 'Cultural Night', registrations: 134, completion: 92 },
    { name: 'Science Symposium', registrations: 98, completion: 87 },
    { name: 'Art Workshop', registrations: 87, completion: 94 },
    { name: 'Tech Hackathon', registrations: 76, completion: 85 }
  ]

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: t('totalActivities'), value: '41', icon: Calendar, color: 'bg-blue-500' },
          { label: t('activeStudents'), value: '892', icon: Users, color: 'bg-green-500' },
          { label: t('studentRegistrations'), value: '1,247', icon: TrendingUp, color: 'bg-purple-500' },
          { label: t('completionRate'), value: '87%', icon: Target, color: 'bg-red-500' }
        ].map((stat, index) => (
          <div key={index} className="card p-6 border-2 border-green-100">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg mr-4 rtl:ml-4 rtl:mr-0`}>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('monthlyRegistrations')}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="registrations" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card p-6 border-2 border-green-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('activitiesByCategory')}</h3>
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
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('topPerformingActivities')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-500">{t('activity')}</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">{t('registrations')}</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">{t('completionRateLabel')}</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">{t('performance')}</th>
              </tr>
            </thead>
            <tbody>
              {topActivities.map((activity, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 font-medium text-gray-900">{activity.name}</td>
                  <td className="py-4 text-gray-600">{activity.registrations}</td>
                  <td className="py-4 text-gray-600">{activity.completion}%</td>
                  <td className="py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${activity.completion}%` }}
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
  )
}

export default AnalyticsDashboard