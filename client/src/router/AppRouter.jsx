import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Skills from '../pages/Skills'
import SkillDetails from '../pages/SkillDetails'
import CreateSkill from '../pages/CreateSkill'
import UpdateSkill from '../pages/UpdateSkill'
import Profile from '../pages/Profile'
import Stats from '../pages/Stats'
import ProtectedRoute from './ProtectedRoute'

export default function AppRouter(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/skills" element={<Skills/>} />
      <Route path="/skills/:id" element={<SkillDetails/>} />
      <Route path="/create" element={<ProtectedRoute><CreateSkill/></ProtectedRoute>} />
      <Route path="/skills/:id/edit" element={<ProtectedRoute><UpdateSkill/></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      <Route path="/stats" element={<Stats/>} />
      <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
  )
}
