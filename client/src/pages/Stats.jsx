import React, { useEffect, useState } from 'react'
import { getSkillStats } from '../api/statsApi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Stats(){
  const [stats, setStats] = useState(null)
  useEffect(()=>{ fetch() },[])
  const fetch = async ()=>{
    const res = await getSkillStats()
    setStats(res.data)
  }

  if(!stats) return <div>Loading…</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Total Skills</h3>
          <div className="text-3xl">{stats.total}</div>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Average Rating</h3>
          <div className="text-3xl">{stats.avgRating?.toFixed(2)}</div>
        </div>
        <div className="border p-4 rounded md:col-span-2">
          <h3 className="font-semibold mb-2">Skills by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.byCategory}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
