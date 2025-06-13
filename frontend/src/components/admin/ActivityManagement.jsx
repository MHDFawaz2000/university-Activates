import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import ActivityModal from "./ActivityModal";
import {
  useAllActivities,
  useAnalyticsBCategory,
  useCreateActivity,
  useDeleteActivity,
  useUpdateActivity,
} from "../../hooks/allHook";

const ActivityManagement = () => {
  const { t, isRTL } = useLanguage();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit, view
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSaving, setSaving] = useState(false);

  const createMutation = useCreateActivity();
  const updateMutation = useUpdateActivity();
  const deleteMutation = useDeleteActivity();

  const { data: activities, isLoading } = useAllActivities({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    search: searchTerm || [],
  });

  const { data: categoriesRaw } = useAnalyticsBCategory();
  const categories = categoriesRaw?.data || [];
  console.log("categories Data:", categories);

  // const categoriesData = [
  //   "all",
  //   "sports",
  //   "cultural",
  //   "scientific",
  //   "extracurricular",
  // ];

  const filteredActivities = (activities?.data || [])?.filter((activity) => {
    const matchesSearch =
      activity?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      activity?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      activity?.category?.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log("Filtered Activities:", filteredActivities);

  const handleCreateActivity = () => {
    setSelectedActivity(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleViewActivity = (activity) => {
    setSelectedActivity(activity);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleDeleteActivity = async (id) => {
    if (window.confirm(t("deleteConfirm"))) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleSaveActivity = async (activityData) => {
    try {
      setSaving(true);
      if (modalMode === "create") {
        await createMutation.mutateAsync(activityData);
      } else if (modalMode === "edit") {
        await updateMutation.mutateAsync({
          id: selectedActivity.id,
          data: activityData,
        });
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving activity:", err);
    } finally {
      setSaving(false);
    }
  };

  const getCategoryName = (category) => {
    const categoryMap = {
      all: t("allCategories"),
      sports: t("sports"),
      cultural: t("cultural"),
      scientific: t("scientific"),
      extracurricular: t("extracurricular"),
    };
    return categoryMap[category] || category;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("activityManagement")}
        </h2>
        <button
          onClick={handleCreateActivity}
          className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Plus className="h-5 w-5" />
          <span>{t("addActivity")}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 border-2 border-green-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className={`absolute ${
                  isRTL ? "right-3" : "left-3"
                } top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400`}
              />
              <input
                type="text"
                placeholder={t("searchActivities")}
                className={`${
                  isRTL ? "pr-10" : "pl-10"
                } input-field focus:ring-green-500 focus:border-green-500`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="input-field w-auto min-w-[150px] focus:ring-green-500 focus:border-green-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories &&
                categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {t(category.title.toLowerCase())}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="card overflow-hidden border-2 border-green-100">
        <div className="overflow-x-auto">
          <table
            className={`min-w-full divide-y divide-gray-200 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <thead
              className={`bg-green-50 ${isRTL ? "text-right" : "text-left"}`}
            >
              <tr>
                <th
                  className={`px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {t("activity")}
                </th>
                <th
                  className={`px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {t("category")}
                </th>
                <th
                  className={`px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {t("date")}
                </th>
                <th
                  className={`px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {t("attendees")}
                </th>
                <th
                  className={`px-6 py-3 ${
                    isRTL ? "text-right" : "text-left"
                  } text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody
              className={`bg-white divide-y divide-gray-200 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {filteredActivities &&
                filteredActivities?.map((activity) => (
                  <tr key={activity?.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {activity?.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity?.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {t(activity?.category_title.toLowerCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{new Date(activity?.date).toLocaleDateString()}</div>
                      {activity?.time?.slice(0, 5)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity?.attendance_count ?? 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => handleViewActivity(activity)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditActivity(activity)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(activity?.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={selectedActivity}
        mode={modalMode}
        onSave={handleSaveActivity}
        isSaving={isSaving}
      />
    </div>
  );
};

export default ActivityManagement;
