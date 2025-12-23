import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
})

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillswap_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// global error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.error || err.message || 'Request failed'
    toast.error(message)
    return Promise.reject(err)
  }
)

export default api
