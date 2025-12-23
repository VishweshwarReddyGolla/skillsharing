import React, { useState } from 'react'
import { createSkill } from '../api/skillApi'
import { useNavigate } from 'react-router-dom'

export default function CreateSkill(){
  const [form, setForm] = useState({ title:'', description:'', category:'', level:'beginner', images:[], timelineItems:[] })
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    await createSkill(form)
    navigate('/skills')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Skill</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="w-full border p-2 rounded" placeholder="Title" />
        <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="w-full border p-2 rounded" placeholder="Description" />
        <input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="w-full border p-2 rounded" placeholder="Category" />
        <select value={form.level} onChange={(e)=>setForm({...form,level:e.target.value})} className="w-full border p-2 rounded">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <input value={form.images.join(',')} onChange={(e)=>setForm({...form,images: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} className="w-full border p-2 rounded" placeholder="Images (comma separated URLs)" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create</button>
      </form>
    </div>
  )
}
