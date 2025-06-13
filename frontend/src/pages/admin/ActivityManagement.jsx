import { useState } from "react";
import {
  useAllActivities,
  useUpdateActivity,
  useDeleteActivity,
  useApiState,
} from "../../hooks/allHook";

const ActivityManagement = () => {
  const [editingActivity, setEditingActivity] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
  });

  const { data: activities, isLoading, error } = useApiState(useAllActivities(filters));
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateActivity.mutateAsync(editingActivity);
      setEditingActivity(null);
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  };

  const handleDelete = async (activityId) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await deleteActivity.mutateAsync(activityId);
      } catch (error) {
        console.error("Failed to delete activity:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Activity Management</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search activities..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="w-48">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            <option value="sports">Sports</option>
            <option value="academic">Academic</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="grid gap-6">
        {activities?.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-lg shadow p-6"
          >
            {editingActivity?.id === activity.id ? (
              // Edit Form
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingActivity.title}
                      onChange={(e) =>
                        setEditingActivity((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={editingActivity.category}
                      onChange={(e) =>
                        setEditingActivity((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
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
                      value={editingActivity.date}
                      onChange={(e) =>
                        setEditingActivity((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Time
                    </label>
                    <input
                      type="time"
                      value={editingActivity.time}
                      onChange={(e) =>
                        setEditingActivity((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={editingActivity.description}
                    onChange={(e) =>
                      setEditingActivity((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditingActivity(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateActivity.isLoading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {updateActivity.isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              // Activity Display
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{activity.title}</h2>
                    <p className="text-sm text-gray-600">{activity.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(activity)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{activity.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> {activity.time}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>{" "}
                    {activity.location}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{" "}
                    {activity.duration}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Error Notifications */}
      {updateActivity.isError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg">
          Error updating activity: {updateActivity.error?.message}
        </div>
      )}
      {deleteActivity.isError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg">
          Error deleting activity: {deleteActivity.error?.message}
        </div>
      )}
    </div>
  );
};

export default ActivityManagement; 