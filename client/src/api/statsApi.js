import api from './axiosConfig'

export const getSkillStats = async () => {
  const res = await api.get('/stats/skills')
  return res.data
}
