import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSkillById, deleteSkill } from '../api/skillApi'
import { AuthContext } from '../context/AuthContext'
import { Chrono } from 'react-chrono'
import CommentBox from '../components/CommentBox'
import CarouselPreview from '../components/CarouselPreview'

export default function SkillDetails(){
  const { id } = useParams()
  const [skill, setSkill] = useState(null)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(()=>{ fetch() },[id])
  const fetch = async ()=>{
    const res = await getSkillById(id)
    setSkill(res.data)
  }

  const handleDelete = async () =>{
    if(!window.confirm('Delete this skill?')) return
    await deleteSkill(id)
    navigate('/skills')
  }

  if(!skill) return <div>Loading…</div>

  const isOwner = user && user.id === skill.userId?._id

  return (
    <div>
      <div className="flex gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{skill.title}</h1>
          <div className="text-sm text-gray-500">by {skill.userId?.name}</div>
          <p className="mt-4">{skill.description}</p>
          <div className="mt-4">
            <CarouselPreview images={skill.images} />
          </div>
        </div>
        <div style={{width: 350}}>
          <div className="border p-4 rounded">
            <div className="font-semibold">Category</div>
            <div>{skill.category}</div>
            <div className="mt-2 font-semibold">Level</div>
            <div>{skill.level}</div>
            <div className="mt-2 font-semibold">Rating</div>
            <div>{skill.rating}</div>
            {isOwner && (
              <div className="mt-4 flex gap-2">
                <button onClick={()=>navigate(`/skills/${id}/edit`)} className="px-3 py-1 bg-indigo-600 text-white rounded">Edit</button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Timeline</h3>
        {skill.timelineItems && skill.timelineItems.length>0 ? (
          <div style={{width: '100%', height: 300}}>
            <Chrono items={skill.timelineItems.map(t=>({ title: t.title, cardTitle: t.title, cardSubtitle: t.description, cardDetailedText: t.description }))} mode="VERTICAL" />
          </div>
        ) : <div className="text-gray-500">No timeline items</div>}
      </div>

      <div className="mt-8">
        <CommentBox skillId={id} />
      </div>
    </div>
  )
}
