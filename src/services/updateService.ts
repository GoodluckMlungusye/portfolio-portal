import axiosInstance from "src/utils/axios";

export const updateData = async (endpoint: string, id: number, data: any) => {
    const response = await axiosInstance.put(`${endpoint}/${id}`, data);
    return response.data;
  };

export const updateFormData = async (endpoint: string, id: number, formData: FormData) => {
  const response = await axiosInstance.put(`${endpoint}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};