import axios from 'axios'

const baseURL = 'https://fakestoreapi.com'

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
