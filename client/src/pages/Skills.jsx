import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { getSkills, searchSkills } from '../api/skillApi'
import SkillCard from '../components/SkillCard'
import Categories from '../components/Categories'
import defaultSkills, { CATEGORIES_LIST } from '../data/defaultSkills'

export default function Skills(){
  const location = useLocation()
  const [allSkills, setAllSkills] = useState([])
  const [displaySkills, setDisplaySkills] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [level, setLevel] = useState('')

  const fetchAll = async () => {
    try{
      const res = await getSkills({ page:1, limit: 200, sortBy: 'createdAt' })
      const data = (res && res.data && res.data.length>0) ? res.data : defaultSkills
      setAllSkills(data)
      setDisplaySkills(data)
    }catch(err){
      setAllSkills(defaultSkills)
      setDisplaySkills(defaultSkills)
    }
  }

  useEffect(()=>{ fetchAll() },[])

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const cat = params.get('category')
    if(cat) setSelectedCategory(cat)
  },[location.search])

  useEffect(()=>{
    // handle filtering: search > category > level
    let arr = [...allSkills]
    if(query){
      const q = query.toLowerCase()
      arr = arr.filter(s=> (s.title||'').toLowerCase().includes(q) || (s.description||'').toLowerCase().includes(q))
    }
    if(selectedCategory){
      arr = arr.filter(s=>s.category === selectedCategory)
    }
    if(level){
      arr = arr.filter(s=>s.level === level)
    }
    setDisplaySkills(arr)
  },[allSkills, query, selectedCategory, level])

  const grouped = CATEGORIES_LIST.map(cat=> ({ cat, items: displaySkills.filter(s=>s.category===cat).slice(0,8) }))

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <div className="mb-4">
          <input className="w-full border p-2 rounded" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Filter by level</label>
          <select value={level} onChange={(e)=>setLevel(e.target.value)} className="w-full border p-2 rounded">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Categories</label>
          <Categories selected={selectedCategory} onSelect={(c)=>setSelectedCategory(c === selectedCategory ? '' : c)} />
        </div>
      </aside>

      <section className="md:col-span-3">
        {selectedCategory ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {displaySkills.filter(s=>s.category===selectedCategory).slice(0,8).map(s=> <SkillCard key={s._id || s.id} skill={s} />)}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(g=> (
              <div key={g.cat}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{g.cat}</h3>
                  <Link to={`/skills?category=${encodeURIComponent(g.cat)}`} className="text-indigo-600">View all →</Link>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {g.items.map(s=> <SkillCard key={s._id || s.id} skill={s} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
