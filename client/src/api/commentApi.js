import api from './axiosConfig'

export const postComment = async (skillId, text) => {
  const res = await api.post(`/skills/${skillId}/comment`, { text })
  return res.data
}

export const getCommentsForSkill = async (skillId) => {
  const res = await api.get(`/skills/${skillId}/comments`)
  return res.data
}

export const deleteComment = async (id) => {
  const res = await api.delete(`/comments/${id}`)
  return res.data
}
