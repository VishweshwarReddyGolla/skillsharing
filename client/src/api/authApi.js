import api from './axiosConfig'

export const signup = async ({ name, email, password, avatar }) => {
  const res = await api.post('/auth/signup', { name, email, password, avatar })
  return res.data
}

export const login = async ({ email, password }) => {
  const res = await api.post('/auth/login', { email, password })
  return res.data
}
