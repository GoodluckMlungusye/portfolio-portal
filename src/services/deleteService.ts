import axiosInstance from "src/utils/axios";

export const deleteData = async (endpoint: string, id: number) => {
    const response = await axiosInstance.delete(`${endpoint}/${id}`);
    return response.data;
  };