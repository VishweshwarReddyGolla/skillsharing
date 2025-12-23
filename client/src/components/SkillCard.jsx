import React from 'react'
import { Link } from 'react-router-dom'

export default function SkillCard({ skill }){
  const id = skill._id || skill.id
  return (
    <div className="border rounded shadow-sm overflow-hidden">
      {skill.images && skill.images[0] && (
        <img src={skill.images[0]} alt={skill.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg"><Link to={`/skills/${id}`}>{skill.title}</Link></h3>
        <p className="text-sm text-gray-600">{skill.description?.slice(0, 120)}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{skill.category}</span>
          <span className="text-sm font-medium">⭐ {skill.rating || 0}</span>
        </div>
      </div>
    </div>
  )
}
