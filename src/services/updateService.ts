import axiosInstance from "src/utils/axios";

export const updateData = async (endpoint: string, id: number, data: any) => {
    const response = await axiosInstance.patch(`${endpoint}/${id}`, data);
    return response.data;
  };