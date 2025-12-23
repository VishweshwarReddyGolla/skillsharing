import React, { createContext, useState, useEffect } from 'react'
import * as authApi from '../api/authApi'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('skillswap_user')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('skillswap_token'))
  const navigate = useNavigate()

  useEffect(() => {
    if (token) localStorage.setItem('skillswap_token', token)
    else localStorage.removeItem('skillswap_token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('skillswap_user', JSON.stringify(user))
    else localStorage.removeItem('skillswap_user')
  }, [user])

  const register = async (payload) => {
    const res = await authApi.signup(payload)
    setToken(res.data.token)
    setUser(res.data.user)
    navigate('/skills')
  }

  const login = async (payload) => {
    const res = await authApi.login(payload)
    setToken(res.data.token)
    setUser(res.data.user)
    navigate('/skills')
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
