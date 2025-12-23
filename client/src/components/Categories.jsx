import React from 'react'
import { FaCode, FaPenFancy, FaMusic, FaBullhorn, FaPalette, FaDollarSign, FaBook, FaGlobe } from 'react-icons/fa'

const ICONS = {
  Programming: FaCode,
  Design: FaPenFancy,
  Music: FaMusic,
  Marketing: FaBullhorn,
  Art: FaPalette,
  Finance: FaDollarSign,
  Writing: FaBook,
  Language: FaGlobe,
}

export default function Categories({ selected, onSelect, compact=false }){
  const cats = Object.keys(ICONS)
  return (
    <div className={compact ? 'flex gap-2 overflow-x-auto' : 'grid grid-cols-2 md:grid-cols-4 gap-3'}>
      {cats.map(c=>{
        const Icon = ICONS[c]
        const active = selected === c
        return (
          <button key={c} onClick={()=>onSelect(c)} className={`flex items-center gap-3 p-3 border rounded ${active? 'bg-indigo-600 text-white':'bg-white text-gray-700'} shrink-0`}> 
            <Icon />
            <div className="text-sm font-medium">{c}</div>
          </button>
        )
      })}
    </div>
  )
}
