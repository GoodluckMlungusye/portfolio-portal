import axiosInstance from 'src/utils/axios';

export const postData = async (endpoint: string, data: any) => {
  const response = await axiosInstance.post(endpoint, data);
  return response.data;
};

export const postFormData = async (endpoint: string, data: FormData) => {
  const response = await axiosInstance.post(endpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};


