import axiosInstance from '../services/api'

const useAxios = async <T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
  data?: any
): Promise<T> => {
  const response = await axiosInstance({
    url,
    method,
    data,
  })
  return response.data
}

export default useAxios
