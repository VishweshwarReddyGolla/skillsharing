import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CarouselPreview from '../components/CarouselPreview'
import { getSkills } from '../api/skillApi'
import Categories from '../components/Categories'
import defaultSkills, { CATEGORIES_LIST } from '../data/defaultSkills'

export default function Home(){
  const [skills, setSkills] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(()=>{ fetch() },[])
  const fetch = async ()=>{
    try{
      const res = await getSkills({ page:1, limit: 200, sortBy: 'rating' })
      const data = (res && res.data && res.data.length>0) ? res.data : defaultSkills
      setSkills(data)
    }catch(err){
      setSkills(defaultSkills)
    }
  }

  const featuredByCategory = (cat) => {
    const arr = skills.filter(s=>s.category === cat).slice(0,8)
    return arr
  }

  const visibleCategories = selected ? [selected] : CATEGORIES_LIST

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded p-6">
        <h1 className="text-3xl font-bold">Welcome to SkillSwap</h1>
        <p className="mt-2">Learn or teach skills with other students in your community.</p>
        <Link to="/skills" className="mt-4 inline-block px-4 py-2 bg-white text-indigo-600 rounded">Browse Skills</Link>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex items-center gap-4">
          <Categories selected={selected} onSelect={(c)=>setSelected(c===selected?'':c)} compact />
          {selected && <button onClick={()=>setSelected('')} className="px-3 py-1 border rounded">Clear</button>}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured</h2>
        <div className="space-y-8">
          {visibleCategories.map(cat => (
            <div key={cat}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{cat}</h3>
                <Link to={`/skills?category=${encodeURIComponent(cat)}`} className="text-indigo-600">View all →</Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {featuredByCategory(cat).map(s => (
                  <div key={s._id || s.id} className="w-64 flex-shrink-0">
                    <div className="border rounded p-3">
                      <h4 className="font-semibold">{s.title}</h4>
                      <CarouselPreview images={s.images} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
