import axiosInstance from "src/utils/axios";

export const updateData = async (endpoint: string, id: number, formData: FormData) => {
    const response = await axiosInstance.put(`${endpoint}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };