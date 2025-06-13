import { useState } from "react";
import {
  useAnalyticsOverview,
  useAnalyticsMonthly,
  useAnalyticsByCategory,
  useTopActivities,
  useCreateActivity,
  useApiState,
} from "../../hooks/allHook";

const Dashboard = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    duration: "",
    image: "",
  });

  const { data: overview } = useApiState(useAnalyticsOverview());
  const { data: monthly } = useApiState(useAnalyticsMonthly());
  const { data: categories } = useApiState(useAnalyticsByCategory());
  const { data: topActivities } = useApiState(useTopActivities());
  const createActivity = useCreateActivity();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createActivity.mutateAsync(formData);
      setShowCreateForm(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: "",
        duration: "",
        image: "",
      });
    } catch (error) {
      console.error("Failed to create activity:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Total Activities</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {overview?.total_activities || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Total Participants</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {overview?.total_participants || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Total Attendees</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {overview?.total_attendees || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Avg. Completion Rate</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {overview?.avg_completion_rate?.toFixed(1) || 0}%
          </p>
        </div>
      </div>

      {/* Create Activity Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          {showCreateForm ? "Cancel" : "Create New Activity"}
        </button>
      </div>

      {/* Create Activity Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Create New Activity</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option value="sports">Sports</option>
                  <option value="academic">Academic</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createActivity.isLoading}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {createActivity.isLoading ? "Creating..." : "Create Activity"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Statistics</h2>
          <div className="space-y-4">
            {monthly?.map((stat) => (
              <div key={stat.month} className="flex justify-between items-center">
                <span>{new Date(stat.month).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
                <div className="flex space-x-4">
                  <span className="text-sm text-gray-600">
                    Activities: {stat.activities_count}
                  </span>
                  <span className="text-sm text-gray-600">
                    Participants: {stat.participants_count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Category Distribution</h2>
          <div className="space-y-4">
            {categories?.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{category.category}</span>
                  <span className="text-sm text-gray-600">
                    {category.activities_count} activities
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{
                      width: `${(category.activities_count / overview?.total_activities) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Activities */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Top Performing Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topActivities?.map((activity) => (
              <div key={activity.id} className="border rounded p-4">
                <h3 className="font-semibold">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.category}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">
                    Attendees: {activity.attendee_count}
                  </p>
                  <p className="text-sm">
                    Completion Rate: {activity.completion_rate.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {createActivity.isError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg">
          Error: {createActivity.error?.message}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 