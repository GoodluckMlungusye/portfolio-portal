import axiosInstance from "src/utils/axios";

export const postData = async (endpoint: string, formData: FormData) => {
    const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    };
    