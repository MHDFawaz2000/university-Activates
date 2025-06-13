import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const ActivityCard = ({ activity, onResponse, userResponse }) => {
  const { t, isRTL } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleResponse = async (response) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    onResponse(activity.id, response);
    setLoading(false);
  };

  const responseButtons = [
    {
      id: "attend",
      label: t("willAttend"),
      icon: CheckCircle,
      className: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      id: "not_attend",
      label: t("not_attend"),
      icon: XCircle,
      className: "bg-red-600 hover:bg-red-700 text-white",
    },
    {
      id: "time_conflict",
      label: t("timeNotConvenient"),
      icon: AlertCircle,
      className: "bg-amber-600 hover:bg-amber-700 text-white",
    },
  ];

  const getResponseText = (response) => {
    switch (response) {
      case "attend":
        return t("willAttend");
      case "not_attend":
        return t("not_attend");
      case "time_conflict":
        return t("timeNotConvenient");
      default:
        return "";
    }
  };

  return (
    <div className="card p-0 overflow-hidden border-2 border-green-100 hover:border-green-300">
      {/* Activity Image */}
      <div className="h-48 bg-gradient-to-r from-green-600 to-green-500 relative">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"}`}>
          <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {activity.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {activity.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {activity.description}
        </p>

        {/* Activity Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            <span>
              {activity.date} at {activity.time}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            <span>
              {activity.attendeeCount} {t("attending")}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            <span>
              {t("duration")}: {activity.duration}
            </span>
          </div>
        </div>

        {/* Response Status */}
        {userResponse && (
          <div className="mb-4 p-3 rounded-lg bg-gray-50">
            <p className="text-sm font-medium text-gray-700">
              {t("yourResponse")}:{" "}
              <span
                className={`${
                  userResponse === "attend"
                    ? "text-green-600"
                    : userResponse === "not_attend"
                    ? "text-red-600"
                    : "text-amber-600"
                }`}
              >
                {getResponseText(userResponse)}
              </span>
            </p>
          </div>
        )}

        {/* Response Buttons */}
        <div className="space-y-2">
          {responseButtons.map((button) => {
            const isSelected = userResponse === button.id;
            const Icon = button.icon;

            return (
              <button
                key={button.id}
                onClick={() => handleResponse(button.id)}
                disabled={loading}
                className={`w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isSelected
                    ? button.className
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading && userResponse !== button.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span>{button.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
