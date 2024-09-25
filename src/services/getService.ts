import axiosInstance from "src/utils/axios";

export const getData = async (endpoint: string) => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  };