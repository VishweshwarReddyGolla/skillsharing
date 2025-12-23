import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Header(){
  const { user, logout } = useContext(AuthContext)
  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">SkillSwap</Link>
        <nav className="flex items-center gap-4">
          <Link to="/skills">Skills</Link>
          <Link to="/stats">Stats</Link>
          {user ? (
            <>
              <Link to="/create" className="px-3 py-1 bg-indigo-500 rounded">Create</Link>
              <Link to="/profile">{user.name}</Link>
              <button onClick={logout} className="px-3 py-1 bg-indigo-500 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-indigo-500 rounded">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
