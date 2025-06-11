import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosInstance } from "./axiosInstance";

// Authentication Hooks
export const useLoginStudent = () => {
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationFn: (data) => axiosInstance.post(`/auth/student/login`, data),
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

export const useActivitiesByCategory = (category) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["activities", "category", category],
    queryFn: () => axiosInstance.get(`/activities/category/${category}`),
    enabled: !!category,
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

// Activity Responses Hooks
export const useSubmitActivityResponse = () => {
  const axiosInstance = useAxiosInstance();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ activityId, data }) =>
      axiosInstance.post(`/activities/${activityId}/responses`, data),
    onSuccess: (_, { activityId }) => {
      queryClient.invalidateQueries({ queryKey: ["activity", activityId] });
      queryClient.invalidateQueries({
        queryKey: ["activityResponses", activityId],
      });
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
  return useQuery({
    queryKey: ["analytics", "categories"],
    queryFn: () => axiosInstance.get("/analytics/categories"),
  });
};

export const useTopActivities = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ["analytics", "top-activities"],
    queryFn: () => axiosInstance.get("/analytics/top-activities"),
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
