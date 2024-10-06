import axiosInstance from 'src/utils/axios';

export const postData = async (endpoint: string, data: any) => {
  const response = await axiosInstance.post(endpoint, data);
  return response.data;
};
