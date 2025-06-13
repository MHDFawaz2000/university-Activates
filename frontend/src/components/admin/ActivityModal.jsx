import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { X, Calendar, MapPin, Clock, Users } from "lucide-react";
import { useAnalyticsBCategory } from "../../hooks/allHook";

const ActivityModal = ({
  isOpen,
  onClose,
  activity,
  mode,
  isSaving,
  onSave,
}) => {
  const { t, isRTL } = useLanguage();
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
  console.log("Activity Modal Data:", activity, mode, isSaving);

  const { data: categoriesRaw } = useAnalyticsBCategory();
  const categories = categoriesRaw?.data || [];

  useEffect(() => {
    if (activity && (mode === "edit" || mode === "view")) {
      setFormData({
        title: activity.title || "",
        description: activity.description || "",
        category: activity.category.toLowerCase() || "",
        date: activity.date ? activity.date.split("T")[0] : "",
        time: activity.time || "",
        location: activity.location || "",
        duration: activity.duration || "",
        image: activity.image || "",
      });
    } else if (mode === "create") {
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
    }
  }, [activity, mode]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      time: formData.time.slice(0, 5), // "15:37:00" → "15:37"
    });
  };

  if (!isOpen) return null;

  const isReadOnly = mode === "view";

  const getModalTitle = () => {
    if (mode === "create") return t("createNewActivity");
    if (mode === "edit") return t("editActivity");
    return t("activityDetails");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {getModalTitle()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("activityTitle")}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="input-field focus:ring-green-500 focus:border-green-500"
              placeholder={t("activityTitle")}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              rows="4"
              className="input-field resize-none focus:ring-green-500 focus:border-green-500"
              placeholder={t("description")}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("category")}
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="input-field focus:ring-green-500 focus:border-green-500"
            >
              <option value=""></option>
              {categories &&
                categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {t(category.title.toLowerCase())}
                  </option>
                ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("date")}
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={isReadOnly}
                className="input-field focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("time")}
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={isReadOnly}
                className="input-field focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Location and Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("location")}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                disabled={isReadOnly}
                className="input-field focus:ring-green-500 focus:border-green-500"
                placeholder={t("location")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("duration")}
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                disabled={isReadOnly}
                className="input-field focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., 2 hours"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("imageUrl")}
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              disabled={isReadOnly}
              className="input-field focus:ring-green-500 focus:border-green-500"
              placeholder={t("imageUrl")}
            />
          </div>

          {/* Activity Details (View Mode) */}
          {mode === "view" && activity && (
            <div className="border-t pt-6 space-y-4">
              <h4 className="font-semibold text-gray-900">
                {t("activityStatistics")}
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>
                    {activity.attendeeCount} {t("attending")}
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{activity.date}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{activity.duration}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              {isReadOnly ? t("close") : t("cancel")}
            </button>
            {!isReadOnly && (
              <button type="submit" className="btn-primary" disabled={isSaving}>
                {/* {mode === "create" ? t("createActivity") : t("saveChanges")} */}
                {isSaving
                  ? t("saving")
                  : mode === "create"
                  ? t("createActivity")
                  : t("saveChanges")}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityModal;
