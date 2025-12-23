const CATEGORIES = [
  'Programming','Design','Music','Marketing','Art','Finance','Writing','Language'
]

const makeSkill = (id, title, category, level='beginner', rating=4, description='', image='') => ({
  id,
  title,
  category,
  level,
  rating,
  description,
  images: image ? [image] : [],
})

const defaults = []

CATEGORIES.forEach(cat => {
  for(let i=1;i<=8;i++){
    const id = `default_${cat.toLowerCase()}_${i}`
    const title = `${cat} Skill ${i}`
    const desc = `Example ${cat} skill number ${i}`
    const img = `/default/${cat.toLowerCase()}-${i}.png`
    defaults.push(makeSkill(id, title, cat, ['beginner','intermediate','advanced'][i%3], 3 + (i%2), desc, img))
  }
})

export const CATEGORIES_LIST = CATEGORIES
export default defaults
