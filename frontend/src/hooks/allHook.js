import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosInstance } from "./axiosInstance";

// Authentication Hooks
export const useLoginStudent = () => {
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationFn: async ({ student_id }) => {
      const { data } = await axiosInstance.post("/auth/student/login", {
        student_id,
      });
      return data;
    },
  });
};

export const useLoginAdmin = () => {
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationFn: (data) => axiosInstance.post("/auth/admin/login", data),
  });
};

export const useRegisterStudent = () => {
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationFn: (data) => axiosInstance.post("/auth/student/register", data),
  });
};

export const useLogout = () => {
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
  });
};

export const useCurrentUser = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => axiosInstance.get("/auth/me"),
    retry: false,
  });
};

// Activities Hooks
export const useAllActivities = (filters = {}) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["activities", filters],
    queryFn: () => axiosInstance.get("/activities", { params: filters }),
  });
};

export const useActivityById = (id) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["activity", id],
    queryFn: () => axiosInstance.get(`/activities/${id}`),
    enabled: !!id,
  });
};

export const useCreateActivity = () => {
  const axiosInstance = useAxiosInstance();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => axiosInstance.post("/activities", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const useUpdateActivity = () => {
  const axiosInstance = useAxiosInstance();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => axiosInstance.put(`/activities/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["activity", id] });
    },
  });
};

export const useDeleteActivity = () => {
  const axiosInstance = useAxiosInstance();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axiosInstance.delete(`/activities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
};

export const useRecentRegistrations = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["recentRegistrations"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/analytics/recent-registrations"
      );
      return response.data.data;
    },
  });
};

export const usePopularActivities = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["popularActivities"],
    queryFn: async () => {
      const response = await axiosInstance.get("/analytics/popular-activities");
      return response.data.data;
    },
  });
};

export const useActivityResponses = (activityId) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["activityResponses", activityId],
    queryFn: () => axiosInstance.get(`/activities/${activityId}/responses`),
    enabled: !!activityId,
  });
};

export const useStudentResponses = (studentId) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["studentResponses", studentId],
    queryFn: () => axiosInstance.get(`/students/${studentId}/responses`),
    enabled: !!studentId,
  });
};

// Analytics Hooks
export const useAnalyticsOverview = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: () => axiosInstance.get("/analytics/overview"),
  });
};

export const useAnalyticsMonthly = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["analytics", "monthly"],
    queryFn: () => axiosInstance.get("/analytics/monthly"),
  });
};

export const useAnalyticsByCategory = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["analytics", "categories"],
    queryFn: () => axiosInstance.get("/analytics/categories"),
  });
};

export const useAnalyticsBCategory = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["analytics", "categories"],
    queryFn: () => axiosInstance.get("/activities/categories"),
  });
};

// Custom hook for handling loading and error states
export const usState = (queryResult) => {
  const axiosInstance = useAxiosInstance();

  return {
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
    data: queryResult.data?.data,
  };
};

// 1. الإحصائيات الشهرية
export const useMonthlyAnalytics = () => {
  const axiosInstance = useAxiosInstance();
  return useQuery({
    queryKey: ["monthlyAnalytics"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/analytics/monthly");
      return data;
    },
  });
};

// 2. توزيع النشاطات حسب التصنيف
export const useCategoryDistribution = () => {
  const axiosInstance = useAxiosInstance();
  return useQuery({
    queryKey: ["category-distribution"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/analytics/category-distribution"
      );
      return data;
    },
  });
};

// 3. أفضل النشاطات أداءً
export const useTopActivities = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["analytics", "top-activities"],
    queryFn: () => axiosInstance.get("/analytics/top-activities"),
  });
};

// Student Statistics Hook
export const useStudentStats = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["studentStats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/analytics/student-stats");
      return {
        activitiesAttended: data.activities_attended || 0,
        registeredEvents: data.registered_events || 0,
        pointsEarned: data.points_earned || 0,
      };
    },
  });
};

// Category Statistics Hook
export const useCategoryStats = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["categoryStats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/analytics/category-stats");
      return data;
    },
  });
};

// Recent Student Activities Hook
export const useRecentStudentActivities = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["recentStudentActivities"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/analytics/recent-student-activities"
      );
      return data;
    },
  });
};

export const useActivitiesByCategory = (categoryId) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["activitiesByCategory", categoryId],
    enabled: !!categoryId,
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/activities/category/${categoryId}/details`
      );
      console.log("Activities by Category Data:", data);

      return data;
    },
  });
};

export const useActivityCategories = () => {
  const axios = useAxiosInstance();
  return useQuery({
    queryKey: ["activityCategories"],
    queryFn: async () => {
      const { data } = await axios.get("/activities/categories");
      console.log("Activity Categories Data:", data);

      return data;
    },
  });
};

export const useSubmitActivityResponse = () => {
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ activityId, responseType }) => {
      const { data } = await axios.post(`/activities/${activityId}/responses`, {
        response_type: responseType,
      });
      return data;
    },
    onSuccess: (_, { activityId }) => {
      queryClient.invalidateQueries({ queryKey: ["activitiesByCategory"] });
    },
  });
};
