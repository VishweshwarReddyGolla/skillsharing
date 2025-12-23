import api from './axiosConfig'

export const getSkills = async (params) => {
  const res = await api.get('/skills', { params })
  return res.data
}

export const getSkillById = async (id) => {
  const res = await api.get(`/skills/${id}`)
  return res.data
}

export const createSkill = async (payload) => {
  const res = await api.post('/skills', payload)
  return res.data
}

export const updateSkill = async (id, payload) => {
  const res = await api.put(`/skills/${id}`, payload)
  return res.data
}

export const deleteSkill = async (id) => {
  const res = await api.delete(`/skills/${id}`)
  return res.data
}

export const searchSkills = async (query, params = {}) => {
  params.query = query
  const res = await api.get('/skills/search', { params })
  return res.data
}

export const filterSkills = async (filters) => {
  const res = await api.get('/skills/filter', { params: filters })
  return res.data
}

export const sortSkills = async (by) => {
  const res = await api.get('/skills/sort', { params: { by } })
  return res.data
}

export const getUserSkills = async (userId, params = {}) => {
  const res = await api.get(`/users/${userId}/skills`, { params })
  return res.data
}
