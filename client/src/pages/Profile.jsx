import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getUserSkills } from '../api/skillApi'
import SkillCard from '../components/SkillCard'
import CarouselPreview from '../components/CarouselPreview'

export default function Profile(){
  const { user } = useContext(AuthContext)
  const [skills, setSkills] = useState([])

  useEffect(()=>{ if(user) fetch() },[user])
  const fetch = async ()=>{
    const res = await getUserSkills(user.id, { limit: 20 })
    setSkills(res.data)
  }

  if(!user) return <div>Please log in</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{user.name}</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Your previews</h3>
        <div className="flex gap-4 overflow-x-auto">
          {skills.slice(0,5).map(s=> (
            <div key={s._id || s.id} className="w-72 flex-shrink-0 border rounded p-3">
              <h4 className="font-semibold">{s.title}</h4>
              <CarouselPreview images={s.images} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {skills.map(s => <SkillCard key={s._id} skill={s} />)}
      </div>
    </div>
  )
}
