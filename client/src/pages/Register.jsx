import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Register(){
  const { register } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await register({ name, email, password })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded p-2" placeholder="Name" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded p-2" placeholder="Email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full border rounded p-2" placeholder="Password" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Register</button>
      </form>
    </div>
  )
}
